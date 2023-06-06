<?php

namespace App\Services\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * HelperServiceclass.
 */
class ExceptionService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'ExceptionService';
    }
}
