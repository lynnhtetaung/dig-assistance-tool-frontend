<?php

namespace App\Services;

use App\Helper\Common\ResponseHelper;
use App\Enums\ExceptionType;
use App\Enums\DataFormatType;
use Illuminate\Support\Str;
use Throwable;
use Log;

/**
 * This is exception handling service. All th expection related process will be handled in this class.
 *
 * Note: all reponse handler method for each exception must follow the convention:
 *       _generateXXXXXResponse($e) where XXXXX is defined in ExceptionType enum class.
 */
class ExceptionService
{
    private $_responseData;

    /**
     * Return the pre-defined response data for given exception.
     *
     * @param Throwable $e exception object
     *
     * @return mixed $_responseData
     */
    public function getResponse(Throwable $e)
    {
        //Log::debug('Exception type >>> '.get_class($e));
        $exceptionName = Str::afterLast(get_class($e), '\\');
        $supportedExceptionNames = ExceptionType::getKeys();
        if (in_array($exceptionName, $supportedExceptionNames)) {
            Log::debug('Calling getResponse() of '.$exceptionName);
            $this->_responseData = $e->getResponse(DataFormatType::JSON);
        } else {
            $this->_generateCommonExceptionResponse($e);
        }

        return $this->_responseData;
    }


    /**
     * Handle for generic exception response data.
     *
     * @param Throwable $e exception object
     */
    private function _generateCommonExceptionResponse(Throwable $e)
    {
        $this->_responseData = ResponseHelper::getExceptionResponse();
    }

    /**
     * Handle for no data response data.
     *
     * @param Throwable $e exception object
     */
    private function _generateNoDataResponse(Throwable $e)
    {
        $this->_responseData = ResponseHelper::getDefaultNoData();
    }
}
