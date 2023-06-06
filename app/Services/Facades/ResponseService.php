<?php

namespace App\Services\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * HelperServiceclass.
 */
class ResponseService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'ResponseService';
    }
}
