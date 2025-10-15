import React, { useState } from 'react'
import { ArrowLeft, Star, Eye, Clock, Bookmark, BookmarkCheck, Share2, Download, Play, Heart, MessageCircle, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Separator } from '../ui/separator'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'

interface Comic {
  id: number
  title: string
  image: string
  rating: number
  views: string
  status: 'Ongoing' | 'Completed'
  description: string
  author: string
  artist: string
  year: number
  type: 'manga' | 'manhwa' | 'manhua'
  genre: string[]
  totalChapters: number
  lastUpdate: string
  alternativeTitles: string[]
}

interface Chapter {
  id: number
  number: string
  title: string
  releaseDate: string
  views: string
}

interface Comment {
  id: number
  user: string
  avatar: string
  comment: string
  rating: number
  date: string
  likes: number
}

interface ComicDetailPageProps {
  comicId: number
  onNavigate: (page: string, comicId?: number, chapterId?: number) => void
}

// Mock data - in real app this would come from API
const getComicById = (id: number): Comic => ({
  id,
  title: "Attack on Titan",
  image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
  rating: 4.9,
  views: "1.2M",
  status: "Completed",
  description: "Humanity fights for survival against giant humanoid Titans who have brought civilization to the brink of extinction. Eren Yeager joins the military with his friends Mikasa and Armin after his hometown of Shiganshina is destroyed and his mother is killed by a Titan. This dark fantasy series follows their journey as they uncover the truth behind the Titans and fight for humanity's survival.",
  author: "Hajime Isayama",
  artist: "Hajime Isayama",
  year: 2009,
  type: "manga",
  genre: ["Action", "Drama", "Fantasy", "Military", "Shounen", "Supernatural"],
  totalChapters: 139,
  lastUpdate: "2 hari lalu",
  alternativeTitles: ["Shingeki no Kyojin", "進撃の巨人", "L'Attaque des Titans"]
})

const mockChapters: Chapter[] = Array.from({ length: 20 }, (_, i) => ({
  id: 140 - i,
  number: `Ch. ${139 - i}`,
  title: i === 0 ? "The Final Chapter: Toward the Tree on That Hill" : `Chapter ${139 - i}`,
  releaseDate: `${i + 1} hari lalu`,
  views: `${Math.floor(Math.random() * 900 + 100)}K`
}))

const mockComments: Comment[] = [
  {
    id: 1,
    user: "OtakuReader123",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
    comment: "Masterpiece! Ending yang sangat memuaskan. Isayama berhasil menutup cerita dengan sempurna.",
    rating: 5,
    date: "3 hari lalu",
    likes: 24
  },
  {
    id: 2,
    user: "MangaLover",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face",
    comment: "Chapter terakhir benar-benar emotional. Tidak bisa berhenti menangis 😭",
    rating: 5,
    date: "5 hari lalu",
    likes: 18
  },
  {
    id: 3,
    user: "TitanHunter",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    comment: "10 tahun mengikuti series ini, dan endingnya tidak mengecewakan. Terima kasih Isayama-sensei!",
    rating: 5,
    date: "1 minggu lalu",
    likes: 31
  }
]

const relatedComics = [
  {
    id: 2,
    title: "Demon Slayer",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8
  },
  {
    id: 3,
    title: "One Piece",
    image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7
  },
  {
    id: 4,
    title: "Naruto",
    image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5
  }
]

export function ComicDetailPage({ comicId, onNavigate }: ComicDetailPageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)
  const [showAllChapters, setShowAllChapters] = useState(false)
  
  const comic = getComicById(comicId)
  const displayChapters = showAllChapters ? mockChapters : mockChapters.slice(0, 10)

  const handleBackClick = () => {
    onNavigate('home')
  }

  const handleReadFirst = () => {
    // Navigate to reader page with first chapter
    onNavigate('comic-reader', comicId, mockChapters[mockChapters.length - 1].id)
  }

  const handleReadLatest = () => {
    // Navigate to reader page with latest chapter
    onNavigate('comic-reader', comicId, mockChapters[0].id)
  }

  const handleChapterClick = (chapterId: number) => {
    // Navigate to reader page with specific chapter
    onNavigate('comic-reader', comicId, chapterId)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button 
          variant="ghost" 
          onClick={handleBackClick}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cover Image */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="relative">
              <ImageWithFallback
                src={comic.image}
                alt={comic.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
              />
              <Badge 
                className={`absolute top-4 right-4 ${
                  comic.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'
                }`}
              >
                {comic.status}
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={handleReadFirst}
              >
                <Play className="w-4 h-4 mr-2" />
                Baca Dari Awal
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                size="lg"
                onClick={handleReadLatest}
              >
                <ChevronRight className="w-4 h-4 mr-2" />
                Lanjut Baca
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 mr-2 text-pink-500" />
                  ) : (
                    <Bookmark className="w-4 h-4 mr-2" />
                  )}
                  {isBookmarked ? 'Tersimpan' : 'Bookmark'}
                </Button>
                
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4" />
                </Button>
                
                <Button variant="outline" size="lg">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Comic Info */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{comic.title}</h1>
              
              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{comic.rating}</span>
                  <span className="text-muted-foreground">(1,234 votes)</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  <span>{comic.views} views</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>892 likes</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>Update {comic.lastUpdate}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {comic.genre.map((g) => (
                  <Badge key={g} variant="secondary" className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900">
                    {g}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Sinopsis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {comic.description}
                </p>
              </div>

              {/* Comic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pengarang:</span>
                        <span>{comic.author}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Artist:</span>
                        <span>{comic.artist}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tahun Rilis:</span>
                        <span>{comic.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={comic.status === 'Ongoing' ? 'default' : 'secondary'}>
                          {comic.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tipe:</span>
                        <span className="capitalize">{comic.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Chapter:</span>
                        <span>{comic.totalChapters}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bahasa:</span>
                        <span>Indonesia</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Update:</span>
                        <span>{comic.lastUpdate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alternative Titles */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Judul Alternatif</h3>
                <div className="space-y-1">
                  {comic.alternativeTitles.map((title, index) => (
                    <p key={index} className="text-muted-foreground">{title}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 pb-8">
        <Tabs defaultValue="chapters" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chapters">Daftar Chapter</TabsTrigger>
            <TabsTrigger value="comments">Komentar ({mockComments.length})</TabsTrigger>
            <TabsTrigger value="related">Komik Serupa</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chapters" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Daftar Chapter
                  <Badge variant="outline">{comic.totalChapters} Chapter</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {displayChapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleChapterClick(chapter.id)}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{chapter.number}</h4>
                        {chapter.title && (
                          <p className="text-sm text-muted-foreground">{chapter.title}</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{chapter.views} views</p>
                        <p>{chapter.releaseDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {!showAllChapters && mockChapters.length > 10 && (
                  <div className="mt-4 text-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAllChapters(true)}
                    >
                      Lihat Semua Chapter ({mockChapters.length})
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Komentar & Rating</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.user[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{comment.user}</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < comment.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{comment.date}</span>
                        </div>
                        
                        <p className="text-muted-foreground mb-2">{comment.comment}</p>
                        
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Balas
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="related" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Komik Serupa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {relatedComics.map((relatedComic) => (
                    <div
                      key={relatedComic.id}
                      className="cursor-pointer group"
                      onClick={() => console.log('Navigate to comic:', relatedComic.id)}
                    >
                      <div className="relative mb-2">
                        <ImageWithFallback
                          src={relatedComic.image}
                          alt={relatedComic.title}
                          className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h4 className="font-medium line-clamp-2 group-hover:text-blue-500 transition-colors">
                        {relatedComic.title}
                      </h4>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-muted-foreground">{relatedComic.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}