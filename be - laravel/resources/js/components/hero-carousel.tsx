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
    image: "https://images7.alphacoders.com/134/1343296.jpeg",
    rating: 4.9,
    views: "1.2M",
    chapter: "Chapter 139",
    genre: ["Action", "Drama", "Fantasy"],
    description: "Humanity fights for survival against giant humanoid Titans."
  },
  {
    id: 2,
    title: "Demon Slayer",
    image: "https://images.alphacoders.com/136/1363137.png",
    rating: 4.8,
    views: "950K",
    chapter: "Chapter 205",
    genre: ["Action", "Supernatural", "Historical"],
    description: "A young boy becomes a demon slayer to save his sister and avenge his family."
  },
  {
    id: 3,
    title: "One Piece",
    image: "https://images2.alphacoders.com/133/1330502.jpeg",
    rating: 4.7,
    views: "2.1M",
    chapter: "Chapter 1100",
    genre: ["Adventure", "Comedy", "Shounen"],
    description: "Follow Monkey D. Luffy on his quest to become the Pirate King and find the legendary treasure."
  },
  {
    id: 4,
    title: "Solo Leveling",
    image: "https://images5.alphacoders.com/137/1372162.jpeg",
    rating: 4.9,
    views: "1.8M",
    chapter: "Chapter 179",
    genre: ["Action", "Adventure", "Fantasy"],
    description: "The weakest hunter becomes the strongest through a mysterious system that allows him to level up."
  },
  {
    id: 5,
    title: "Tower of God",
    image: "https://images2.alphacoders.com/136/1368878.png",
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
    <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-4">
      <section
        ref={carouselRef}
        className="relative h-[60vh] md:h-[70vh] lg:h-[70vh] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-lg border border-white/20"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* Background Images with Smooth Transition */}
        <div className="absolute inset-0">
          {extendedComics.map((comic, index) => (
            <div
              key={`${comic.id}-${index}`}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105'
              }`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                transition: 'transform 1000ms cubic-bezier(0.4, 0, 0.2, 1), opacity 1000ms ease-in-out'
              }}
            >
              <ImageWithFallback
                src={comic.image}
                alt={comic.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
          ))}
        </div>
        
        {/* Content with Smooth Animation */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div
            className="max-w-2xl text-white transition-all duration-700 ease-out"
            key={currentIndex}
          >
            {/* Headline: Uses a responsive font size that scales up from mobile */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {currentComic.title}
            </h1>
        
            {/* Description: Uses line-clamp for a clean look on mobile */}
            <p className="text-sm sm:text-base md:text-xl text-gray-200 mb-4 sm:mb-6 line-clamp-3 animate-slide-up" style={{ animationDelay: '300ms' }}>
              {currentComic.description}
            </p>
        
            <div className="flex items-center space-x-4 sm:space-x-6 mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                <span className="text-sm sm:font-medium">{currentComic.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                <span className="text-sm sm:font-medium">{currentComic.views}</span>
              </div>
              <span className="text-sm sm:text-gray-300">{currentComic.chapter}</span>
            </div>
        
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4 animate-slide-up">
              {currentComic.genre.map((g, index) => (
                <Badge
                  key={g}
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs sm:text-sm animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {g}
                </Badge>
              ))}
            </div>
            
            {/* Buttons: Stack vertically on mobile using flex-col */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 animate-slide-up" style={{ animationDelay: '500ms' }}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 transform transition-all duration-300 hover:scale-105"
                onClick={() => onComicClick(currentComic.id)}
              >
                Baca Sekarang
              </Button>
            </div>
          </div>
        </div>
            
        {/* Dot Indicators */}
        <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {mockComics.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
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
    </div>
  )
}