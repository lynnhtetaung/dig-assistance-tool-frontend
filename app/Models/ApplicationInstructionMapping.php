<?php

namespace App\Models;

use App\Models\BaseModel;
use Carbon\Carbon;
use Log;

class ApplicationInstructionMapping extends BaseModel
{
    /**
     * The database connection used by the model.
     *
     * @var string
     */
    protected $connection = 'funabiki_docker_manage';

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'application_instruction_mapping';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'application_id',
        'instruction_key',
        'instruction_value',
        'status'
    ];

    public function saveAppInsMapping($data)
    {
        return $this->create(
            [
                'application_id' => $data['application_id'],
                'instruction_key' => $data['instruction_key'],
                'instruction_value' => $data['instruction_value']
            ]
        );
    }

    public function updateAppInsMapping($data)
    {
        return $this->updateOrCreate(
            [
                'id' => $data[id]
            ],
            [
                'application_id' => $data['application_id'],
                'instruction_key' => $data['instruction_key'],
                'instruction_value' => $data['instruction_value']
            ]       
        );
    }

    public function getAppInsMappingById($appId)
    {
        return $this::where('application_id', $appId)
            ->where('status', 0)
            ->select('id', 'instruction_key as key', 'instruction_value as value')
            ->get();
    }

}