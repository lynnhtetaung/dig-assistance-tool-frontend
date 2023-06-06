<?php

namespace App\Models\Facades;

use Illuminate\Support\Facades\Facade;

class Application extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'Application';
    }
}