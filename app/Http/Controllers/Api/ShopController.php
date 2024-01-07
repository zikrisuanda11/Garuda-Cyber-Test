<?php

namespace App\Http\Controllers\Api;

use App\Models\Shop;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ShopController extends Controller
{
    public function index()
    {
        $data = Shop::query()->paginate();

        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $shop = Shop::query()->create([
            'name' => $request->name,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $shop
        ]);
    }

    public function update(Request $request, $id)
    {
        $shop = Shop::query()->find($id);

        if (!$shop) {
            return response()->json([
                'status' => 'error',
                'message' => 'shop not found'
            ], 404);
        }

        $shop->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $shop
        ]);
    }

    public function destroy($id)
    {
        $shop = Shop::query()->find($id);

        if (!$shop) {
            return response()->json([
                'status' => 'error',
                'message' => 'shop not found'
            ], 404);
        }

        $shop->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'shop deleted'
        ]);
    }
}
