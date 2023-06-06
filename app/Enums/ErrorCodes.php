<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * Defines the error codes.
 */
final class ErrorCodes extends Enum
{
    // Content related error range from 100 - 999
    const EXCEPTION_ERROR = '001_100';
    const NO_CONTENT = '001_101';
    const UNAUTHORIZED_ACCESS = '001_102';
    const BAD_REQUEST = '001_103';
    const NOT_FOUND = '001_104';
    const MULTIPLE_DEVICES_ACCESS = '001_105';
    const NO_PACKAGE_EXIST = '001_106';
    const MULTIPLE_SUBSCRIPTIONS = '001_107';
    const DATA_SAVE_ERROR = '001_108';
    const DATA_UPDATE_ERROR = '001_109';
    const DATA_DELETE_ERROR = '001_110';
    const EXPIRED_DATE_ERROR = '001_111';
    const INVALID_ACCESS_DATA = '001_112';

    // SQL related errors range from 001 - 099
    const SQL_ERROR = '001_001';

    // Connection related error range from 100 - 999
    const NO_WS_CONNECTION = '002_100';

    // No connection to streaming server management system
    const NO_MSS_CONNECTION = '002_101';

    // Client related errors range from 100 - 999;
    // Prefix constant name with APP_
    const APP_NO_ACTIVE_DEVICES = '003_100';
    const APP_NO_REGSTERED_USER = '003_101';
}
