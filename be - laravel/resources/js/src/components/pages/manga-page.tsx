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

const mangaComics: Comic[] = [
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
    image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
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
    id: 5,
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
    id: 6,
    title: "My Hero Academia",
    image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    views: "1.1M",
    lastUpdate: "4 jam lalu",
    chapter: "Ch. 403",
    genre: ["Action", "Superhero", "School"],
    status: "Ongoing",
    description: "In a world of superpowers, a quirkless boy aims to be a hero."
  }
]

const ITEMS_PER_PAGE = 12

interface MangaPageProps {
  onComicClick: (comicId: number) => void
}

export function MangaPage({ onComicClick }: MangaPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [filterGenre, setFilterGenre] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredComics = mangaComics.filter(comic => {
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
        return 0 // Keep original order for latest
    }
  })

  const totalPages = Math.ceil(sortedComics.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentComics = sortedComics.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Daftar Manga</h1>
          <p className="text-muted-foreground">Koleksi lengkap manga terbaik dari Jepang</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Cari manga..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
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
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="supernatural">Supernatural</SelectItem>
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

            {/* View Mode Toggle */}
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

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Menampilkan {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedComics.length)} dari {sortedComics.length} manga
          </p>
        </div>

        {/* Comics Grid/List */}
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
                  <h3 className="font-semibold mb-1 line-clamp-2 text-sm group-hover:text-blue-500 transition-colors">
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
                    <h3 className="font-semibold mb-2 group-hover:text-blue-500 transition-colors">
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
                      <div className="text-blue-600 font-medium">{comic.chapter}</div>
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

        {/* Pagination */}
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