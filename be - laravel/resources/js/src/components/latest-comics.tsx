import React, { useState } from 'react'
import { Star, Eye, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
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
  description: string
}

const latestComics: Comic[] = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    views: "1.2M",
    lastUpdate: "2 hari lalu",
    chapter: "Ch. 139",
    genre: ["Action", "Drama", "Fantasy"],
    status: "Completed",
    description: "Humanity fights for survival against giant humanoid Titans."
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    views: "950K",
    lastUpdate: "1 hari lalu",
    chapter: "Ch. 205",
    genre: ["Action", "Supernatural", "Historical"],
    status: "Completed",
    description: "A young boy becomes a demon slayer to save his sister."
  },
  {
    id: 3,
    title: "One Piece",
    image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    views: "2.1M",
    lastUpdate: "3 jam lalu",
    chapter: "Ch. 1100",
    genre: ["Adventure", "Comedy", "Shounen"],
    status: "Ongoing",
    description: "Follow Monkey D. Luffy on his quest to become the Pirate King."
  },
  {
    id: 4,
    title: "Solo Leveling",
    image: "https://images.unsplash.com/photo-1741851360205-2c2edc13c04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5od2ElMjBrb3JlYW4lMjBjb21pY3xlbnwxfHx8fDE3NTc0MDM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    views: "1.8M",
    lastUpdate: "5 jam lalu",
    chapter: "Ch. 179",
    genre: ["Action", "Adventure", "Fantasy"],
    status: "Completed",
    description: "The weakest hunter becomes the strongest through a mysterious system."
  },
  {
    id: 5,
    title: "Tower of God",
    image: "https://images.unsplash.com/photo-1700041571208-0677be9687dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5odWElMjBjaGluZXNlJTIwY29taWN8ZW58MXx8fHwxNzU3NDAzODA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    views: "890K",
    lastUpdate: "1 hari lalu",
    chapter: "Ch. 590",
    genre: ["Action", "Adventure", "Mystery"],
    status: "Ongoing",
    description: "A boy enters a mysterious tower to follow his friend."
  },
  {
    id: 6,
    title: "Naruto",
    image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    views: "1.5M",
    lastUpdate: "2 hari lalu",
    chapter: "Ch. 700",
    genre: ["Action", "Adventure", "Ninja"],
    status: "Completed",
    description: "Follow Naruto's journey to become the greatest ninja."
  },
  {
    id: 7,
    title: "Jujutsu Kaisen",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    views: "1.3M",
    lastUpdate: "6 jam lalu",
    chapter: "Ch. 248",
    genre: ["Action", "Supernatural", "School"],
    status: "Ongoing",
    description: "Students fight against cursed spirits in this supernatural series."
  },
  {
    id: 8,
    title: "My Hero Academia",
    image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    views: "1.1M",
    lastUpdate: "4 jam lalu",
    chapter: "Ch. 403",
    genre: ["Action", "Superhero", "School"],
    status: "Ongoing",
    description: "In a world of superpowers, a quirkless boy aims to be a hero."
  }
]

const ITEMS_PER_PAGE = 6

interface LatestComicsProps {
  onComicClick: (comicId: number) => void
  onChapterClick?: (comicId: number, chapterId: number) => void
}

export function LatestComics({ onComicClick, onChapterClick }: LatestComicsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(latestComics.length / ITEMS_PER_PAGE)
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentComics = latestComics.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Rilisan Terbaru</h2>
          <p className="text-muted-foreground">Update komik terbaru setiap hari</p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentComics.map((comic) => (
            <Card 
              key={comic.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 bg-card/80 backdrop-blur-sm"
              onClick={() => onComicClick(comic.id)}
            >
              <div className="flex">
                <div className="relative w-24 flex-shrink-0">
                  <ImageWithFallback
                    src={comic.image}
                    alt={comic.title}
                    className="w-full h-32 object-cover rounded-l-lg"
                  />
                  <Badge 
                    className={`absolute top-1 right-1 text-xs ${
                      comic.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  >
                    {comic.status === 'Ongoing' ? 'ON' : 'END'}
                  </Badge>
                </div>
                
                <CardContent className="flex-1 p-4">
                  <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-blue-500 transition-colors">
                    {comic.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {comic.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {comic.genre.slice(0, 2).map((g) => (
                      <Badge key={g} variant="secondary" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{comic.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{comic.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{comic.lastUpdate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">
                      {comic.chapter}
                    </span>
                    {onChapterClick && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          onChapterClick(comic.id, comic.id + 100) // Mock chapter ID
                        }}
                        className="text-xs"
                      >
                        Baca
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile Single Column */}
        <div className="md:hidden space-y-4 mb-8">
          {currentComics.map((comic) => (
            <Card 
              key={comic.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-card/80 backdrop-blur-sm"
              onClick={() => onComicClick(comic.id)}
            >
              <div className="flex">
                <div className="relative w-20 flex-shrink-0">
                  <ImageWithFallback
                    src={comic.image}
                    alt={comic.title}
                    className="w-full h-28 object-cover rounded-l-lg"
                  />
                  <Badge 
                    className={`absolute top-1 right-1 text-xs ${
                      comic.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  >
                    {comic.status === 'Ongoing' ? 'ON' : 'END'}
                  </Badge>
                </div>
                
                <CardContent className="flex-1 p-3">
                  <h3 className="font-semibold mb-1 line-clamp-1">
                    {comic.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {comic.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {comic.genre.slice(0, 2).map((g) => (
                      <Badge key={g} variant="secondary" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{comic.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{comic.views}</span>
                      </div>
                    </div>
                    <span className="text-blue-600 font-medium">{comic.chapter}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{comic.lastUpdate}</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              onClick={() => goToPage(page)}
              className="w-10 h-10"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}