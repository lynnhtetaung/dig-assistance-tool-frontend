<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Application;
use App\Models\Programmings;
use App\Models\DockerInstructions;
use App\Models\ApplicationInstructionMapping;
use App\Models\ApplicationInstructionMappingTest;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('Application', function () {
            return new Application();
        });

        $this->app->singleton('ApplicationInstructionMapping', function () {
            return new ApplicationInstructionMapping();
        });

        $this->app->singleton('ApplicationInstructionMappingTest', function () {
            return new ApplicationInstructionMappingTest();
        });

        $this->app->singleton('DockerInstructions', function () {
            return new DockerInstructions();
        });

        $this->app->singleton('Programmings', function () {
            return new Programmings();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    public function provides()
    {
        return [
            'Application',
            'ApplicationInstructionMapping',
            'ApplicationInstructionMappingTest',
            'DockerInstructions',
            'Programmings',
        ];
    }
}
