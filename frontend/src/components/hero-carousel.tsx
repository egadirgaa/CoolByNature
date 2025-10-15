import React, { useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star, Eye } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Comic {
  id: number
  title: string
  image: string
  rating: number
  views: string
  chapter: string
  genre: string[]
  description: string
}

const mockComics: Comic[] = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    views: "1.2M",
    chapter: "Chapter 139",
    genre: ["Action", "Drama", "Fantasy"],
    description: "Humanity fights for survival against giant humanoid Titans that have brought civilization to the brink of extinction."
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    views: "950K",
    chapter: "Chapter 205",
    genre: ["Action", "Supernatural", "Historical"],
    description: "A young boy becomes a demon slayer to save his sister and avenge his family who were killed by demons."
  },
  {
    id: 3,
    title: "One Piece",
    image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    views: "2.1M",
    chapter: "Chapter 1100",
    genre: ["Adventure", "Comedy", "Shounen"],
    description: "Follow Monkey D. Luffy on his quest to become the Pirate King and find the legendary treasure One Piece."
  },
  {
    id: 4,
    title: "Solo Leveling",
    image: "https://images.unsplash.com/photo-1741851360205-2c2edc13c04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5od2ElMjBrb3JlYW4lMjBjb21pY3xlbnwxfHx8fDE3NTc0MDM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    views: "1.8M",
    chapter: "Chapter 179",
    genre: ["Action", "Adventure", "Fantasy"],
    description: "The weakest hunter becomes the strongest through a mysterious system that allows him to level up."
  },
  {
    id: 5,
    title: "Tower of God",
    image: "https://images.unsplash.com/photo-1700041571208-0677be9687dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5odWElMjBjaGluZXNlJTIwY29taWN8ZW58MXx8fHwxNzU3NDAzODA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    views: "890K",
    chapter: "Chapter 590",
    genre: ["Action", "Adventure", "Mystery"],
    description: "A boy enters a mysterious tower to follow his friend, facing challenges on each floor to reach the top."
  }
]

interface HeroCarouselProps {
  onComicClick: (comicId: number) => void
}

export function HeroCarousel({ onComicClick }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const carouselRef = useRef<HTMLElement>(null)

  // Create an infinite loop by duplicating the array
  const extendedComics = [...mockComics, ...mockComics, ...mockComics]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1
        // Reset to the beginning of the actual comics when we reach the end of the extended array
        if (nextIndex >= extendedComics.length - mockComics.length) {
          return mockComics.length
        }
        return nextIndex
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, extendedComics.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return extendedComics.length - mockComics.length - 1
      }
      return prevIndex - 1
    })
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1
      if (nextIndex >= extendedComics.length - mockComics.length) {
        return mockComics.length
      }
      return nextIndex
    })
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsDragging(true)
    setIsAutoPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const endX = e.changedTouches[0].clientX
    const diff = startX - endX
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
    
    setIsDragging(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX)
    setIsDragging(true)
    setIsAutoPlaying(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const endX = e.clientX
    const diff = startX - endX
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
    
    setIsDragging(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const currentComic = extendedComics[currentIndex]

  return (
    <section 
      ref={carouselRef}
      className="relative h-[50vh] md:h-[70vh] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={currentComic.image}
          alt={currentComic.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {currentComic.genre.map((g) => (
              <Badge key={g} variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                {g}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{currentComic.title}</h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-3">
            {currentComic.description}
          </p>

          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{currentComic.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-5 h-5 text-gray-300" />
              <span>{currentComic.views}</span>
            </div>
            <span className="text-gray-300">{currentComic.chapter}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => onComicClick(currentComic.id)}
            >
              Baca Sekarang
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Tambah ke Bookmark
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-white/20"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-white/20"
        onClick={goToNext}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {mockComics.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              (currentIndex % mockComics.length) === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentIndex(index + mockComics.length)
              setTimeout(() => setIsAutoPlaying(true), 5000)
            }}
          />
        ))}
      </div>
    </section>
  )
}