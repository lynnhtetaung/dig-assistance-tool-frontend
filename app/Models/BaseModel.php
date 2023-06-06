<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Based model class that extends Eloquent Model class.
 */
class BaseModel extends Model
{
    /**
     * BaseModel construct.
     *
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->setup();
    }

    /**
     * Initial setup for model instance initialization.
     */
    public function setup()
    {
        $this->setPerPage(config('settings.fetch_per_page'));
    }
}