import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import { Switch } from '../ui/switch'
import { 
  User, 
  BookOpen, 
  Clock, 
  Heart, 
  Settings, 
  TrendingUp, 
  Calendar,
  Target,
  Award,
  Bookmark,
  History,
  Bell,
  Moon,
  Sun,
  Monitor,
  ArrowLeft,
  Edit2,
  Save,
  X,
  ChevronDown
} from 'lucide-react'
import { useTheme } from '../theme-provider'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

interface UserDashboardPageProps {
  onNavigate: (page: string) => void
}

// Mock data for user
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '',
  joinDate: '2023-01-15',
  level: 'Gold Reader',
  totalComicsRead: 127,
  totalTimeSpent: '245h 30m',
  currentStreak: 15,
  favoriteGenres: ['Action', 'Adventure', 'Supernatural'],
  readingGoal: 200,
  readingProgress: 63.5
}

const mockReadingHistory = [
  {
    id: 1,
    title: 'One Piece',
    chapter: 'Chapter 1095',
    lastRead: '2 hours ago',
    progress: 85,
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'Naruto',
    chapter: 'Chapter 700',
    lastRead: '1 day ago',
    progress: 100,
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'Attack on Titan',
    chapter: 'Chapter 139',
    lastRead: '3 days ago',
    progress: 100,
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop'
  }
]

const mockBookmarks = [
  {
    id: 1,
    title: 'Jujutsu Kaisen',
    chapter: 'Chapter 245',
    addedDate: '2024-01-10',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'Demon Slayer',
    chapter: 'Chapter 205',
    addedDate: '2024-01-08',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop'
  }
]

const tabOptions = [
  { value: 'overview', label: 'Overview', icon: TrendingUp },
  { value: 'history', label: 'History', icon: History },
  { value: 'bookmarks', label: 'Bookmark', icon: Bookmark },
  { value: 'profile', label: 'Profile', icon: User },
  { value: 'settings', label: 'Settings', icon: Settings },
  { value: 'achievements', label: 'Prestasi', icon: Award }
]

export function UserDashboardPage({ onNavigate }: UserDashboardPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(mockUser)
  const [activeTab, setActiveTab] = useState('overview')
  const { theme, setTheme } = useTheme()

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here would be the API call to save user data
    console.log('Saving user profile:', editedUser)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedUser(mockUser)
  }

  const getCurrentTabInfo = () => {
    return tabOptions.find(tab => tab.value === activeTab) || tabOptions[0]
  }

  const currentTab = getCurrentTabInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('home')}
              className="gap-2 shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali ke Home</span>
              <span className="sm:hidden">Kembali</span>
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center flex-1 mx-4">
              Dashboard User
            </h1>
            <div className="w-20 sm:w-32" /> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Navigation - Dropdown */}
        <div className="md:hidden mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <currentTab.icon className="w-4 h-4" />
                  <span>{currentTab.label}</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {tabOptions.map((tab) => (
                <DropdownMenuItem 
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)} 
                  className="gap-2"
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Navigation - Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="hidden md:grid w-full grid-cols-6 mb-8">
            {tabOptions.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content Sections */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* User Info Card */}
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white/20">
                      <AvatarImage src={mockUser.avatar} />
                      <AvatarFallback className="bg-white/20 text-white text-lg sm:text-xl">
                        {mockUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-xl sm:text-2xl font-bold">{mockUser.name}</h2>
                      <p className="text-white/80 text-sm sm:text-base">{mockUser.email}</p>
                      <div className="flex flex-col sm:flex-row items-center gap-2 mt-2">
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                          {mockUser.level}
                        </Badge>
                        <span className="text-white/80 text-xs sm:text-sm">
                          Member sejak {new Date(mockUser.joinDate).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <Card>
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
                      <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Total Komik Dibaca</p>
                        <p className="text-lg sm:text-2xl font-bold">{mockUser.totalComicsRead}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
                      <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Waktu Membaca</p>
                        <p className="text-lg sm:text-2xl font-bold">{mockUser.totalTimeSpent}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
                      <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <Target className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Streak Harian</p>
                        <p className="text-lg sm:text-2xl font-bold">{mockUser.currentStreak} hari</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
                      <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Level</p>
                        <p className="text-lg sm:text-2xl font-bold">{mockUser.level}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reading Goal Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Target Membaca Tahun Ini
                  </CardTitle>
                  <CardDescription>
                    Progress menuju target {mockUser.readingGoal} komik
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>{mockUser.totalComicsRead} dari {mockUser.readingGoal} komik</span>
                      <span>{mockUser.readingProgress}%</span>
                    </div>
                    <Progress value={mockUser.readingProgress} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="w-5 h-5" />
                      Aktivitas Terbaru
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-4">
                        {mockReadingHistory.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                            <img 
                              src={item.cover} 
                              alt={item.title}
                              className="w-12 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{item.title}</p>
                              <p className="text-sm text-muted-foreground">{item.chapter}</p>
                              <p className="text-xs text-muted-foreground">{item.lastRead}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{item.progress}%</div>
                              <Progress value={item.progress} className="w-16 h-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Genre Favorit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockUser.favoriteGenres.map((genre, index) => (
                        <div key={genre} className="flex items-center justify-between">
                          <span>{genre}</span>
                          <Badge variant="outline">#{index + 1}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Reading History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Membaca</CardTitle>
                  <CardDescription>Daftar komik yang baru-baru ini Anda baca</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockReadingHistory.map((item) => (
                      <div key={item.id} className="group cursor-pointer">
                        <Card className="transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-1">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img 
                                src={item.cover} 
                                alt={item.title}
                                className="w-16 h-20 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.chapter}</p>
                                <p className="text-xs text-muted-foreground mb-2">{item.lastRead}</p>
                                <div className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span>{item.progress}%</span>
                                  </div>
                                  <Progress value={item.progress} className="h-2" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Bookmarks Tab */}
          {activeTab === 'bookmarks' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bookmark Saya</CardTitle>
                  <CardDescription>Komik yang telah Anda bookmark</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockBookmarks.map((item) => (
                      <div key={item.id} className="group cursor-pointer">
                        <Card className="transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-1">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img 
                                src={item.cover} 
                                alt={item.title}
                                className="w-16 h-20 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.chapter}</p>
                                <p className="text-xs text-muted-foreground">
                                  Ditambahkan: {new Date(item.addedDate).toLocaleDateString('id-ID')}
                                </p>
                                <Button variant="outline" size="sm" className="mt-2">
                                  <Bookmark className="w-4 h-4 mr-2" />
                                  Hapus Bookmark
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Profil Saya</CardTitle>
                      <CardDescription>Kelola informasi profil Anda</CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile} size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Simpan
                        </Button>
                        <Button onClick={handleCancelEdit} variant="outline" size="sm">
                          <X className="w-4 h-4 mr-2" />
                          Batal
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={editedUser.avatar} />
                      <AvatarFallback className="text-2xl">
                        {editedUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline">
                        Ganti Foto
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Statistik Akun</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold">{mockUser.totalComicsRead}</p>
                        <p className="text-sm text-muted-foreground">Komik Dibaca</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold">{mockUser.currentStreak}</p>
                        <p className="text-sm text-muted-foreground">Hari Streak</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold">{mockUser.totalTimeSpent}</p>
                        <p className="text-sm text-muted-foreground">Waktu Baca</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan</CardTitle>
                  <CardDescription>Kelola preferensi dan pengaturan akun Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theme Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tema</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Mode Tampilan</p>
                        <p className="text-sm text-muted-foreground">Pilih tema yang Anda sukai</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant={theme === 'light' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTheme('light')}
                          className="w-full sm:w-auto"
                        >
                          <Sun className="w-4 h-4 mr-2" />
                          Terang
                        </Button>
                        <Button
                          variant={theme === 'dark' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTheme('dark')}
                          className="w-full sm:w-auto"
                        >
                          <Moon className="w-4 h-4 mr-2" />
                          Gelap
                        </Button>
                        <Button
                          variant={theme === 'system' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTheme('system')}
                          className="w-full sm:w-auto"
                        >
                          <Monitor className="w-4 h-4 mr-2" />
                          Sistem
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Notification Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifikasi</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Update Komik Baru</p>
                          <p className="text-sm text-muted-foreground">Dapatkan notifikasi untuk chapter baru</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Reminder Membaca</p>
                          <p className="text-sm text-muted-foreground">Pengingat harian untuk membaca</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Email Newsletter</p>
                          <p className="text-sm text-muted-foreground">Rekomendasi komik mingguan</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Reading Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Preferensi Membaca</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reading-goal">Target Membaca Tahunan</Label>
                        <Input
                          id="reading-goal"
                          type="number"
                          defaultValue={mockUser.readingGoal}
                          className="w-32"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Auto-bookmark Progress</p>
                          <p className="text-sm text-muted-foreground">Otomatis bookmark chapter terakhir</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Prestasi & Pencapaian
                  </CardTitle>
                  <CardDescription>Badge dan penghargaan yang telah Anda raih</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Achievement cards */}
                    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center">
                          <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <h3 className="font-medium mb-2">First Read</h3>
                        <p className="text-sm text-muted-foreground mb-3">Membaca komik pertama</p>
                        <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200">
                          Achieved
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                          <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-medium mb-2">Streak Master</h3>
                        <p className="text-sm text-muted-foreground mb-3">Membaca 10 hari berturut-turut</p>
                        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                          Achieved
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-medium mb-2">Century Reader</h3>
                        <p className="text-sm text-muted-foreground mb-3">Membaca 100+ komik</p>
                        <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
                          Achieved
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  )
}