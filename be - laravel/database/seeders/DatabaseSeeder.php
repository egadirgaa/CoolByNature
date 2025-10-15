<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Users
        DB::table('users')->insert([
            [
                'username' => 'admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'user1',
                'email' => 'user1@example.com',
                'password' => Hash::make('password'),
                'role' => 'user',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Genres
        DB::table('genres')->insert([
            ['name' => 'Action', 'slug' => 'action', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Romance', 'slug' => 'romance', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Comedy', 'slug' => 'comedy', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Fantasy', 'slug' => 'fantasy', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Tags (status + fleksibel label lain)
        DB::table('tags')->insert([
            ['name' => 'Ongoing', 'slug' => 'ongoing', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Completed', 'slug' => 'completed', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Hiatus', 'slug' => 'hiatus', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Comics (tanpa kolom status lagi)
        DB::table('comics')->insert([
            [
                'title' => 'One Piece',
                'slug' => 'one-piece',
                'cover_url' => 'https://example.com/onepiece.jpg',
                'description' => 'Petualangan Luffy dan kru bajak laut Topi Jerami.',
                'author' => 'Eiichiro Oda',
                'artist' => 'Eiichiro Oda',
                'release_year' => 1997,
                'type' => 'manga',
                'views' => 1000,
                'rating' => 4.9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Solo Leveling',
                'slug' => 'solo-leveling',
                'cover_url' => 'https://example.com/sololeveling.jpg',
                'description' => 'Petualangan Sung Jin-Woo sebagai hunter terlemah menjadi terkuat.',
                'author' => 'Chugong',
                'artist' => 'Dubu',
                'release_year' => 2016,
                'type' => 'manhwa',
                'views' => 800,
                'rating' => 4.8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Chapters
        DB::table('chapters')->insert([
            [
                'comic_id' => 1,
                'title' => 'Chapter 1',
                'slug' => 'one-piece-chapter-1',
                'chapter_number' => 1,
                'source_url' => null,
                'release_date' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'comic_id' => 2,
                'title' => 'Chapter 1',
                'slug' => 'solo-leveling-chapter-1',
                'chapter_number' => 1,
                'source_url' => null,
                'release_date' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Chapter Pages
        DB::table('chapter_pages')->insert([
            [
                'chapter_id' => 1,
                'page_number' => 1,
                'image_url' => 'https://example.com/onepiece/ch1-p1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'chapter_id' => 2,
                'page_number' => 1,
                'image_url' => 'https://example.com/sololeveling/ch1-p1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Comic Genre
        DB::table('comic_genre')->insert([
            ['comic_id' => 1, 'genre_id' => 1, 'created_at' => now(), 'updated_at' => now()], // One Piece - Action
            ['comic_id' => 2, 'genre_id' => 4, 'created_at' => now(), 'updated_at' => now()], // Solo Leveling - Fantasy
        ]);

        // Comic Tags (status)
        DB::table('comic_tags')->insert([
            ['comic_id' => 1, 'tag_id' => 1, 'created_at' => now(), 'updated_at' => now()], // One Piece - Ongoing
            ['comic_id' => 2, 'tag_id' => 2, 'created_at' => now(), 'updated_at' => now()], // Solo Leveling - Completed
        ]);

        // Sources
        DB::table('sources')->insert([
            [
                'name' => 'MangaDex',
                'base_url' => 'https://mangadex.org',
                'status' => 'active',
                'last_scraped_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Webtoon',
                'base_url' => 'https://webtoons.com',
                'status' => 'inactive',
                'last_scraped_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
