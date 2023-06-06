<?php

namespace App\Helper\Response;

use App;
use Log;

/**
 * Static response helper. This class help to maintain the default response json.
 */
class Processor
{
    /**
     * Call this method to get singleton.
     */
    public static function instance()
    {
        static $instanceProcessor = false;
        if ($instanceProcessor === false) {
            // Late static binding (PHP 5.3+)
            $instanceProcessor = new static();
        }

        return $instanceProcessor;
    }

    /**
     * Format the response format for consistency.
     * Note: This function required to call with pagination support.
     *
     * @param mixed $data    collection fetch from model
     * @param array $options request parameter options
     *
     * @return array formatted result
     */
    public function formatPaginationResponse($data, array $options)
    {
        $result = $this->getDefaultSuccess();
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
     * Check and set the locale if request has locale parameter and
     * it's different from current locale.
     */
    public function checkAndSetLocale()
    {
        $requestLocale = strtolower(request('locale', 'en'));
        if (!App::isLocale($requestLocale)) {
            Log::debug('Request locale >> '.$requestLocale);
            App::setLocale($requestLocale);
        }
    }

    /**
     * Retrieve the localized message.
     *
     * @param string $message message to be localized
     * @param array  $param   localization key string replacement
     *
     * @return string localized message
     */
    public function lm($message, $param = [])
    {
        $this->checkAndSetLocale();

        return __($message, $param);
    }

    /**
     * Retrieve the localized error code message. This method also set the new
     * locale if Request param contain locale setting. Here note that app.php needs
     * to set 'fallback_locale' => 'en' in case we don't support.
     *
     * @param string $errorCode error code
     * @param array  $param     localization key string replacement
     *
     * @return string localized error message
     */
    public function getErrorCodeMessage($errorCode, $param = [])
    {
        $this->checkAndSetLocale();

        return __('messages.error.codes.'.$errorCode, $param);
    }

    /**
     * Retrieve the localized error message and return in array with its
     * corresponding or given error.
     *
     * @param string $errorCode error code
     * @param string $message   error message
     * @param array  $param     localization key string replacement
     *
     * @return array message wrapped in ['code' => $errorCode, 'message' => xxxxx]
     */
    public function getErrorMessage($errorCode, $message = null, $param = [])
    {
        Log::debug('getErrorMessage() Param >> '.print_r($param, true));
        $message = $message ?? $this->getErrorCodeMessage($errorCode, $param);

        return ['code' => $errorCode, 'message' => $message];
    }

    /**
     * Return the default response array. Response status code
     * should be equal to HTTP status code 200.
     *
     * @return array $resp
     */
    public function getDefaultSuccess()
    {
        $resp = array(
          'status' => 200,
          'error' => [],
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
    public function sanitizeOptions($options)
    {
        $defaultOptions = ['page' => 1];

        return array_merge($defaultOptions, $options);
    }
}
