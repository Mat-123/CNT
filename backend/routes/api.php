<?php

use App\Http\Controllers\Api\HistoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MapController;
use App\Http\Controllers\Api\NftTransactionController;
use App\Http\Controllers\Api\NftWalletController;
use App\Http\Controllers\Api\WalletController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\ProfileController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::name('api.')->prefix('v1')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/crypto', [MapController::class, 'search'])->name('crypto.search');
    Route::get('/trending', [MapController::class, 'index'])->name('map.index');
    Route::get('/wallet', [WalletController::class, 'fetchwallet'])->name('wallet.fetchwallet');
    Route::post('/wallet', [WalletController::class, 'store'])->name('wallet.store');
    Route::delete('/wallet/{cryptoId}', [WalletController::class, 'destroy'])->name('wallet.destroy');
    Route::post('/transaction', [TransactionController::class, 'store'])->name('transaction.store');
    Route::get('/transaction/{cryptoId}', [TransactionController::class, 'getTransactionsByUserAndCryptoId'])->name('transaction.getTransactionsByUserAndCryptoId');
    Route::put('/transaction/{transaction}', [TransactionController::class, 'update'])->name('transaction.update');
    Route::delete('/transaction/{transaction}', [TransactionController::class, 'destroy'])->name('transaction.destroy');
    Route::get('/nftwallet', [NftWalletController::class, 'index'])->name('nftwallet.index');
    Route::post('/nftwallet', [NftWalletController::class, 'store'])->name('nftwallet.store');
    Route::get('/nfttransaction/{slugName}', [NftTransactionController::class, 'index'])->name('nfttransaction.index');
    Route::post('/nfttransaction/{nftTransaction}', [NftTransactionController::class, 'update'])->name('nfttransaction.update');
    Route::delete('/nfttransaction/{nftTransaction}', [NftTransactionController::class, 'destroy'])->name('nfttransaction.destroy');
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::put('/profile', [ProfileController::class, 'updateCmcApiKey'])->name('profile.updateCmcApiKey');
    Route::put('/update-user-role', [ProfileController::class, 'updatePremiumSubscription'])->name('update-user-role.updatePremiumSubscription');
});

Route::name('api.')->prefix('v1')->middleware(['premium'])->group(function () {
    Route::get('/analysis/{timeframe}', [HistoryController::class, 'index'])->name('analysis.index');
    // Route::get('/transaction/years', [TransactionController::class, 'getTransactionYears'])->name('transaction.getTransactionYears');
    // Route::get('/transaction/download-pdf', [TransactionController::class, 'downloadPDF'])->name('transaction.downloadPDF');
});

Route::name('api.')->prefix('v1')->middleware(['admin'])->group(function () {
    Route::get('/admin/user-stats', [ProfileController::class, 'getUserStats'])->name('admin.getUserStats');
});
