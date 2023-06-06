<?php

namespace App\Helper\Response;

use App\Enums\ErrorCodes;

/**
 * Custom response format for user related response.
 */
class ExceptionProcessor extends Processor
{
    /**
     * Return the default no data/content response array. Response status code
     * should be equal to HTTP status code 204.
     *
     * @return array $resp
     */
    public function getDefaultNoData()
    {
        $resp = array(
          'status' => 400,
          'error' => $this->getErrorMessage(ErrorCodes::NO_CONTENT),
          'data' => [],
        );

        return $resp;
    }

    /**
     * Return the default bad request response array. Response status code
     * should be equal to HTTP status code 400.
     *
     * @return array $resp
     */
    public function getDefaultBadRequest()
    {
        $resp = array(
          'status' => 400,
          'error' => $this->getErrorMessage(ErrorCodes::BAD_REQUEST),
          'data' => [],
        );

        return $resp;
    }

    /**
     * Return the default multiple device access response array. Response status code
     * should be equal to HTTP status code 400.
     *
     * @return array $resp
     */
    public function getMultipleDevicesAccessResponse()
    {
        $resp = array(
          'status' => 400,
          'error' => $this->getErrorMessage(ErrorCodes::MULTIPLE_DEVICES_ACCESS),
          'data' => [],
        );

        return $resp;
    }

    /**
     * Return the default 'Not Found' response array. Response status code
     * should be equal to HTTP status code 404s.
     *
     * @return array $resp
     */
    public static function getDefaultNotFound()
    {
        $resp = array(
          'status' => 404,
          'error' => $this->getErrorMessage(ErrorCodes::NOT_FOUND),
          'data' => [],
        );

        return $resp;
    }

    /**
     * Return the response array in case of exception occur and catched.
     * Status code: 500.
     *
     * @param string $message   error message
     * @param string $errorCode error code; default is ErrorCodes::EXCEPTION_ERROR
     * @param array  $param     localization key string replacement
     *
     * @return array $resp
     */
    public function getExceptionResponse($message = '', $errorCode = ErrorCodes::EXCEPTION_ERROR, $param = [])
    {
        $resp = array(
            'status' => 500,
            'error' => $this->getErrorMessage($errorCode, $message, $param),
            'data' => [],
        );

        return $resp;
    }

    /**
     * Return the default save error. Response status code
     * should be equal to HTTP status code 204.
     *
     * @return array $resp
     */
    public function getDefaultSaveError()
    {
        $resp = array(
          'status' => 400,
          'error' => $this->getErrorMessage(ErrorCodes::DATA_SAVE_ERROR),
          'data' => [],
        );

        return $resp;
    }

    /**
     * Return the default update error. Response status code
     * should be equal to HTTP status code 204.
     *
     * @return array $resp
     */
    public function getDefaultUpdateError()
    {
        $resp = array(
          'status' => 400,
          'error' => $this->getErrorMessage(ErrorCodes::DATA_UPDATE_ERROR),
          'data' => [],
        );

        return $resp;
    }

     /**
     * Return the default delete error. Response status code
     * should be equal to HTTP status code 204.
     *
     * @return array $resp
     */
    public function getDefaultDeleteError()
    {
        $resp = array(
          'status' => 400,
          'error' => $this->getErrorMessage(ErrorCodes::DATA_DELETE_ERROR),
          'data' => [],
        );

        return $resp;
    }

    /**
     * Return the default expired data error. Response status code
     * should be equal to HTTP status code 204.
     *
     * @return array $resp
     */
    public function getExpiredDateError()
    {
        $resp = array(
          'status' => 400,
          'error' => $this->getErrorMessage(ErrorCodes::EXPIRED_DATE_ERROR),
          'data' => [],
        );

        return $resp;
    }

    /**
     * Return the response array in case of handled exception occur and catched.
     * Status code: 400 - default.
     *
     * @param string $message   error message
     * @param string $errorCode error code; default is ErrorCodes::EXCEPTION_ERROR
     * @param array  $param     localization key string replacement
     * @param int $statusCode eesponse status code
     *
     * @return array $resp
     */
    public function getCustomExceptionResponse($message = '', $errorCode = ErrorCodes::EXCEPTION_ERROR, $param = [], $statusCode = 400)
    {
        $resp = array(
            'status' => $statusCode,
            'error' => $this->getErrorMessage($errorCode, $message, $param),
            'data' => [],
        );

        return $resp;
    }
}
