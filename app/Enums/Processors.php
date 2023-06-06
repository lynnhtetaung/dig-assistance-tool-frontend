<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * Define the processors.
 */
final class Processors extends Enum
{
    const DEFAULT = 0;
    const EXCEPTION = 1;
    const DOCKER_MANAGE = 3;
}