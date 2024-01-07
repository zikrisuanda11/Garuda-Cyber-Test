<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $data = Product::query()->paginate(18);

        return Inertia('Product', [
            'data' => $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shop_id' => 'required|exists:shops,id',
            'name' => 'required|string',
            'price' => 'required|integer',
            'stock' => 'required|integer',
            'image' => 'required|file|mimes:png,jpg,jpeg|image',
        ]);

        $path = Storage::put('public/product_image', $request->file('image'));
        $pathUrl = Storage::url($path);

        $product = Product::query()->create([
            'shop_id' => $request->shop_id,
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $pathUrl,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $product
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::query()->find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'product not found'
            ], 404);
        }

        $request->validate([
            'shop_id' => 'required|exists:shops,id',
            'name' => 'required|string',
            'price' => 'required|integer',
            'stock' => 'required|integer',
            'image' => 'nullable|file|mimes:png,jpg,jpeg|image',
        ]);

        $product->update([
            'shop_id' => $request->shop_id,
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
        ]);

        if ($request->hasFile('image')) {
            File::delete(public_path($product->image));

            $path = Storage::put('public/product_image', $request->file('image'));
            $pathUrl = Storage::url($path);

            $product->update([
                'image' => $pathUrl,
            ]);
        }

        return response()->json([
            'status' => 'success',
            'data' => $product
        ]);
    }

    public function destroy($id)
    {
        $product = Product::query()->find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'product not found'
            ], 404);
        }

        File::delete(public_path($product->image));

        $product->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'product deleted'
        ]);
    }
}
