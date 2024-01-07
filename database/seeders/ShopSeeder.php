<?php

namespace Database\Seeders;

use App\Models\Shop;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shop_name = [
            'Toko A',
            'Toko B',
        ];

        foreach ($shop_name as $name) {
            Shop::create([
                'name' => $name,
            ]);
        }
    }
}
