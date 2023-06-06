<?php

namespace App\Helper\Response\Contract;

/**
 * This Contract for Helper.
 */
interface ProcessorContract
{
    public function success($data);

    public function failed($message, $statusCode = 400);
}
