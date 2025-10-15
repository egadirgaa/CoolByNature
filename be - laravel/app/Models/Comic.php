<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comic extends Model
{
    protected $fillable = [
        'title', 'slug', 'cover_url', 'status', 'description',
        'author', 'artist', 'release_year', 'type'
    ];

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'comic_genre');
    }

    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'comic_tag')
                    ->using(ComicTag::class)
                    ->withTimestamps();
    }
}
