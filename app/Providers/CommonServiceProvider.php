<?php

namespace App\Providers;

use App\Services\ExceptionService;
use App\Services\HelperService;
use App\Services\ResponseService;
use Illuminate\Support\ServiceProvider;

class CommonServiceProvider extends AppServiceProvider
{
    /**
     * Register any application service
     */
    public function register()
    {
        $this->app->singleton('ExceptionService', function () {
            return new ExceptionService;
        });

        $this->app->singleton('HelperService', function () {
            return new HelperService;
        });

        $this->app->singleton('ResponseService', function () {
            return new ResponseService;
        });
    }

    /**
     * Boot any application service
     */
    public function boot()
    {
        //
    }

    /**
     * Provides any application service
     */
    public function provides()
    {
        return [
            'ExceptionService',
            'HelperService',
            'ResponseService',
        ];
    }

}