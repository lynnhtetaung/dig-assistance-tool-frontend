<?php

namespace App\Helper\Exceptions;

use App\Enums\Processors;
use ResponseService;
use Exception;

/**
 * This is abstract class to extends the based exception class.
 */
abstract class CustomException extends Exception
{
    public $processor = null;
    public $processorId = Processors::EXCEPTION;

    public function __construct($message, $code = 0)
    {
        // Not allow empty message
        // if (!$message) {
        //     throw new $this('Unknown '.get_class($this));
        // }
        $this->processor = ResponseService::getProcessor($this->processorId);
        parent::__construct($message, $code);
    }
}
