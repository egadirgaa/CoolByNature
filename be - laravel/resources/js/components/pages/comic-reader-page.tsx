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
import { toast } from 'sonner'

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
  const [readingMode, setReadingMode] = useState<'single' | 'double' | 'vertical'>('vertical')
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
      }, 100)
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
        case 'c':
          if (isFullscreen && hideControlsInFullscreen) {
            e.preventDefault()
            showControlsTemporary()
          }
          break
        case ' ':
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
      onNavigate('comic-reader', comicId, currentChapter.nextChapter)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    } else if (currentChapter.prevChapter) {
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
      setTimeout(() => {
        setHideControlsInFullscreen(true)
        setShowFullscreenHint(true)
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
      setShowFullscreenHint(false)
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
      username: "You",
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
      className={`flex flex-col items-center max-h-screen overflow-y-auto ${readingMode === 'vertical' ? 'space-y-0 p-0 md:space-y-2 md:p-4' : 'space-y-2 p-4'}`}
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
            className={`max-w-full ${readingMode === 'vertical' ? 'md:shadow-lg md:rounded-lg' : 'shadow-lg rounded-lg'}`}
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
      <div className={`absolute top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${showControls && (!isFullscreen || !hideControlsInFullscreen) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Mobile Layout */}
        <div className="block md:hidden p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBackClick}
                className="text-white hover:bg-white/20 px-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleHomeClick}
                className="text-white hover:bg-white/20 px-2"
              >
                <Home className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-1 flex-1 justify-center px-2">
              <div className="text-center">
                <div className="text-sm font-medium truncate max-w-32">{comic.title}</div>
                <div className="text-xs text-gray-300">{currentChapter.number}</div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChapterList(!showChapterList)}
                className="text-white hover:bg-white/20 px-2"
              >
                <List className="w-4 h-4" />
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 px-2">
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
                className="text-white hover:bg-white/20 px-2"
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block p-4">
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
      </div>

      {/* Fullscreen Controls Trigger Area */}
      {isFullscreen && hideControlsInFullscreen && (
        <>
          <div 
            className="absolute top-0 left-0 right-0 h-16 z-30 cursor-pointer"
            onClick={showControlsTemporary}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-16 z-30 cursor-pointer"
            onClick={showControlsTemporary}
          />
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

      {/* Main Content Area */}
      <div className="flex-1">
        {readingMode === 'single' && renderSinglePage()}
        {readingMode === 'double' && renderDoublePage()}
        {readingMode === 'vertical' && renderVerticalPages()}
      </div>

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${showControls && (!isFullscreen || !hideControlsInFullscreen) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Mobile Bottom Controls */}
        <div className="block md:hidden p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 0 && !currentChapter.prevChapter}
                className="text-white hover:bg-white/20 px-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`text-white hover:bg-white/20 px-2 ${currentChapter.isLiked ? 'text-red-400' : ''}`}
              >
                <Heart className={`w-4 h-4 ${currentChapter.isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <div className="flex-1 px-2">
              {readingMode !== 'vertical' && (
                <div className="text-center">
                  <div className="text-sm text-gray-300">
                    {currentPage + 1} / {totalPages}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="text-white hover:bg-white/20 px-2"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1 && !currentChapter.nextChapter}
                className="text-white hover:bg-white/20 px-2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Controls */}
        <div className="hidden md:block p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 0 && !currentChapter.prevChapter}
                className="text-white hover:bg-white/20"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`text-white hover:bg-white/20 ${currentChapter.isLiked ? 'text-red-400' : ''}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${currentChapter.isLiked ? 'fill-current' : ''}`} />
                {currentChapter.likes}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="text-white hover:bg-white/20"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Comments ({currentChapter.comments.length})
              </Button>
            </div>

            {readingMode !== 'vertical' && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <input
                  type="range"
                  min="0"
                  max={totalPages - 1}
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value))}
                  className="w-32"
                />
              </div>
            )}

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1 && !currentChapter.nextChapter}
                className="text-white hover:bg-white/20"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter List Sidebar */}
      {showChapterList && (
        <div className="fixed inset-y-0 right-0 w-80 bg-black/95 backdrop-blur-lg border-l border-gray-700 z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Chapter List</h3>
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
                  <button
                    key={chapter.id}
                    onClick={() => {
                      onNavigate('comic-reader', comicId, chapter.id)
                      setShowChapterList(false)
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      chapter.id === chapterId
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">{chapter.number}</div>
                    <div className="text-sm opacity-80 truncate">{chapter.title}</div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      {/* Comments Sidebar */}
      {showComments && (
        <div className="fixed inset-y-0 right-0 w-80 bg-black/95 backdrop-blur-lg border-l border-gray-700 z-50 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Comments ({currentChapter.comments.length})</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Button
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
                size="sm"
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {currentChapter.comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.username[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{comment.username}</p>
                          {comment.username === currentUser && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreVertical className="w-3 h-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="text-red-400"
                                >
                                  <Trash2 className="w-3 h-3 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{comment.text}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className={`flex items-center space-x-1 text-xs ${
                              comment.isLiked ? 'text-red-400' : 'text-gray-400'
                            } hover:text-red-400`}
                          >
                            <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                            <span>{comment.likes}</span>
                          </button>
                          <button
                            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                            className="text-xs text-gray-400 hover:text-white"
                          >
                            Reply
                          </button>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {replyTo === comment.id && (
                    <div className="ml-8 space-y-2">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white text-sm"
                      />
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleReplySubmit(comment.id)}
                          disabled={!replyText.trim()}
                          size="sm"
                          className="text-xs"
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
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {comment.replies && comment.replies.map((reply) => (
                    <div key={reply.id} className="ml-8 bg-gray-700 rounded-lg p-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={reply.avatar} />
                          <AvatarFallback className="text-xs">{reply.username[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium">{reply.username}</p>
                            {reply.username === currentUser && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                    <MoreVertical className="w-2 h-2" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteComment(reply.id, true, comment.id)}
                                    className="text-red-400"
                                  >
                                    <Trash2 className="w-3 h-3 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                          <p className="text-xs text-gray-300 mt-1">{reply.text}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <button
                              onClick={() => handleCommentLike(reply.id, true, comment.id)}
                              className={`flex items-center space-x-1 text-xs ${
                                reply.isLiked ? 'text-red-400' : 'text-gray-400'
                              } hover:text-red-400`}
                            >
                              <Heart className={`w-2 h-2 ${reply.isLiked ? 'fill-current' : ''}`} />
                              <span>{reply.likes}</span>
                            </button>
                            <span className="text-xs text-gray-500">{reply.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}