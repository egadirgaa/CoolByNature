<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    protected $fillable = ['name', 'base_url', 'status', 'last_scraped_at'];

    public function scrapLogs()
    {
        return $this->hasMany(ScrapLog::class);
    }
}
