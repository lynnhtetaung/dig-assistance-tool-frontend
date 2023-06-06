<?php 

namespace App\Services;

use Log;
use App\Enums\Services;
use App\Helper\Manage\DockerFile\BaseHelper;

/**
 * HelperService Class.
 */
class HelperService
{
    protected $helperName = '';
    protected $mappedHelperClass = [];
    protected $helperClassPath = "App\Helper\Manage\DockerFile\\";

    protected $dockerManageHelperList = array(
        Services::DOCKER_MANAGE => 'BaseHelper'
    );

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->_createDockerManageHelper();
    }

    /**
     * Create Docker Manage Helper function
     */
    private function _createDockerManageHelper()
    {
        // Log::debug('Helper Service -> _createDockerManageHelper()');
        foreach ($this->dockerManageHelperList as $key => $node) {
            $this->mappedHelperClass[$key] = $this->dockerManageHelperList[$key];
        }
    }

    /**
     * Get Helper Class Nmaes.
     *
     * @param [string] $name
     *
     * @return mixed helper instance; return null if helper is not available
    */
    public function getHelper($name)
    {
        $instance = null;
        if (isset($this->mappedHelperClass[$name])) {
            $target = $this->mappedHelperClass[$name];
            $helperPath = $this->helperClassPath;
            $fullPath = $helperPath.$target;
            $instance = $fullPath::instance();
        }

        return  $instance;
    }

}