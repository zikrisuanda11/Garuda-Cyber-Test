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
            ->with('detailTransactions.product.shop', 'voucher')
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
        // TODO pengecekan stock product di cart
        $request->validate([
            'voucher_code' => 'string|exists:vouchers,code',
        ]);

        $carts = Cart::query()->where('user_id', auth()->user()->id)->get();

        if ($carts->count() == 0) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Cart is empty.'
            ], 422);
        }

        $amount = $carts->sum('price');

        if ($request->voucher_code) {
            $amount = $this->voucher_used($request->voucher_code, $amount);
        }

        $transaction = Transaction::query()->create([
            'voucher_code' => $request->voucher_code,
            'user_id' => auth()->user()->id,
            'date_transaction' => now(),
            'amount' => $amount,
            'status' => 'success',
        ]);

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
            $voucher = $this->generate_voucher();
        }

        $transaction->load('detailTransactions');

        return response()->json([
            'status' => 'success',
            'data' => [
                'transaction' => $transaction,
                'voucher' => $voucher ?? null,
            ]
        ]);
    }

    public function voucher_used($code, $amount)
    {
        $voucher_used = Voucher::query()->where('code', $code)->first();

        if ($voucher_used->status == 'expired') {
            return response()->json([
                'status' => 'failed',
                'message' => 'Voucher is expired.'
            ], 422);
        }

        if ($voucher_used->expired_date < now()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Voucher is expired.'
            ], 422);
        }

        $amount = $amount - $voucher_used->discount_amount;

        $voucher_used->update([
            'status' => 'expired',
        ]);

        return $amount;
    }

    public function generate_voucher()
    {
        $code = 'VCR' . rand(100000, 999999);

        $voucher = Voucher::query()->create([
            'code' => $code,
            'user_id' => auth()->user()->id,
            'discount_amount' => 10000,
            'expired_date' => now()->addMonth(3),
            'status' => 'unexpired',
        ]);

        return $voucher;
    }
}
