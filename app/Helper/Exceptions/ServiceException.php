<?php

namespace App\Helper\Exceptions;

use App\Enums\ErrorCodes;
use App\Helper\Exceptions\Contracts\ExceptionContract;
use Log;

/**
 * This exception is used whenever call to interal service failed.
 */
class ServiceException extends CustomException implements ExceptionContract
{
    /**
     * @see App\Helper\Exceptions\Contracts\ExceptionContract@getResponse()
     */
    public function getResponse($format)
    {
        // TODO: handle the format (json, xml, etc.) and return it.
        Log::debug('ServiceException getResponse() >> '.$this->getMessage());

        if (!empty($this->getMessage())) {
            $errorCode = ($this->getCode() == 0 ? ErrorCodes::SUB_FAILED_GENERIC : $this->getCode());

            return $this->processor->getCustomExceptionResponse($this->getMessage(), $errorCode);
        }

        return $this->processor->getSeviceCallFailed();
    }
}
