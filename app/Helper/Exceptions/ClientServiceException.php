<?php

namespace App\Helper\Exceptions;

use App\Helper\Exceptions\Contracts\ExceptionContract;
use Log;

/**
 * This exception class is used whenever call to client service failed.
 */
class ClientServiceException extends CustomException implements ExceptionContract
{
    /**
     * @see App\Helper\Exceptions\Contracts\ExceptionContract@getResponse()
     */
    public function getResponse($format)
    {
        // TODO: handle the format (json, xml, etc.) and return it.
        Log::debug('ClientServiceException getResponse() >> '.$this->getMessage());

        return $this->processor->getClientSeviceCallFailed();
    }
}
