<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * Enum class for exceptions.
 *
 * key = exception type
 * value = handler function name
 */
final class ExceptionType extends Enum
{
    const NoDataException = 'NoData';
    const ClientServiceException = 1;

    const InvalidAccessException = 2;
    const RestrictedIPAccessException = 3;
    const UnAuthorizedPlayRequestException = 4;
}