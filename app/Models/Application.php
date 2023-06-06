<?php

namespace App\Models;

use App\Models\BaseModel;
use Carbon\Carbon;
use Log;

class Application extends BaseModel
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
    protected $table = 'application';

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
        'name',
        'description',
        'os_type',
        'programming',
        'image_status',
        'status'
    ];

    public function saveApplication($data)
    {
        return $this->firstOrCreate(
            [
                'name' => $data['name'],
                'description' => $data['description'],
                'os_type'=> $data['os_type'],
                'programming'=> $data['programming'],
            ]
        );
    }

    public function getAllActive()
    {
        return $this::where('application.status', 0)
            ->leftJoin('programmings', function ($join) {
                $join->on('application.programming', '=', 'programmings.id')
                    ->where('programmings.status', 0);
            })
            ->select('application.*', 'programmings.name as programming_name', 'programmings.type')
            ->orderBy('application.id')
            ->get();
    }

    public function getAppById($id)
    {
        return $this::where('id', $id)
            ->where('status', 0)
            ->first();
    }

    public function changeStatus($id, $status)
    {
        return $this::where('id', $id)
        ->update(
            [
                'image_status'=> $status
            ]
        );
    }

    public function deleteApplication($id)
    {
        return $this::where('id', $id)
        ->update(
            [
                'status'=> 2
            ]
        );
    }

}