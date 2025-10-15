import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, Settings, BookOpen, List, Home, RotateCw, ZoomIn, ZoomOut, Maximize, Eye, Heart, MessageCircle, Share2, Send, X, Trash2, MoreVertical, Play, Pause, FastForward } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Slider } from '../ui/slider'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { toast } from 'sonner@2.0.3'

interface ComicReaderPageProps {
  comicId: number
  chapterId: number
  onNavigate: (page: string, comicId?: number) => void
}

interface Chapter {
  id: number
  number: string
  title: string
  pages: string[]
  nextChapter?: number
  prevChapter?: number
  likes: number
  isLiked: boolean
  comments: Comment[]
}

interface Comment {
  id: number
  username: string
  avatar: string
  text: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
}

interface Comic {
  id: number
  title: string
  chapters: Chapter[]
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: 1,
    username: "manga_lover_99",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
    text: "Chapter ini benar-benar epic! Ending yang sempurna untuk series ini 😭",
    timestamp: "2 jam lalu",
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: 11,
        username: "otaku_reader",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face",
        text: "Setuju banget! Gak nyangka bakal berakhir seperti ini",
        timestamp: "1 jam lalu",
        likes: 5,
        isLiked: true
      }
    ]
  },
  {
    id: 2,
    username: "anime_fan_2024",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    text: "Setelah bertahun-tahun mengikuti series ini, rasanya sulit move on 💔",
    timestamp: "4 jam lalu",
    likes: 23,
    isLiked: true
  },
  {
    id: 3,
    username: "comic_enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face",
    text: "Art style di chapter terakhir ini luar biasa! Detail setiap panelnya amazing",
    timestamp: "6 jam lalu",
    likes: 8,
    isLiked: false
  }
]

// Mock data - in real app this would come from API
const getComicData = (comicId: number): Comic => ({
  id: comicId,
  title: "Attack on Titan",
  chapters: [
    {
      id: 139,
      number: "Ch. 139",
      title: "The Final Chapter: Toward the Tree on That Hill",
      pages: [
        "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      nextChapter: undefined,
      prevChapter: 138,
      likes: 1247,
      isLiked: false,
      comments: mockComments
    },
    {
      id: 138,
      number: "Ch. 138",
      title: "A Long Dream",
      pages: [
        "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      nextChapter: 139,
      prevChapter: 137,
      likes: 892,
      isLiked: true,
      comments: []
    }
  ]
})

export function ComicReaderPage({ comicId, chapterId, onNavigate }: ComicReaderPageProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [readingMode, setReadingMode] = useState<'single' | 'double' | 'vertical'>('vertical') // Default ke vertical
  const [zoom, setZoom] = useState([100])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [hideControlsInFullscreen, setHideControlsInFullscreen] = useState(false)
  const [showFullscreenHint, setShowFullscreenHint] = useState(false)
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(0)
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(false)
  const [showChapterList, setShowChapterList] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  
  // Current user identifier - in real app this would come from auth context
  const currentUser = "You"

  const [comic, setComic] = useState(() => getComicData(comicId))
  const currentChapter = comic.chapters.find(ch => ch.id === chapterId)
  
  if (!currentChapter) {
    return <div>Chapter not found</div>
  }

  const totalPages = currentChapter.pages.length

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const resetTimeout = () => {
      clearTimeout(timeout)
      setShowControls(true)
      timeout = setTimeout(() => setShowControls(false), 3000)
    }

    const handleMouseMove = () => {
      if (!hideControlsInFullscreen) {
        resetTimeout()
      }
    }
    const handleKeyPress = () => {
      if (!hideControlsInFullscreen) {
        resetTimeout()
      }
    }

    if (isFullscreen && !hideControlsInFullscreen) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('keydown', handleKeyPress)
      resetTimeout()
    } else if (isFullscreen && hideControlsInFullscreen) {
      setShowControls(false)
    } else {
      setShowControls(true)
    }

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [isFullscreen, hideControlsInFullscreen])

  // Auto scroll functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoScrollActive && autoScrollSpeed > 0 && readingMode === 'vertical' && pageRef.current) {
      interval = setInterval(() => {
        pageRef.current?.scrollBy({
          top: autoScrollSpeed,
          behavior: 'smooth'
        })
      }, 100) // Scroll every 100ms for smooth movement
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isAutoScrollActive, autoScrollSpeed, readingMode])

  // Auto scroll pause on user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (isAutoScrollActive) {
        setIsAutoScrollActive(false)
        toast.info('Auto scroll dihentikan karena interaksi user')
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 0) {
        handleUserInteraction()
      }
    }

    const handleTouch = () => {
      handleUserInteraction()
    }

    if (isAutoScrollActive && readingMode === 'vertical') {
      pageRef.current?.addEventListener('wheel', handleWheel, { passive: true })
      pageRef.current?.addEventListener('touchstart', handleTouch, { passive: true })
      pageRef.current?.addEventListener('touchmove', handleTouch, { passive: true })
    }

    return () => {
      pageRef.current?.removeEventListener('wheel', handleWheel)
      pageRef.current?.removeEventListener('touchstart', handleTouch)
      pageRef.current?.removeEventListener('touchmove', handleTouch)
    }
  }, [isAutoScrollActive, readingMode])

  // Fullscreen change detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement
      if (!isCurrentlyFullscreen && isFullscreen) {
        // Exited fullscreen via browser controls
        setIsFullscreen(false)
        setHideControlsInFullscreen(false)
        setShowFullscreenHint(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [isFullscreen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
          e.preventDefault()
          prevPage()
          break
        case 'ArrowRight':
        case 'd':
          e.preventDefault()
          nextPage()
          break
        case 'ArrowUp':
        case 'w':
          e.preventDefault()
          if (readingMode === 'vertical') {
            pageRef.current?.scrollBy(0, -100)
            // Pause auto scroll on manual navigation
            if (isAutoScrollActive) {
              setIsAutoScrollActive(false)
            }
          }
          break
        case 'ArrowDown':
        case 's':
          e.preventDefault()
          if (readingMode === 'vertical') {
            pageRef.current?.scrollBy(0, 100)
            // Pause auto scroll on manual navigation
            if (isAutoScrollActive) {
              setIsAutoScrollActive(false)
            }
          }
          break
        case 'f':
          e.preventDefault()
          toggleFullscreen()
          break
        case 'Escape':
          if (isFullscreen) {
            e.preventDefault()
            toggleFullscreen()
          }
          break
        case 'c': // Show controls temporarily in fullscreen
          if (isFullscreen && hideControlsInFullscreen) {
            e.preventDefault()
            showControlsTemporary()
          }
          break
        case ' ': // Spacebar
          e.preventDefault()
          if (readingMode === 'vertical') {
            toggleAutoScroll()
          }
          break
        case '+':
        case '=':
          e.preventDefault()
          if (readingMode === 'vertical' && autoScrollSpeed < 50) {
            setAutoScrollSpeed(Math.min(50, autoScrollSpeed + 5))
            toast.info(`Kecepatan auto scroll: ${Math.min(50, autoScrollSpeed + 5)}px/detik`)
          }
          break
        case '-':
          e.preventDefault()
          if (readingMode === 'vertical' && autoScrollSpeed > 0) {
            setAutoScrollSpeed(Math.max(0, autoScrollSpeed - 5))
            toast.info(`Kecepatan auto scroll: ${Math.max(0, autoScrollSpeed - 5)}px/detik`)
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, readingMode, isFullscreen])

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    } else if (currentChapter.nextChapter) {
      // Navigate to next chapter
      onNavigate('comic-reader', comicId, currentChapter.nextChapter)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    } else if (currentChapter.prevChapter) {
      // Navigate to previous chapter
      onNavigate('comic-reader', comicId, currentChapter.prevChapter)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page)
    }
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.()
      setIsFullscreen(true)
      toast.success('Mode fullscreen aktif - kontrol akan tersembunyi otomatis')
      // Auto-hide controls after entering fullscreen
      setTimeout(() => {
        setHideControlsInFullscreen(true)
        setShowFullscreenHint(true)
        // Hide hint after 4 seconds
        setTimeout(() => {
          setShowFullscreenHint(false)
        }, 4000)
      }, 2000)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
      setHideControlsInFullscreen(false)
      setShowFullscreenHint(false)
      toast.info('Keluar dari mode fullscreen')
    }
  }

  const showControlsTemporary = () => {
    if (isFullscreen && hideControlsInFullscreen) {
      setHideControlsInFullscreen(false)
      setShowControls(true)
      setShowFullscreenHint(false) // Hide hint when showing controls
      // Auto-hide again after 3 seconds
      setTimeout(() => {
        setHideControlsInFullscreen(true)
      }, 3000)
    }
  }

  const handleBackClick = () => {
    onNavigate('comic-detail', comicId)
  }

  const handleHomeClick = () => {
    onNavigate('home')
  }

  const handleLike = () => {
    setComic(prevComic => ({
      ...prevComic,
      chapters: prevComic.chapters.map(ch => 
        ch.id === chapterId 
          ? { 
              ...ch, 
              isLiked: !ch.isLiked,
              likes: ch.isLiked ? ch.likes - 1 : ch.likes + 1
            }
          : ch
      )
    }))
    
    toast.success(currentChapter.isLiked ? 'Like dibatalkan' : 'Chapter dilike!')
  }

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now(),
      username: "You", // In real app, get from auth
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      text: newComment,
      timestamp: "Baru saja",
      likes: 0,
      isLiked: false
    }

    setComic(prevComic => ({
      ...prevComic,
      chapters: prevComic.chapters.map(ch => 
        ch.id === chapterId 
          ? { ...ch, comments: [comment, ...ch.comments] }
          : ch
      )
    }))

    setNewComment('')
    toast.success('Komentar berhasil ditambahkan!')
  }

  const handleReplySubmit = (commentId: number) => {
    if (!replyText.trim()) return

    const reply: Comment = {
      id: Date.now(),
      username: "You",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      text: replyText,
      timestamp: "Baru saja",
      likes: 0,
      isLiked: false
    }

    setComic(prevComic => ({
      ...prevComic,
      chapters: prevComic.chapters.map(ch => 
        ch.id === chapterId 
          ? { 
              ...ch, 
              comments: ch.comments.map(comment =>
                comment.id === commentId
                  ? { ...comment, replies: [...(comment.replies || []), reply] }
                  : comment
              )
            }
          : ch
      )
    }))

    setReplyText('')
    setReplyTo(null)
    toast.success('Reply berhasil ditambahkan!')
  }

  const handleCommentLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    setComic(prevComic => ({
      ...prevComic,
      chapters: prevComic.chapters.map(ch => 
        ch.id === chapterId 
          ? { 
              ...ch, 
              comments: ch.comments.map(comment => {
                if (isReply && comment.id === parentId) {
                  return {
                    ...comment,
                    replies: comment.replies?.map(reply =>
                      reply.id === commentId
                        ? { 
                            ...reply, 
                            isLiked: !reply.isLiked,
                            likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                          }
                        : reply
                    )
                  }
                } else if (!isReply && comment.id === commentId) {
                  return { 
                    ...comment, 
                    isLiked: !comment.isLiked,
                    likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
                  }
                }
                return comment
              })
            }
          : ch
      )
    }))
  }

  const handleDeleteComment = (commentId: number, isReply: boolean = false, parentId?: number) => {
    setComic(prevComic => ({
      ...prevComic,
      chapters: prevComic.chapters.map(ch => 
        ch.id === chapterId 
          ? { 
              ...ch, 
              comments: isReply && parentId 
                ? ch.comments.map(comment =>
                    comment.id === parentId
                      ? { ...comment, replies: comment.replies?.filter(reply => reply.id !== commentId) }
                      : comment
                  )
                : ch.comments.filter(comment => comment.id !== commentId)
            }
          : ch
      )
    }))
    
    toast.success(isReply ? 'Reply berhasil dihapus' : 'Komentar berhasil dihapus')
  }

  const toggleAutoScroll = () => {
    if (readingMode !== 'vertical') {
      toast.warning('Auto scroll hanya tersedia dalam mode vertikal')
      return
    }
    
    if (autoScrollSpeed === 0) {
      toast.warning('Atur kecepatan auto scroll terlebih dahulu')
      return
    }
    
    setIsAutoScrollActive(!isAutoScrollActive)
    toast.success(isAutoScrollActive ? 'Auto scroll dihentikan' : 'Auto scroll dimulai')
  }

  const getCurrentPages = () => {
    if (readingMode === 'double' && currentPage < totalPages - 1) {
      return [currentChapter.pages[currentPage], currentChapter.pages[currentPage + 1]]
    }
    return [currentChapter.pages[currentPage]]
  }

  const renderSinglePage = () => (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div 
        className="relative max-w-full max-h-screen"
        style={{ transform: `scale(${zoom[0] / 100})` }}
      >
        <ImageWithFallback
          src={currentChapter.pages[currentPage]}
          alt={`Page ${currentPage + 1}`}
          className="max-w-full max-h-screen object-contain shadow-lg rounded-lg"
        />
      </div>
    </div>
  )

  const renderDoublePage = () => {
    const pages = getCurrentPages()
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div 
          className="flex gap-2"
          style={{ transform: `scale(${zoom[0] / 100})` }}
        >
          {pages.map((page, index) => (
            <ImageWithFallback
              key={index}
              src={page}
              alt={`Page ${currentPage + index + 1}`}
              className="max-h-screen object-contain shadow-lg rounded-lg"
            />
          ))}
        </div>
      </div>
    )
  }

  const renderVerticalPages = () => (
    <div 
      ref={pageRef}
      className="flex flex-col items-center space-y-2 p-4 max-h-screen overflow-y-auto"
    >
      {currentChapter.pages.map((page, index) => (
        <div 
          key={index}
          className="relative"
          style={{ transform: `scale(${zoom[0] / 100})` }}
        >
          <ImageWithFallback
            src={page}
            alt={`Page ${index + 1}`}
            className="max-w-full shadow-lg rounded-lg"
          />
        </div>
      ))}
    </div>
  )

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-black text-white relative ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Top Controls */}
      <div className={`absolute top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300 ${showControls && (!isFullscreen || !hideControlsInFullscreen) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackClick}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleHomeClick}
              className="text-white hover:bg-white/20"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">{comic.title}</span>
              <Badge variant="secondary">{currentChapter.number}</Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChapterList(!showChapterList)}
              className="text-white hover:bg-white/20"
            >
              <List className="w-4 h-4" />
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Settings className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-black/90 text-white border-gray-700">
                <div className="space-y-4">
                  <div>
                    <Label>Mode Baca</Label>
                    <Select value={readingMode} onValueChange={(value: 'single' | 'double' | 'vertical') => setReadingMode(value)}>
                      <SelectTrigger className="bg-black/50 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-gray-600">
                        <SelectItem value="single">Halaman Tunggal</SelectItem>
                        <SelectItem value="double">Halaman Ganda</SelectItem>
                        <SelectItem value="vertical">Vertikal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Zoom: {zoom[0]}%</Label>
                    <Slider
                      value={zoom}
                      onValueChange={setZoom}
                      min={50}
                      max={200}
                      step={10}
                      className="mt-2"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Auto Scroll</Label>
                      <Badge variant={isAutoScrollActive ? "default" : "secondary"} className="text-xs">
                        {isAutoScrollActive ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                    
                    <div>
                      <Label className="text-sm">Kecepatan: {autoScrollSpeed}px/detik</Label>
                      <Slider
                        value={[autoScrollSpeed]}
                        onValueChange={(value) => {
                          setAutoScrollSpeed(value[0])
                          // Stop auto scroll when changing speed
                          if (isAutoScrollActive) {
                            setIsAutoScrollActive(false)
                          }
                        }}
                        min={0}
                        max={50}
                        step={5}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Lambat</span>
                        <span>Cepat</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={toggleAutoScroll}
                      disabled={readingMode !== 'vertical' || autoScrollSpeed === 0}
                      size="sm"
                      variant={isAutoScrollActive ? "destructive" : "default"}
                      className="w-full"
                    >
                      {isAutoScrollActive ? 'Hentikan Auto Scroll' : 'Mulai Auto Scroll'}
                    </Button>
                    
                    {readingMode !== 'vertical' && (
                      <p className="text-xs text-gray-400 text-center">
                        Auto scroll hanya tersedia dalam mode vertikal
                      </p>
                    )}
                    
                    {readingMode === 'vertical' && (
                      <div className="text-xs text-gray-400 space-y-1">
                        <p className="font-medium">Keyboard Shortcuts:</p>
                        <p>• Spacebar: Toggle auto scroll</p>
                        <p>• +: Percepat auto scroll</p>
                        <p>• -: Perlambat auto scroll</p>
                        <p>• Scroll manual akan menghentikan auto scroll</p>
                      </div>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chapter List Sidebar */}
      {showChapterList && (
        <div className="absolute left-0 top-0 bottom-0 w-80 bg-black/90 backdrop-blur-sm z-30 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Daftar Chapter</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChapterList(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {comic.chapters.map((chapter) => (
                <Card
                  key={chapter.id}
                  className={`cursor-pointer transition-colors ${
                    chapter.id === chapterId 
                      ? 'bg-blue-600/50 border-blue-500' 
                      : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-600'
                  }`}
                  onClick={() => {
                    onNavigate('comic-reader', comicId, chapter.id)
                    setShowChapterList(false)
                  }}
                >
                  <CardContent className="p-3">
                    <div className="font-medium text-white">{chapter.number}</div>
                    {chapter.title && (
                      <div className="text-sm text-gray-300">{chapter.title}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Comments Sidebar */}
      {showComments && (
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-black/90 backdrop-blur-sm z-30 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Komentar ({currentChapter.comments.length})</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Add Comment */}
            <div className="space-y-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis komentar..."
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                rows={3}
              />
              <Button 
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
                size="sm"
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                Kirim Komentar
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {currentChapter.comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="flex space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{comment.username}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">{comment.timestamp}</span>
                            {comment.username === currentUser && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-5 w-5 p-0 text-gray-400 hover:text-white"
                                  >
                                    <MoreVertical className="w-3 h-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-800 border-gray-600">
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="text-red-400 focus:text-red-300 focus:bg-red-900/20 cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3 mr-2" />
                                    Hapus Komentar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-200">{comment.text}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCommentLike(comment.id)}
                          className={`text-xs h-6 ${comment.isLiked ? 'text-red-400' : 'text-gray-400'} hover:text-red-400`}
                        >
                          <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
                          {comment.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                          className="text-xs h-6 text-gray-400 hover:text-blue-400"
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                      
                      {/* Reply Input */}
                      {replyTo === comment.id && (
                        <div className="mt-2 space-y-2">
                          <Textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Tulis reply..."
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                            rows={2}
                          />
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleReplySubmit(comment.id)}
                              disabled={!replyText.trim()}
                              size="sm"
                              className="flex-1"
                            >
                              Reply
                            </Button>
                            <Button 
                              onClick={() => {
                                setReplyTo(null)
                                setReplyText('')
                              }}
                              variant="outline"
                              size="sm"
                            >
                              Batal
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-4 mt-3 space-y-2">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={reply.avatar} />
                                <AvatarFallback className="text-xs">{reply.username[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-gray-700/50 rounded-lg p-2">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-xs">{reply.username}</span>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xs text-gray-400">{reply.timestamp}</span>
                                      {reply.username === currentUser && (
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button 
                                              variant="ghost" 
                                              size="sm" 
                                              className="h-4 w-4 p-0 text-gray-400 hover:text-white"
                                            >
                                              <MoreVertical className="w-2 h-2" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent className="bg-gray-800 border-gray-600">
                                            <DropdownMenuItem 
                                              onClick={() => handleDeleteComment(reply.id, true, comment.id)}
                                              className="text-red-400 focus:text-red-300 focus:bg-red-900/20 cursor-pointer"
                                            >
                                              <Trash2 className="w-3 h-3 mr-2" />
                                              Hapus Reply
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-200">{reply.text}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCommentLike(reply.id, true, comment.id)}
                                  className={`text-xs h-5 mt-1 ${reply.isLiked ? 'text-red-400' : 'text-gray-400'} hover:text-red-400`}
                                >
                                  <Heart className={`w-2 h-2 mr-1 ${reply.isLiked ? 'fill-current' : ''}`} />
                                  {reply.likes}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {currentChapter.comments.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Belum ada komentar</p>
                  <p className="text-sm">Jadilah yang pertama berkomentar!</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full h-screen">
        {readingMode === 'single' && renderSinglePage()}
        {readingMode === 'double' && renderDoublePage()}
        {readingMode === 'vertical' && renderVerticalPages()}
      </div>

      {/* Click Areas for Navigation (only for single/double page modes) */}
      {readingMode !== 'vertical' && (
        <>
          {/* Left click area */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-10"
            onClick={prevPage}
          />
          
          {/* Right click area */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer z-10"
            onClick={nextPage}
          />
        </>
      )}

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300 ${showControls && (!isFullscreen || !hideControlsInFullscreen) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 0 && !currentChapter.prevChapter}
              className="text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {currentPage === 0 && currentChapter.prevChapter ? 'Chapter Sebelumnya' : 'Sebelumnya'}
            </Button>

            <div className="flex items-center space-x-2">
              <span className="text-sm">
                {readingMode === 'vertical' ? 'Semua Halaman' : `${currentPage + 1} / ${totalPages}`}
              </span>
              
              {readingMode !== 'vertical' && (
                <Select 
                  value={currentPage.toString()} 
                  onValueChange={(value) => goToPage(parseInt(value))}
                >
                  <SelectTrigger className="w-20 h-8 bg-black/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-gray-600">
                    {currentChapter.pages.map((_, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages - 1 && !currentChapter.nextChapter}
              className="text-white hover:bg-white/20"
            >
              {currentPage === totalPages - 1 && currentChapter.nextChapter ? 'Chapter Selanjutnya' : 'Selanjutnya'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Auto Scroll Indicator & Control */}
            {readingMode === 'vertical' && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleAutoScroll}
                disabled={autoScrollSpeed === 0}
                className={`text-white hover:bg-white/20 ${isAutoScrollActive ? 'text-green-400' : ''}`}
              >
                {isAutoScrollActive ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" />
                    {autoScrollSpeed}
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Auto
                  </>
                )}
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className={`text-white hover:bg-white/20 ${currentChapter.isLiked ? 'text-red-400' : ''}`}
            >
              <Heart className={`w-4 h-4 mr-1 ${currentChapter.isLiked ? 'fill-current' : ''}`} />
              {currentChapter.likes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowComments(!showComments)}
              className="text-white hover:bg-white/20"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              {currentChapter.comments.length}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {readingMode !== 'vertical' && (
          <div className="mt-3">
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div 
                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Controls Trigger Area */}
      {isFullscreen && hideControlsInFullscreen && (
        <>
          {/* Top area to show controls */}
          <div 
            className="absolute top-0 left-0 right-0 h-16 z-30 cursor-pointer"
            onClick={showControlsTemporary}
          />
          {/* Bottom area to show controls */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-16 z-30 cursor-pointer"
            onClick={showControlsTemporary}
          />
          {/* Fullscreen hint */}
          {showFullscreenHint && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm z-50 animate-fade-in shadow-lg">
              <div className="text-center">
                <div>Klik area atas/bawah atau tekan 'C' untuk kontrol</div>
                <div className="text-xs opacity-75 mt-1">ESC untuk keluar fullscreen</div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Auto Scroll Indicator */}
      {isAutoScrollActive && readingMode === 'vertical' && (
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-green-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <FastForward className="w-4 h-4 animate-pulse" />
          <div className="text-sm">
            <div className="font-medium">Auto Scroll</div>
            <div className="text-xs opacity-80">{autoScrollSpeed}px/detik</div>
          </div>
        </div>
      )}

      {/* Loading overlay would go here */}
    </div>
  )
}