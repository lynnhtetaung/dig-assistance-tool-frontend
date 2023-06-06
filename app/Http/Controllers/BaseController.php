<?php

namespace App\Http\Controllers;

use Log;
use App\Enums\Services;
use App\Enums\Processors;
use App\Http\Controllers\Controller;
use App\Traits\ControllerSetupTrait;
use Illuminate\Http\Request;

class BaseController extends Controller 
{
    use ControllerSetupTrait;

    protected $_serviceName = Services::DOCKER_MANAGE;
    private $_responseProcessorName = Processors::DEFAULT;
    private $_contentAuthorizationHelper = null;

    /**
     * Constructor
     */
    public function __construct(Request $request)
    {
        // Log::debug('Base Controller -> Coming');
        $this->setup($request, $this->_serviceName, $this->_responseProcessorName);
    }

} 