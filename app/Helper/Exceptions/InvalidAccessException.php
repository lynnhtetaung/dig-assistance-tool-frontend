<?php

namespace App\Helper\Exceptions;

use App\Helper\Exceptions\Contracts\ExceptionContract;
use App\Enums\ErrorCodes;
use Log;

/**
 * This exception class is used whenever required parameter(s) are missing.
 */
class InvalidAccessException extends CustomException implements ExceptionContract
{
    /**
     * @see App\Helper\Exceptions\Contracts\ExceptionContract@getResponse()
     */
    public function getResponse($format)
    {
        // TODO: handle the format (json, xml, etc.) and return it.
        Log::debug('InvalidAccessException getResponse() >> '.$this->getMessage());
        if (!empty($this->getMessage())) {
            $errorCode = ($this->getCode() == 0 ? ErrorCodes::INVALID_ACCESS_DATA : $this->getCode());

            return $this->processor->getCustomExceptionResponse($this->getMessage(), $errorCode);
        }

        return $this->processor->getDefaultBadRequest();
    }
}
