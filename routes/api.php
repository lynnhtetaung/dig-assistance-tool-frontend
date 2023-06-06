<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DockerManageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group([
    'prefix' => 'api/v1/docker-manage',
    'as' => '.docker-manage',
    'middleware' => ['cors'],
], function () {
    Route::get('/detail/{id}', 'DockerManageController@show')->name('.detail');
    Route::get('/get_all', 'DockerManageController@index')->name('.all');
    Route::post('/create', 'DockerManageController@create')->name('.create');
    Route::put('/update/{id}', 'DockerManageController@update')->name('.update');
    Route::delete('/delete/{id}', 'DockerManageController@delete')->name('.delete');
    Route::get('/application/{id}/{name}/image_status/{status}', 'DockerManageController@changeStatus')->name('.image-status');
    Route::get('/shell-script/{name}', 'DockerManageController@run')->name('.shell-script');
});
