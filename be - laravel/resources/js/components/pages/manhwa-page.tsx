import React, { useState } from 'react'
import { Search, Filter, Grid, List, Star, Eye, Clock } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ImageWithFallback } from '../figma/ImageWithFallback'

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

const manhwaComics: Comic[] = [
  {
    id: 1,
    title: "Solo Leveling",
    image: "https://images.unsplash.com/photo-1741851360205-2c2edc13c04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5od2ElMjBrb3JlYW4lMjBjb21pY3xlbnwxfHx8fDE3NTc0MDM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    views: "2.1M",
    lastUpdate: "3 jam lalu",
    chapter: "Ch. 179",
    genre: ["Action", "Adventure", "Fantasy"],
    status: "Completed",
    description: "The weakest hunter becomes the strongest through a mysterious system."
  },
  {
    id: 2,
    title: "Tower of God",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    views: "1.8M",
    lastUpdate: "1 hari lalu",
    chapter: "Ch. 590",
    genre: ["Action", "Adventure", "Mystery"],
    status: "Ongoing",
    description: "A boy enters a mysterious tower to follow his friend."
  },
  {
    id: 3,
    title: "The Beginning After The End",
    image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    views: "1.5M",
    lastUpdate: "2 hari lalu",
    chapter: "Ch. 168",
    genre: ["Fantasy", "Adventure", "Magic"],
    status: "Ongoing",
    description: "A king reincarnated in a world of magic and adventure."
  },
  {
    id: 4,
    title: "True Beauty",
    image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    views: "1.2M",
    lastUpdate: "5 jam lalu",
    chapter: "Ch. 245",
    genre: ["Romance", "Comedy", "School"],
    status: "Ongoing",
    description: "A girl's transformation and journey through love and friendship."
  },
  {
    id: 5,
    title: "Lookism",
    image: "https://images.unsplash.com/photo-1741851360205-2c2edc13c04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5od2ElMjBrb3JlYW4lMjBjb21pY3xlbnwxfHx8fDE3NTc0MDM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    views: "1.4M",
    lastUpdate: "1 hari lalu",
    chapter: "Ch. 475",
    genre: ["Drama", "Action", "Psychological"],
    status: "Ongoing",
    description: "A story about bullying, body image, and dual identity."
  },
  {
    id: 6,
    title: "Noblesse",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    views: "1.1M",
    lastUpdate: "3 hari lalu",
    chapter: "Ch. 544",
    genre: ["Action", "Supernatural", "Vampire"],
    status: "Completed",
    description: "A noble vampire awakens in modern times."
  }
]

const ITEMS_PER_PAGE = 12

interface ManhwaPageProps {
  onComicClick: (comicId: number) => void
}

export function ManhwaPage({ onComicClick }: ManhwaPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [filterGenre, setFilterGenre] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredComics = manhwaComics.filter(comic => {
    const matchesSearch = comic.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = filterGenre === 'all' || comic.genre.some(g => g.toLowerCase() === filterGenre.toLowerCase())
    const matchesStatus = filterStatus === 'all' || comic.status.toLowerCase() === filterStatus.toLowerCase()
    
    return matchesSearch && matchesGenre && matchesStatus
  })

  const sortedComics = [...filteredComics].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'rating':
        return b.rating - a.rating
      case 'views':
        return parseFloat(b.views.replace(/[KM]/g, '')) - parseFloat(a.views.replace(/[KM]/g, ''))
      case 'latest':
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedComics.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentComics = sortedComics.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Daftar Manhwa</h1>
          <p className="text-muted-foreground">Koleksi lengkap manhwa terbaik dari Korea Selatan</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Cari manhwa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Terbaru</SelectItem>
                <SelectItem value="title">Judul A-Z</SelectItem>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
                <SelectItem value="views">Paling Populer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterGenre} onValueChange={setFilterGenre}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Genre</SelectItem>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="psychological">Psychological</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Menampilkan {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedComics.length)} dari {sortedComics.length} manhwa
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {currentComics.map((comic) => (
              <Card 
                key={comic.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105"
                onClick={() => onComicClick(comic.id)}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={comic.image}
                    alt={comic.title}
                    className="w-full h-48 sm:h-64 object-cover rounded-t-lg"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${
                      comic.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  >
                    {comic.status}
                  </Badge>
                </div>
                
                <CardContent className="p-3">
                  <h3 className="font-semibold mb-1 line-clamp-2 text-sm group-hover:text-purple-500 transition-colors">
                    {comic.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{comic.rating}</span>
                    </div>
                    <span>{comic.chapter}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Eye className="w-3 h-3" />
                    <span>{comic.views}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {currentComics.map((comic) => (
              <Card 
                key={comic.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer"
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
                    <h3 className="font-semibold mb-2 group-hover:text-purple-500 transition-colors">
                      {comic.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {comic.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {comic.genre.slice(0, 3).map((g) => (
                        <Badge key={g} variant="secondary" className="text-xs">
                          {g}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{comic.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{comic.views}</span>
                        </div>
                      </div>
                      <div className="text-purple-600 font-medium">{comic.chapter}</div>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-2">
                      <Clock className="w-3 h-3" />
                      <span>{comic.lastUpdate}</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-10"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}