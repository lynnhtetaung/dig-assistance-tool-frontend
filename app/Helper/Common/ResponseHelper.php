<?php

namespace App\Helper\Common;

use App\Enums\ErrorCodes;

/**
 * Static response helper. This class help to maintain the default response json.
 */
class ResponseHelper
{
    /**
     * Format the response format for consistency.
     * Note: This function required to call with pagination support.
     *
     * @param mixed $data    collection fetch from model
     * @param array $result  result set to be formatted to use in response
     * @param array $options request parameter options
     *
     * @return array formatted result
     */
    public static function formatPaginationResponse($data, array $result, array $options)
    {
        if ($data) {
            $result['count'] = $data->count();
            $result['total'] = $data->total();
            $result['last_page'] = $data->lastPage();
            $result['per_page'] = (int) $data->perPage();
            $result['current_page'] = (int) $options['page'];
            $result['data'] = $data->toArray()['data'];
        }

        return $result;
    }

    /**
     * Return the default response array. Response status code
     * should be equal to HTTP status code 200.
     *
     * @return array $resp
     */
    public static function getDefaultSuccess()
    {
        $resp = array(
          'status' => 200,
          'error' => [],
          'data' => [],
        );

        return $resp;
    }

    /**
     * Return the default no data/content response array. Response status code
     * should be equal to HTTP status code 204.
     *
     * @return array $resp
     */
    public static function getDefaultNoData()
    {
        $resp = array(
          'status' => 400,
          'error' => ['code' => ErrorCodes::NO_CONTENT, 'message' => __('messages.error.codes.'.ErrorCodes::NO_CONTENT, ['test' => 'hello there now i get you'])],
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
    public static function getDefaultBadRequest()
    {
        $resp = array(
          'status' => 400,
          'error' => ['code' => ErrorCodes::BAD_REQUEST, 'message' => 'Bad request.'],
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
          'error' => ['code' => ErrorCodes::NOT_FOUND, 'message' => 'Data or path is not found.'],
          'data' => [],
        );

        return $resp;
    }

    /**
     * Return the response array in case of exception occur and catched.
     * Status code: 500.
     *
     * @return array $resp
     */
    public static function getExceptionResponse($message = '', $errorCode = ErrorCodes::EXCEPTION_ERROR)
    {
        $resp = array(
            'status' => 500,
            'error' => array(['code' => $errorCode, 'message' => $message]),
            'data' => [],
        );

        return $resp;
    }

    /**
     * Sanitize the request parameters if applicable - e.g page=1 for paging
     * parameter.
     *
     * @param array $options request parameter options
     *
     * @return array sanitized parameter options
     */
    public static function sanitizeOptions($options)
    {
        $defaultOptions = ['page' => 1];

        return array_merge($defaultOptions, $options);
    }
}
