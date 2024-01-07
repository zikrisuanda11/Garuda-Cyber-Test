<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('register', [AuthController::class, 'registerPage'])->name('register');
Route::get('login', [AuthController::class, 'loginPage'])->name('login');

Route::post('register', [AuthController::class, 'register'])->name('register.post');
Route::post('login', [AuthController::class, 'login'])->name('login.post');

Route::post('/clear-flash', function (Request $request) {
    $request->session()->forget('message');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('root');

    Route::get('carts', [CartController::class, 'index'])->name('cart.index');
    Route::post('carts', [CartController::class, 'store'])->name('cart.store');

    Route::get('transaction', [TransactionController::class, 'index'])->name('transaction.index');
    
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
