import React from 'react'
import { HeroCarousel } from '../hero-carousel'
import { GenreSection } from '../genre-section'
import { PopularComics } from '../popular-comics'
import { LatestComics } from '../latest-comics'
import { RecommendationSection } from '../recommendation-section'

interface HomePageProps {
  onComicClick: (comicId: number) => void
  onChapterClick?: (comicId: number, chapterId: number) => void
}

export function HomePage({ onComicClick, onChapterClick }: HomePageProps) {
  return (
    <>
      <HeroCarousel onComicClick={onComicClick} />
      <PopularComics onComicClick={onComicClick} />
      <LatestComics onComicClick={onComicClick} onChapterClick={onChapterClick} />
      <RecommendationSection onComicClick={onComicClick} />
      <GenreSection />
    </>
  )
}