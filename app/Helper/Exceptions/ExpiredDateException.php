<?php

namespace App\Helper\Exceptions;

use App\Enums\ErrorCodes;
use App\Helper\Exceptions\Contracts\ExceptionContract;
use Log;

/**
 * This exception class is used whenever you want to treat as expired date failed.
 */
class ExpiredDateException extends CustomException implements ExceptionContract
{
    /**
     * @see App\Helper\Exceptions\Contracts\ExceptionContract@getResponse()
     */
    public function getResponse($format)
    {
        Log::debug('ExpiredDateException getResponse() >> '.$this->getMessage());
        if (!empty($this->getMessage())) {
            return $this->processor->getCustomExceptionResponse($this->getMessage(), ErrorCodes::EXPIRED_DATE_ERROR);
        }

        return $this->processor->getExpiredDateError();
    }
}