<?php

namespace App\Traits;

use Log;
use App\Enums\Processors;
use Illuminate\Http\Request;
use HelperService;
use ResponseService;

/**
 * This trait class help to setup the following:
 * 1. Cache Tag - Required: Request object and tag name
 * 2. Helper - Required: helper name.
 *
 * Note: tag name and helper namer is the same.
 */
trait ControllerSetupTrait
{
    protected $helper = null;
    protected $responder = null;

    /**
     * Setup the require info upon its call.
     *
     * @param Illuminate\Http\Request $request
     * @param string                  $helper
     * @param int                     $responderId
     */
    public function setup(Request $request, string $helper, int $responderId = Processors::DEFAULT)
    {
        $this->_setCacheTag($request, $helper);
        $this->_setHelper($helper);
        $this->_setResponseHelper($responderId);
    }   

    /**
     * Set the cache tag in the Request object.
     *
     * @param Illuminate\Http\Request $request
     * @param string                  $name    tag name
     */
    private function _setCacheTag(Request $request, string $name) {
        $request->request->add(['tag' => $name]);
    }

    /**
     * Set the corresponding helper in the trait class property - helper.
     *
     * @param string $name helper name which is service name; see App\Enums\Services
     */
    private function _setHelper(string $name)
    {
        // Log::debug('Controller Setup Trait -> setHelper');
        $this->helper = HelperService::getHelper($name);
    }

    /**
     * Set the corresponding response helper in the trait class property.
     *
     * @param int $processorId response helper ID which is processor ID;
     *                         see App\Enums\Processors
     */
    private function _setResponseHelper(int $processorId)
    {
        // Log::debug('Controller Setup Trait -> setResponseHelper');
        $this->responder = ResponseService::getProcessor($processorId);
    }


}