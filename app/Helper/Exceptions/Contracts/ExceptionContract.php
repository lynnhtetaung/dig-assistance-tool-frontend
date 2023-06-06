<?php

namespace App\Helper\Exceptions\Contracts;

interface ExceptionContract
{
    /**
     * Return the response data in given format.
     */
    public function getResponse($format);
}
