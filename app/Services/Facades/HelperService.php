<?php

namespace App\Services\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * HelperServiceclass.
 */
class HelperService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'HelperService';
    }
}
