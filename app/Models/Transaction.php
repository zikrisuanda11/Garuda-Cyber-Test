<?php

namespace App\Models;

use App\Models\Voucher;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function detailTransactions()
    {
        return $this->hasMany(DetailTransaction::class, 'transaction_id');
    }

    public function voucher()
    {
        return $this->belongsTo(Voucher::class, 'voucher_code');
    }
}
