<?php

namespace App\Models;

use App\Models\Shop;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function carts()
    {
        return $this->hasMany(Cart::class, 'product_id');
    }

    public function detailTransactions()
    {
        return $this->hasMany(DetailTransaction::class, 'product_id');
    }
    
    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }
}