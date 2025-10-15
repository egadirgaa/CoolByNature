import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star, Eye } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Comic {
  id: number
  title: string
  image: string
  rating: number
  views: string
  chapter: string
  genre: string[]
}

const genreRecommendations = {
  action: [
    {
      id: 1,
      title: "Attack on Titan",
      image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      views: "1.2M",
      chapter: "Ch. 139",
      genre: ["Action", "Drama"]
    },
    {
      id: 2,
      title: "Demon Slayer",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      views: "950K",
      chapter: "Ch. 205",
      genre: ["Action", "Supernatural"]
    },
    {
      id: 3,
      title: "Solo Leveling",
      image: "https://images.unsplash.com/photo-1741851360205-2c2edc13c04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5od2ElMjBrb3JlYW4lMjBjb21pY3xlbnwxfHx8fDE3NTc0MDM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      views: "1.8M",
      chapter: "Ch. 179",
      genre: ["Action", "Adventure"]
    },
    {
      id: 4,
      title: "Jujutsu Kaisen",
      image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      views: "1.3M",
      chapter: "Ch. 248",
      genre: ["Action", "Supernatural"]
    },
    {
      id: 5,
      title: "My Hero Academia",
      image: "https://images.unsplash.com/photo-1700041571208-0677be9687dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5odWElMjBjaGluZXNlJTIwY29taWN8ZW58MXx8fHwxNzU3NDAzODA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      views: "1.1M",
      chapter: "Ch. 403",
      genre: ["Action", "Superhero"]
    }
  ],
  romance: [
    {
      id: 6,
      title: "Kaguya-sama",
      image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      views: "780K",
      chapter: "Ch. 281",
      genre: ["Romance", "Comedy"]
    },
    {
      id: 7,
      title: "Horimiya",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.5,
      views: "650K",
      chapter: "Ch. 122",
      genre: ["Romance", "Slice of Life"]
    },
    {
      id: 8,
      title: "Rent-A-Girlfriend",
      image: "https://images.unsplash.com/photo-1741851360205-2c2edc13c04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5od2ElMjBrb3JlYW4lMjBjb21pY3xlbnwxfHx8fDE3NTc0MDM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.2,
      views: "590K",
      chapter: "Ch. 312",
      genre: ["Romance", "Comedy"]
    },
    {
      id: 9,
      title: "Nagatoro-san",
      image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.4,
      views: "520K",
      chapter: "Ch. 138",
      genre: ["Romance", "Comedy"]
    },
    {
      id: 10,
      title: "Uzaki-chan",
      image: "https://images.unsplash.com/photo-1700041571208-0677be9687dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5odWElMjBjaGluZXNlJTIwY29taWN8ZW58MXx8fHwxNzU3NDAzODA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.3,
      views: "480K",
      chapter: "Ch. 96",
      genre: ["Romance", "Comedy"]
    }
  ],
  fantasy: [
    {
      id: 11,
      title: "Tower of God",
      image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      views: "890K",
      chapter: "Ch. 590",
      genre: ["Fantasy", "Action"]
    },
    {
      id: 12,
      title: "The Beginning After The End",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      views: "1.1M",
      chapter: "Ch. 168",
      genre: ["Fantasy", "Adventure"]
    },
    {
      id: 13,
      title: "Mushoku Tensei",
      image: "https://images.unsplash.com/photo-1741851360205-2c2edc13c04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5od2ElMjBrb3JlYW4lMjBjb21pY3xlbnwxfHx8fDE3NTc0MDM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      views: "920K",
      chapter: "Ch. 91",
      genre: ["Fantasy", "Isekai"]
    },
    {
      id: 14,
      title: "Overlord",
      image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.5,
      views: "750K",
      chapter: "Ch. 78",
      genre: ["Fantasy", "Isekai"]
    },
    {
      id: 15,
      title: "Re:Zero",
      image: "https://images.unsplash.com/photo-1700041571208-0677be9687dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5odWElMjBjaGluZXNlJTIwY29taWN8ZW58MXx8fHwxNzU3NDAzODA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      views: "820K",
      chapter: "Ch. 85",
      genre: ["Fantasy", "Psychological"]
    }
  ]
}

interface RecommendationSwiperProps {
  comics: Comic[]
  title: string
}

function RecommendationSwiper({ comics, title }: RecommendationSwiperProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="hidden md:flex space-x-2">
          <Button variant="outline" size="sm" onClick={scrollLeft}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={scrollRight}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {comics.map((comic) => (
          <Card 
            key={comic.id} 
            className="flex-shrink-0 w-48 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 bg-card/80 backdrop-blur-sm"
            onClick={() => onComicClick(comic.id)}
          >
            <div className="relative">
              <ImageWithFallback
                src={comic.image}
                alt={comic.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 rounded p-2 text-white text-xs">
                <div className="flex justify-between items-center">
                  <span>{comic.chapter}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{comic.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-3">
              <h4 className="font-medium mb-2 line-clamp-1 group-hover:text-blue-500 transition-colors">
                {comic.title}
              </h4>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {comic.genre.slice(0, 2).map((g) => (
                  <Badge key={g} variant="secondary" className="text-xs">
                    {g}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Eye className="w-3 h-3" />
                <span>{comic.views}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface RecommendationSectionProps {
  onComicClick: (comicId: number) => void
}

export function RecommendationSection({ onComicClick }: RecommendationSectionProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Rekomendasi Berdasarkan Genre</h2>
          <p className="text-muted-foreground">Temukan komik sesuai dengan genre favorit Anda</p>
        </div>

        <Tabs defaultValue="action" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="action">Action</TabsTrigger>
              <TabsTrigger value="romance">Romance</TabsTrigger>
              <TabsTrigger value="fantasy">Fantasy</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="action">
            <RecommendationSwiper 
              comics={genreRecommendations.action} 
              title="Rekomendasi Action Terbaik"
            />
          </TabsContent>

          <TabsContent value="romance">
            <RecommendationSwiper 
              comics={genreRecommendations.romance} 
              title="Rekomendasi Romance Terbaik"
            />
          </TabsContent>

          <TabsContent value="fantasy">
            <RecommendationSwiper 
              comics={genreRecommendations.fantasy} 
              title="Rekomendasi Fantasy Terbaik"
            />
          </TabsContent>
        </Tabs>

        {/* Mobile scroll indicator */}
        <div className="md:hidden mt-4 flex justify-center">
          <p className="text-sm text-muted-foreground">Geser untuk melihat lebih banyak →</p>
        </div>
      </div>
    </section>
  )
}