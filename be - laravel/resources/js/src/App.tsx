import React, { useState } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { HomePage } from './components/pages/home-page'
import { MangaPage } from './components/pages/manga-page'
import { ManhwaPage } from './components/pages/manhwa-page'
import { ManhuaPage } from './components/pages/manhua-page'
import { BookmarkPage } from './components/pages/bookmark-page'
import { ComicDetailPage } from './components/pages/comic-detail-page'
import { ComicReaderPage } from './components/pages/comic-reader-page'
import { AdminDashboardPage } from './components/pages/admin-dashboard-page'
import { UserDashboardPage } from './components/pages/user-dashboard-page'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedComicId, setSelectedComicId] = useState<number | null>(null)
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null)

  const handleNavigate = (page: string, comicId?: number, chapterId?: number) => {
    setCurrentPage(page)
    if (comicId) {
      setSelectedComicId(comicId)
    }
    if (chapterId) {
      setSelectedChapterId(chapterId)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    if (currentPage === 'comic-reader' && selectedComicId && selectedChapterId) {
      return <ComicReaderPage comicId={selectedComicId} chapterId={selectedChapterId} onNavigate={handleNavigate} />
    }

    if (currentPage === 'comic-detail' && selectedComicId) {
      return <ComicDetailPage comicId={selectedComicId} onNavigate={handleNavigate} />
    }

    switch (currentPage) {
      case 'admin':
        return <AdminDashboardPage onNavigate={handleNavigate} />
      case 'user-dashboard':
        return <UserDashboardPage onNavigate={handleNavigate} />
      case 'manga':
        return <MangaPage onComicClick={(id) => handleNavigate('comic-detail', id)} />
      case 'manhwa':
        return <ManhwaPage onComicClick={(id) => handleNavigate('comic-detail', id)} />
      case 'manhua':
        return <ManhuaPage onComicClick={(id) => handleNavigate('comic-detail', id)} />
      case 'bookmark':
        return <BookmarkPage onComicClick={(id) => handleNavigate('comic-detail', id)} />
      case 'home':
      default:
        return <HomePage 
          onComicClick={(id) => handleNavigate('comic-detail', id)}
          onChapterClick={(comicId, chapterId) => handleNavigate('comic-reader', comicId, chapterId)}
        />
    }
  }

  const isReaderPage = currentPage === 'comic-reader'
  const isAdminPage = currentPage === 'admin'
  const isUserDashboardPage = currentPage === 'user-dashboard'

  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background">
        {!isReaderPage && !isAdminPage && !isUserDashboardPage && <Header onNavigate={handleNavigate} />}
        <main>
          {renderPage()}
        </main>
        {!isReaderPage && !isAdminPage && !isUserDashboardPage && <Footer />}
      </div>
    </ThemeProvider>
  )
}