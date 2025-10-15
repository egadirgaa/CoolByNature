import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, Star, Eye, Clock } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Comic {
  id: number
  title: string
  image: string
  rating: number
  views: string
  lastUpdate: string
  chapter: string
  genre: string[]
  status: 'Ongoing' | 'Completed'
}

const popularComics: Comic[] = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    views: "1.2M",
    lastUpdate: "2 hari lalu",
    chapter: "Ch. 139",
    genre: ["Action", "Drama"],
    status: "Completed"
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    views: "950K",
    lastUpdate: "1 hari lalu",
    chapter: "Ch. 205",
    genre: ["Action", "Supernatural"],
    status: "Completed"
  },
  {
    id: 3,
    title: "One Piece",
    image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    views: "2.1M",
    lastUpdate: "3 jam lalu",
    chapter: "Ch. 1100",
    genre: ["Adventure", "Comedy"],
    status: "Ongoing"
  },
  {
    id: 4,
    title: "Solo Leveling",
    image: "https://images.unsplash.com/photo-1741851360205-2c2edc13c04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5od2ElMjBrb3JlYW4lMjBjb21pY3xlbnwxfHx8fDE3NTc0MDM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    views: "1.8M",
    lastUpdate: "5 jam lalu",
    chapter: "Ch. 179",
    genre: ["Action", "Adventure"],
    status: "Completed"
  },
  {
    id: 5,
    title: "Tower of God",
    image: "https://images.unsplash.com/photo-1700041571208-0677be9687dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5odWElMjBjaGluZXNlJTIwY29taWN8ZW58MXx8fHwxNzU3NDAzODA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    views: "890K",
    lastUpdate: "1 hari lalu",
    chapter: "Ch. 590",
    genre: ["Action", "Mystery"],
    status: "Ongoing"
  },
  {
    id: 6,
    title: "Naruto",
    image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    views: "1.5M",
    lastUpdate: "2 hari lalu",
    chapter: "Ch. 700",
    genre: ["Action", "Adventure"],
    status: "Completed"
  }
]

interface PopularComicsProps {
  onComicClick: (comicId: number) => void
}

export function PopularComics({ onComicClick }: PopularComicsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Komik Terpopuler</h2>
            <p className="text-muted-foreground">Komik dengan rating dan views tertinggi</p>
          </div>
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" size="icon" onClick={scrollLeft}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollRight}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {popularComics.map((comic) => (
            <Card 
              key={comic.id} 
              className="flex-shrink-0 w-64 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 bg-card/80 backdrop-blur-sm"
              onClick={() => onComicClick(comic.id)}
            >
              <div className="relative">
                <ImageWithFallback
                  src={comic.image}
                  alt={comic.title}
                  className="w-full h-80 object-cover rounded-t-lg"
                />
                <Badge 
                  className={`absolute top-2 right-2 ${
                    comic.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                >
                  {comic.status}
                </Badge>
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 rounded p-2 text-white text-sm">
                  <div className="flex justify-between items-center">
                    <span>{comic.chapter}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{comic.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-blue-500 transition-colors">
                  {comic.title}
                </h3>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {comic.genre.slice(0, 2).map((g) => (
                    <Badge key={g} variant="secondary" className="text-xs">
                      {g}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{comic.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{comic.lastUpdate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        <div className="md:hidden mt-4 flex justify-center">
          <p className="text-sm text-muted-foreground">Geser untuk melihat lebih banyak →</p>
        </div>
      </div>
    </section>
  )
}