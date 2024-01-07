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

    public function voucher_generated()
    {
        return $this->hasOne(Voucher::class, 'generate_by_transaction_id');
    }
    
    public function voucher_used()
    {
        return $this->hasOne(Voucher::class, 'used_by_transaction_id');
    }


}
