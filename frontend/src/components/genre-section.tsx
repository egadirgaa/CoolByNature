import React from 'react'
import { Badge } from './ui/badge'
import { Card } from './ui/card'

const genres = [
  { name: "Action", count: 1234, color: "bg-red-500" },
  { name: "Adventure", count: 987, color: "bg-orange-500" },
  { name: "Comedy", count: 765, color: "bg-yellow-500" },
  { name: "Drama", count: 654, color: "bg-green-500" },
  { name: "Fantasy", count: 1098, color: "bg-blue-500" },
  { name: "Romance", count: 876, color: "bg-pink-500" },
  { name: "Supernatural", count: 543, color: "bg-purple-500" },
  { name: "Psychological", count: 432, color: "bg-indigo-500" },
  { name: "Thriller", count: 321, color: "bg-gray-500" },
  { name: "Slice of Life", count: 567, color: "bg-teal-500" },
  { name: "Mystery", count: 445, color: "bg-cyan-500" },
  { name: "Horror", count: 234, color: "bg-red-600" },
]

export function GenreSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Jelajahi Genre</h2>
          <p className="text-muted-foreground">Temukan komik berdasarkan genre favorit Anda</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <Card
              key={genre.name}
              className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 bg-card/50 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`w-12 h-12 rounded-full ${genre.color} flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform`}>
                  {genre.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-sm md:text-base">{genre.name}</h3>
                  <p className="text-xs text-muted-foreground">{genre.count} komik</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Tags */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Tag Populer</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Completed", "Ongoing", "School Life", "Isekai", "Martial Arts",
              "Cultivation", "System", "Revenge", "Overpowered MC", "Magic",
              "Academy", "Harem", "Reincarnation", "Game Elements", "Monsters"
            ].map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}