<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Voucher;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\DetailTransaction;
use App\Models\Product;

class TransactionController extends Controller
{
    public function index()
    {
        $data = Transaction::query()
            ->where('user_id', auth()->user()->id)
            ->with('detailTransactions.product.shop', 'voucher_generated', 'voucher_used')
            ->get();

        return inertia('Transaction', [
            'data' => $data
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }

    public function checkout(Request $request)
    {
        $carts = Cart::query()->where('user_id', auth()->user()->id)->get();

        $voucher = Voucher::query()
            ->where('code', $request->voucher_code)
            ->first();

        if ($voucher && $voucher->status == 'expired' || $voucher && $voucher->expired_date < now()) {
            return to_route('cart.index')->with('error', 'Voucher is expired.');
        }

        if ($carts->count() == 0) {
            return to_route('cart.index')->with('error', 'Keranjang Kosong.');
        }

        $amount = $carts->sum('price');

        if ($request->voucher_code) {
            $amount = $this->voucher_used($voucher, $amount);
        }

        $transaction = Transaction::query()->create([
            'user_id' => auth()->user()->id,
            'date_transaction' => now(),
            'amount' => $amount,
            'status' => 'success',
        ]);

        if($voucher){
            $voucher->update([
                'used_by_transaction_id' => $transaction->id,
            ]);
        }

        foreach ($carts as $cart) {

            $detailTransaction = DetailTransaction::create([
                'product_id' => $cart->product_id,
                'transaction_id' => $transaction->id,
                'user_id' => auth()->user()->id,
                'price' => $cart->price,
                'quantity' => $cart->quantity,
            ]);

            $cart->delete();

            $detailTransaction->load('product', 'transaction');

            $product = Product::query()->find($cart->product_id);

            $product->update([
                'stock' => $product->stock - $cart->quantity,
                'sold' => $product->sold + $cart->quantity,
            ]);
        }

        if ($amount > 2000000) {
            $voucher = $this->generate_voucher($transaction->id);
        }

        $transaction->load('detailTransactions');

        return to_route('transaction.index')->with('message', 'Checkout Success');

        return response()->json([
            'status' => 'success',
            'data' => [
                'transaction' => $transaction,
                'voucher' => $voucher ?? null,
            ]
        ]);
    }

    public function voucher_used($voucher, $amount)
    {
        $amount = $amount - $voucher->discount_amount;

        $voucher->update([
            'status' => 'expired',
        ]);

        return $amount;
    }

    public function generate_voucher($id)
    {
        $code = 'VCR' . rand(100000, 999999);

        $voucher = Voucher::query()->create([
            'generate_by_transaction_id' => $id,
            'code' => $code,
            'discount_amount' => 10000,
            'expired_date' => now()->addMonth(3),
            'status' => 'unexpired',
        ]);

        return $voucher;
    }
}
