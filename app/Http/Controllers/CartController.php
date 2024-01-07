<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $data = Cart::query()->where('user_id', auth()->user()->id)
            ->orderBy('id', 'asc')
            ->get()
            ->load('product.shop');
        $price = $data->sum('price');
        $discount = $price > 2000000 ? 10000: 0;
        $product_count = $data->count();
        
        return inertia('Cart', [
            'data' => $data,
            'price' => $price,
            'discount' => $discount,
            'product_count' => $product_count,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required',
            'quantity' => 'required',
        ]);

        $cart = Cart::query()
            ->where('user_id', auth()->user()->id)
            ->where('product_id', $request->product_id)
            ->orderBy('id', 'asc')
            ->first();
        
        $product = Product::query()->find($request->product_id);

        $count = $product->count();

        if($count <= 0){
            return to_route('root')->with('error', 'Stock Habis');
        }

        if ($cart != null) {
            $cart->load('product');
            $quantity = $cart->exists() ? $cart->quantity + $request->quantity : $request->quantity;

            $cart->update([
                'quantity' => $quantity,
                'price' => $cart->product->price * $quantity,
            ]);
        }else{           

            $cart = Cart::query()->create([
                'user_id' => auth()->user()->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'price' => $product->price * $request->quantity,
            ]);

            $cart->load('product');
        }

        if($request->header('x-inertia')){
            return to_route('cart.index')->with('message', 'Berhasil menambahkan produk');
        }

        return response()->json([
            'status' => 'success',
            'data' => $cart
        ]);
    }

    public function destroy($id)
    {
        $cart = Cart::query()->find($id);

        if (!$cart) {
            return response()->json([
                'status' => 'error',
                'message' => 'cart not found'
            ], 404);
        }

        $cart->delete();

        return to_route('cart.index')->with('message', 'Berhasil menghapus produk');

        return response()->json([
            'status' => 'success',
            'message' => 'cart deleted'
        ]);
    }
}
