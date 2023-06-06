<?php

namespace App\Helper;

use App\Enums\Processors;
use ResponseService;
use Log;

/**
 * Abstract singleton helper class to provide the corresponding class instance.
 * Also handle the setup for the constructor.
 */
abstract class HelperSingleton
{
    protected $processor = null;

    /**
     * Call this method to get singleton.
     */
    public static function instance() {
        static $instanceHelper = false;
        if ($instanceHelper == false) {
            // Late static binding (PHP 5.3+)
            $instanceHelper = new static();
        }
        return $instanceHelper;
    }


     /**
     * Class constructor. Handle setup and initialization.
     */
    public function __construct() {
        $processorName = (isset($this->processorName) ? $this->processorName : Processors::DEFAULT);
        $this->processor = ResponseService::getProcessor($processorName);
    }

   

}