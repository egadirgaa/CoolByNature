<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ComicTag extends Pivot
{
    use HasFactory;

    protected $table = 'comic_tags';

    protected $fillable = [
        'comic_id',
        'tag_id',
    ];

    // Relasi ke Comic
    public function comic()
    {
        return $this->belongsTo(Comic::class);
    }

    // Relasi ke Tag
    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }
}
