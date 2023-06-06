<?php

namespace App\Helper\Response;

use App\Helper\Response\Contract\ProcessorContract;

/**
 * Custom response format for assets.
 */
class DefaultProcessor extends Processor implements ProcessorContract
{
    // Custom response format for asset goes here

    /**
     * Format response array for success.
     *
     * @param array $data content to be wrapped in data field
     *
     * @return array|mixed $response response data
     */
    public function success($data)
    {
        $response = [
            'status' => 200,
            'error' => [],
            'data' => $data,
        ];

        return $response;
    }

    /**
     * Format response array for failed.
     *
     * @param array $message    content to be wrapped in error field
     * @param int   $statusCode http status code for response
     *
     * @return array|mixed $response response data
     */
    public function failed($message, $statusCode = 400)
    {
        $response = [
            'status' => $statusCode,
            'error' => $message,
            'data' => [],
        ];

        return $response;
    }
}
