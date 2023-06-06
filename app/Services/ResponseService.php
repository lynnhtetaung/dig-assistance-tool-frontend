<?php

namespace App\Services;

use App\Enums\Processors;

class ResponseService
{
    protected $mappedProcessorClass = array();
    protected $processorPath = "App\Helper\Response\\";
    protected $processorList = array(
        Processors::DEFAULT => 'DefaultProcessor',
        Processors::EXCEPTION => 'ExceptionProcessor',
        Processors::DOCKER_MANAGE => 'DockerManageProcessor'
    );

     /**
     * Constructor.
     */
    public function __construct()
    {
        $this->_createProcessor();
    }

    public function _createProcessor()
    {
        foreach ($this->processorList as $key => $node) {
            $this->mappedProcessorClass[$key] = $this->processorList[$key];
        }
    }

    public function getProcessor(int $processorId)
    {
        $id = (isset($this->mappedProcessorClass[$processorId]) ? $processorId : Processors::DEFAULT);
        $target = $this->mappedProcessorClass[$id];
        $helperPath = $this->processorPath;
        $fullPath = $helperPath.$target;
        $instance = $fullPath::instance();
        return $instance;
    }
}