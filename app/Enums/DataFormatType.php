<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * Define the data format type.
 *
 * @method static static JSON()
 * @method static static Html()
 * @method static static XML()
 * @method static static CSV()
 */
final class DataFormatType extends Enum
{
    const JSON = 0;
    const Html = 1;
    const XML = 2;
    const CSV = 3;
}
