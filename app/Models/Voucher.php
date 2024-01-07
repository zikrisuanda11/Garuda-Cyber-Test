<?php

namespace App\Models;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Voucher extends Model
{
    use HasFactory;

    protected $primaryKey = 'code';

    protected $keyType = 'string';

    protected $fillable = [
        'code',
        'generate_by_transaction_id',
        'used_by_transaction_id',
        'discount_amount',
        'expired_date',
        'status',
    ];

    public $incrementing = false;

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'voucher_code', 'code');
    }
}
