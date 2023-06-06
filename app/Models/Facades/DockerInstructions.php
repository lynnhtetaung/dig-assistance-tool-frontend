<?php

namespace App\Models\Facades;

use Illuminate\Support\Facades\Facade;

class DockerInstructions extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'DockerInstructions';
    }
}