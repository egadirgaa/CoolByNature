<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChapterPage extends Model
{
    protected $fillable = ['chapter_id', 'page_number', 'image_url'];

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }
}
