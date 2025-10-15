<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    protected $fillable = [
        'comic_id', 'title', 'slug', 'chapter_number', 'source_url', 'release_date'
    ];

    public function comic()
    {
        return $this->belongsTo(Comic::class);
    }

    public function pages()
    {
        return $this->hasMany(ChapterPage::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function histories()
    {
        return $this->hasMany(History::class);
    }
}
