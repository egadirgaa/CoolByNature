import React, { useState } from 'react'
import { Bookmark, Search, Trash2, Filter, Grid, List, Star, Eye, Clock, BookmarkCheck } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

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
  bookmarkedAt: string
  type: 'manga' | 'manhwa' | 'manhua'
}

const bookmarkedComics: Comic[] = [
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
    description: "Humanity fights for survival against giant humanoid Titans.",
    bookmarkedAt: "3 hari lalu",
    type: "manga"
  },
  {
    id: 2,
    title: "Solo Leveling",
    image: "https://images.unsplash.com/photo-1741851360205-2c2edc13c04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5od2ElMjBrb3JlYW4lMjBjb21pY3xlbnwxfHx8fDE3NTc0MDM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    views: "2.1M",
    lastUpdate: "3 jam lalu",
    chapter: "Ch. 179",
    genre: ["Action", "Adventure", "Fantasy"],
    status: "Completed",
    description: "The weakest hunter becomes the strongest through a mysterious system.",
    bookmarkedAt: "1 minggu lalu",
    type: "manhwa"
  },
  {
    id: 3,
    title: "Soul Land",
    image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    views: "2.8M",
    lastUpdate: "3 jam lalu",
    chapter: "Ch. 378",
    genre: ["Action", "Fantasy", "Adventure"],
    status: "Ongoing",
    description: "Tang San's journey in a world of martial souls and spirit beasts.",
    bookmarkedAt: "2 hari lalu",
    type: "manhua"
  },
  {
    id: 4,
    title: "One Piece",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    views: "2.1M",
    lastUpdate: "3 jam lalu",
    chapter: "Ch. 1100",
    genre: ["Adventure", "Comedy", "Shounen"],
    status: "Ongoing",
    description: "Follow Monkey D. Luffy on his quest to become the Pirate King.",
    bookmarkedAt: "5 hari lalu",
    type: "manga"
  },
  {
    id: 5,
    title: "Tower of God",
    image: "https://images.unsplash.com/photo-1700041571208-0677be9687dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5odWElMjBjaGluZXNlJTIwY29taWM|ZW58MXx8fHwxNzU3NDAzODA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    views: "1.8M",
    lastUpdate: "1 hari lalu",
    chapter: "Ch. 590",
    genre: ["Action", "Adventure", "Mystery"],
    status: "Ongoing",
    description: "A boy enters a mysterious tower to follow his friend.",
    bookmarkedAt: "1 hari lalu",
    type: "manhwa"
  }
]

const ITEMS_PER_PAGE = 12

interface BookmarkPageProps {
  onComicClick: (comicId: number) => void
}

export function BookmarkPage({ onComicClick }: BookmarkPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [filterType, setFilterType] = useState('all')
  const [selectedComics, setSelectedComics] = useState<number[]>([])

  const filteredComics = bookmarkedComics.filter(comic => {
    const matchesSearch = comic.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || comic.type === filterType
    
    return matchesSearch && matchesType
  })

  const sortedComics = [...filteredComics].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'rating':
        return b.rating - a.rating
      case 'recent':
      default:
        return 0 // Keep original order for recent bookmarks
    }
  })

  const totalPages = Math.ceil(sortedComics.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentComics = sortedComics.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleSelectComic = (id: number) => {
    setSelectedComics(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedComics(
      selectedComics.length === currentComics.length 
        ? [] 
        : currentComics.map(comic => comic.id)
    )
  }

  const handleRemoveSelected = () => {
    // In a real app, you would remove these from the backend
    setSelectedComics([])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500/10 to-rose-600/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3 mb-4">
            <BookmarkCheck className="w-8 h-8 text-pink-500" />
            <h1 className="text-3xl md:text-4xl font-bold">Bookmark Saya</h1>
          </div>
          <p className="text-muted-foreground">Koleksi komik yang telah Anda simpan untuk dibaca nanti</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {bookmarkedComics.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Belum Ada Bookmark</h3>
            <p className="text-muted-foreground mb-6">Mulai bookmark komik favorit Anda untuk mudah diakses nanti</p>
            <Button>Jelajahi Komik</Button>
          </div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari bookmark..."
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
                    <SelectItem value="recent">Terbaru Dibookmark</SelectItem>
                    <SelectItem value="title">Judul A-Z</SelectItem>
                    <SelectItem value="rating">Rating Tertinggi</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    <SelectItem value="manga">Manga</SelectItem>
                    <SelectItem value="manhwa">Manhwa</SelectItem>
                    <SelectItem value="manhua">Manhua</SelectItem>
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

            {/* Bulk Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedComics.length === currentComics.length && currentComics.length > 0}
                  onChange={handleSelectAll}
                  className="rounded"
                />
                <span className="text-sm text-muted-foreground">
                  {selectedComics.length} dipilih dari {sortedComics.length} bookmark
                </span>
              </div>
              
              {selectedComics.length > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleRemoveSelected}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hapus ({selectedComics.length})
                </Button>
              )}
            </div>

            {/* Tabs for different types */}
            <Tabs value={filterType} onValueChange={setFilterType} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">Semua ({bookmarkedComics.length})</TabsTrigger>
                <TabsTrigger value="manga">Manga ({bookmarkedComics.filter(c => c.type === 'manga').length})</TabsTrigger>
                <TabsTrigger value="manhwa">Manhwa ({bookmarkedComics.filter(c => c.type === 'manhwa').length})</TabsTrigger>
                <TabsTrigger value="manhua">Manhua ({bookmarkedComics.filter(c => c.type === 'manhua').length})</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Comics Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {currentComics.map((comic) => (
                  <Card 
                    key={comic.id} 
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group relative"
                    onClick={() => onComicClick(comic.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedComics.includes(comic.id)}
                      onChange={() => handleSelectComic(comic.id)}
                      className="absolute top-2 left-2 z-10 rounded"
                    />
                    
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
                      <Badge 
                        variant="secondary"
                        className="absolute bottom-2 right-2 text-xs capitalize"
                      >
                        {comic.type}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-3">
                      <h3 className="font-semibold mb-1 line-clamp-2 text-sm group-hover:text-pink-500 transition-colors">
                        {comic.title}
                      </h3>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{comic.rating}</span>
                        </div>
                        <span>{comic.chapter}</span>
                      </div>

                      <div className="flex items-center space-x-1 text-xs text-muted-foreground mb-1">
                        <Eye className="w-3 h-3" />
                        <span>{comic.views}</span>
                      </div>

                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Bookmark className="w-3 h-3 text-pink-500" />
                        <span>{comic.bookmarkedAt}</span>
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
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer relative"
                    onClick={() => onComicClick(comic.id)}
                  >
                    <div className="flex">
                      <div className="flex items-center px-4">
                        <input
                          type="checkbox"
                          checked={selectedComics.includes(comic.id)}
                          onChange={() => handleSelectComic(comic.id)}
                          className="rounded"
                        />
                      </div>
                      
                      <div className="relative w-24 flex-shrink-0">
                        <ImageWithFallback
                          src={comic.image}
                          alt={comic.title}
                          className="w-full h-32 object-cover"
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
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold group-hover:text-pink-500 transition-colors">
                            {comic.title}
                          </h3>
                          <Badge variant="outline" className="text-xs capitalize ml-2">
                            {comic.type}
                          </Badge>
                        </div>
                        
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
                            <div className="flex items-center space-x-1">
                              <Bookmark className="w-3 h-3 text-pink-500" />
                              <span>{comic.bookmarkedAt}</span>
                            </div>
                          </div>
                          <div className="text-pink-600 font-medium">{comic.chapter}</div>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-2">
                          <Clock className="w-3 h-3" />
                          <span>Update: {comic.lastUpdate}</span>
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
          </>
        )}
      </div>
    </div>
  )
}