<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScrapLog extends Model
{
    protected $fillable = ['source_id', 'comic_id', 'chapter_id', 'status', 'message'];

    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    public function comic()
    {
        return $this->belongsTo(Comic::class);
    }

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }
}
