import React, { useState } from 'react'
import { Search, User, Menu, Moon, Sun, Bookmark, X, Monitor, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useTheme } from './theme-provider'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Label } from './ui/label'

interface HeaderProps {
  onNavigate: (page: string) => void
}

export function Header({ onNavigate }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [adminClickCount, setAdminClickCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Mock login state

  const handleLogin = () => {
    setIsLoggedIn(true)
    setIsAuthOpen(false)
    // Simulate login and redirect to dashboard
    onNavigate('user-dashboard')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    onNavigate('home')
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/60 border-b border-white/20 dark:border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => {
                const newCount = adminClickCount + 1
                setAdminClickCount(newCount)
                
                if (newCount >= 5) {
                  // Reset counter and navigate to admin
                  setAdminClickCount(0)
                  onNavigate('admin')
                } else {
                  onNavigate('home')
                }
                
                // Reset counter after 3 seconds
                setTimeout(() => setAdminClickCount(0), 3000)
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-xl font-bold"
            >
              KEDAIKOMIK
            </button>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-6">
              <NavigationMenuItem>
                <button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">
                  Home
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => onNavigate('manga')} className="hover:text-blue-500 transition-colors">
                  Daftar Manga
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => onNavigate('manhwa')} className="hover:text-blue-500 transition-colors">
                  Manhwa
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => onNavigate('manhua')} className="hover:text-blue-500 transition-colors">
                  Manhua
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => onNavigate('bookmark')} className="hover:text-blue-500 transition-colors flex items-center space-x-1">
                  <Bookmark className="w-4 h-4" />
                  <span>Bookmark</span>
                </button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search & Controls */}
          <div className="flex items-center space-x-3">
            {/* Search Bar - Desktop */}
            {!isSearchOpen && (
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari komik..."
                  className="pl-10 w-64 bg-background/80 backdrop-blur-sm border-white/20"
                />
              </div>
            )}

            {/* Mobile Search */}
            {isSearchOpen && (
              <div className="relative flex-1 sm:hidden">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari komik..."
                  className="pl-10 pr-10 w-full bg-background/80 backdrop-blur-sm border-white/20"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Search Button - Mobile only */}
            {!isSearchOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="sm:hidden"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>
            )}

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : theme === 'dark' ? (
                <Monitor className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            {/* Profile - Dropdown for logged in, button for logged out */}
            {!isSearchOpen && (
              isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => onNavigate('user-dashboard')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate('bookmark')}>
                      <Bookmark className="w-4 h-4 mr-2" />
                      Bookmark
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsAuthOpen(true)}
                >
                  <User className="w-5 h-5" />
                </Button>
              )
            )}

            {/* Mobile Menu */}
            {!isSearchOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-white/20 shadow-lg z-40">
            <nav className="container mx-auto px-4 py-4 space-y-3">
              <button 
                onClick={() => {
                  onNavigate('home')
                  setIsMobileMenuOpen(false)
                }} 
                className="block w-full text-left py-2 hover:text-blue-500 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  onNavigate('manga')
                  setIsMobileMenuOpen(false)
                }} 
                className="block w-full text-left py-2 hover:text-blue-500 transition-colors"
              >
                Daftar Manga
              </button>
              <button 
                onClick={() => {
                  onNavigate('manhwa')
                  setIsMobileMenuOpen(false)
                }} 
                className="block w-full text-left py-2 hover:text-blue-500 transition-colors"
              >
                Manhwa
              </button>
              <button 
                onClick={() => {
                  onNavigate('manhua')
                  setIsMobileMenuOpen(false)
                }} 
                className="block w-full text-left py-2 hover:text-blue-500 transition-colors"
              >
                Manhua
              </button>
              <button 
                onClick={() => {
                  onNavigate('bookmark')
                  setIsMobileMenuOpen(false)
                }} 
                className="block w-full text-left py-2 hover:text-blue-500 transition-colors flex items-center space-x-2"
              >
                <Bookmark className="w-5 h-5" />
                <span>Bookmark</span>
              </button>
              {isLoggedIn && (
                <button 
                  onClick={() => {
                    onNavigate('user-dashboard')
                    setIsMobileMenuOpen(false)
                  }} 
                  className="block w-full text-left py-2 hover:text-blue-500 transition-colors flex items-center space-x-2"
                >
                  <Settings className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Masuk ke KEDAIKOMIK</DialogTitle>
            <DialogDescription>
              Masuk ke akun Anda atau buat akun baru untuk mulai membookmark komik favorit
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Masukkan email Anda" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Masukkan password Anda" type="password" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded" />
                <Label htmlFor="remember" className="text-sm">Ingat saya</Label>
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleLogin}
              >
                Login
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Lupa password? <button className="text-blue-600 hover:underline">Reset di sini</button>
              </p>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="reg-username">Username</Label>
                <Input id="reg-username" placeholder="Pilih username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" placeholder="Masukkan email Anda" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input id="reg-password" placeholder="Buat password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-confirm">Konfirmasi Password</Label>
                <Input id="reg-confirm" placeholder="Ulangi password" type="password" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="rounded" />
                <Label htmlFor="terms" className="text-sm">
                  Saya setuju dengan <button className="text-blue-600 hover:underline">syarat dan ketentuan</button>
                </Label>
              </div>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleLogin}
              >
                Daftar
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </header>
  )
}