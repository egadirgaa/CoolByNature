import React, { useState } from 'react'
import { 
  Users, 
  BookOpen, 
  Image, 
  BarChart3, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Upload,
  Download,
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  UserX,
  Crown,
  Shield,
  Calendar,
  TrendingUp,
  TrendingDown,
  Star,
  MessageSquare,
  Flag
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Progress } from '../ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { toast } from 'sonner'

interface AdminDashboardPageProps {
  onNavigate: (page: string) => void
}

interface Comic {
  id: number
  title: string
  author: string
  image: string
  status: 'Draft' | 'Published' | 'Hidden'
  type: 'Manga' | 'Manhwa' | 'Manhua'
  chapters: number
  views: string
  rating: number
  createdAt: string
  updatedAt: string
}

interface User {
  id: number
  username: string
  email: string
  role: 'Admin' | 'Moderator' | 'User'
  avatar: string
  status: 'Active' | 'Banned' | 'Suspended'
  joinDate: string
  lastActive: string
  totalComments: number
  totalBookmarks: number
}

interface Banner {
  id: number
  title: string
  image: string
  link: string
  isActive: boolean
  position: 'Hero' | 'Sidebar' | 'Footer'
  startDate: string
  endDate: string
  clicks: number
}

// Mock data
const mockComics: Comic[] = [
  {
    id: 1,
    title: "Attack on Titan",
    author: "Hajime Isayama",
    image: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc1NzMwNDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Published",
    type: "Manga",
    chapters: 139,
    views: "1.2M",
    rating: 4.9,
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01"
  },
  {
    id: 2,
    title: "Solo Leveling",
    author: "Chugong",
    image: "https://images.unsplash.com/photo-1741851360205-2c2edc13c04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5od2ElMjBrb3JlYW4lMjBjb21pY3xlbnwxfHx8fDE3NTc0MDM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Published",
    type: "Manhwa",
    chapters: 179,
    views: "1.8M",
    rating: 4.8,
    createdAt: "2024-02-20",
    updatedAt: "2024-12-02"
  },
  {
    id: 3,
    title: "Demon Slayer",
    author: "Koyoharu Gotouge",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Draft",
    type: "Manga",
    chapters: 205,
    views: "950K",
    rating: 4.7,
    createdAt: "2024-03-10",
    updatedAt: "2024-11-28"
  }
]

const mockUsers: User[] = [
  {
    id: 1,
    username: "comic_lover_123",
    email: "user1@example.com",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Active",
    joinDate: "2024-01-10",
    lastActive: "2 jam lalu",
    totalComments: 45,
    totalBookmarks: 23
  },
  {
    id: 2,
    username: "manga_master",
    email: "moderator@example.com",
    role: "Moderator",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3NDAzODA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Active",
    joinDate: "2023-12-05",
    lastActive: "5 menit lalu",
    totalComments: 123,
    totalBookmarks: 67
  },
  {
    id: 3,
    username: "otaku_reader",
    email: "otaku@example.com",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Banned",
    joinDate: "2024-02-15",
    lastActive: "1 minggu lalu",
    totalComments: 78,
    totalBookmarks: 34
  }
]

const mockBanners: Banner[] = [
  {
    id: 1,
    title: "Promo Spesial Tahun Baru",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1hbmdhJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTczMDQwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    link: "/promo",
    isActive: true,
    position: "Hero",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    clicks: 1250
  },
  {
    id: 2,
    title: "Komik Terbaru Minggu Ini",
    image: "https://images.unsplash.com/photo-1706092949204-2f5bacbf2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhqYXBhbmVzZSUyMG1hbmdhJTIwY29taWNzfGVufDF8fHx8MTc1NzQwMzgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    link: "/latest",
    isActive: true,
    position: "Sidebar",
    startDate: "2024-12-01",
    endDate: "2024-12-07",
    clicks: 890
  }
]

export function AdminDashboardPage({ onNavigate }: AdminDashboardPageProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddComicModal, setShowAddComicModal] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showAddBannerModal, setShowAddBannerModal] = useState(false)

  const [comics, setComics] = useState(mockComics)
  const [users, setUsers] = useState(mockUsers)
  const [banners, setBanners] = useState(mockBanners)

  const handleComicStatusChange = (id: number, status: Comic['status']) => {
    setComics(comics.map(comic => 
      comic.id === id ? { ...comic, status } : comic
    ))
    toast.success(`Status komik berhasil diubah ke ${status}`)
  }

  const handleUserStatusChange = (id: number, status: User['status']) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status } : user
    ))
    toast.success(`Status user berhasil diubah ke ${status}`)
  }

  const handleBannerToggle = (id: number) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
    ))
    toast.success('Status banner berhasil diubah')
  }

  const handleDeleteComic = (id: number) => {
    setComics(comics.filter(comic => comic.id !== id))
    toast.success('Komik berhasil dihapus')
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
    toast.success('User berhasil dihapus')
  }

  const handleDeleteBanner = (id: number) => {
    setBanners(banners.filter(banner => banner.id !== id))
    toast.success('Banner berhasil dihapus')
  }

  const filteredComics = comics.filter(comic => {
    const matchesSearch = comic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comic.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || comic.status.toLowerCase() === selectedStatus
    return matchesSearch && matchesStatus
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || user.status.toLowerCase() === selectedStatus
    return matchesSearch && matchesStatus
  })

  const filteredBanners = banners.filter(banner => {
    const matchesSearch = banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && banner.isActive) ||
                         (selectedStatus === 'inactive' && !banner.isActive)
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Banned': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      'Suspended': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'Published': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Draft': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      'Hidden': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    }
    return statusColors[status] || 'bg-gray-100 text-gray-800'
  }

  const getRoleBadge = (role: string) => {
    const roleColors = {
      'Admin': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Moderator': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'User': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
    return roleColors[role] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
            <p className="text-muted-foreground">Kelola konten dan pengguna KEDAIKOMIK</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => onNavigate('home')}
            className="mt-4 md:mt-0"
          >
            Kembali ke Situs
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Komik</p>
                  <p className="text-2xl font-bold">{comics.length}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% dari bulan lalu
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total User</p>
                  <p className="text-2xl font-bold">{users.length}K</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8% dari bulan lalu
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Banner Aktif</p>
                  <p className="text-2xl font-bold">{banners.filter(b => b.isActive).length}</p>
                  <p className="text-xs text-yellow-600 flex items-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    2 akan berakhir minggu ini
                  </p>
                </div>
                <Image className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">2.8M</p>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -3% dari bulan lalu
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="comics">Komik</TabsTrigger>
            <TabsTrigger value="users">User</TabsTrigger>
            <TabsTrigger value="banners">Banner</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Aktivitas Terbaru
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Komik "Solo Leveling" ditambahkan</p>
                      <p className="text-xs text-muted-foreground">2 jam lalu</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">User baru mendaftar</p>
                      <p className="text-xs text-muted-foreground">3 jam lalu</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Banner "Promo Spesial" diaktifkan</p>
                      <p className="text-xs text-muted-foreground">5 jam lalu</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Chapter baru "Attack on Titan" dirilis</p>
                      <p className="text-xs text-muted-foreground">1 hari lalu</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Comics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Komik Populer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comics.slice(0, 4).map((comic, index) => (
                    <div key={comic.id} className="flex items-center space-x-3">
                      <div className="text-lg font-bold text-muted-foreground w-6">
                        {index + 1}
                      </div>
                      <ImageWithFallback
                        src={comic.image}
                        alt={comic.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{comic.title}</p>
                        <p className="text-xs text-muted-foreground">{comic.views} views</p>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        <span className="text-xs">{comic.rating}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Comics Tab */}
          <TabsContent value="comics" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Manajemen Komik
                  </CardTitle>
                  <Dialog open={showAddComicModal} onOpenChange={setShowAddComicModal}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Komik
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Tambah Komik Baru</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Judul Komik</Label>
                          <Input id="title" placeholder="Masukkan judul komik" />
                        </div>
                        <div>
                          <Label htmlFor="author">Author</Label>
                          <Input id="author" placeholder="Masukkan nama author" />
                        </div>
                        <div>
                          <Label htmlFor="type">Tipe</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tipe komik" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manga">Manga</SelectItem>
                              <SelectItem value="manhwa">Manhwa</SelectItem>
                              <SelectItem value="manhua">Manhua</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="description">Deskripsi</Label>
                          <Textarea id="description" placeholder="Masukkan deskripsi komik" />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowAddComicModal(false)}>
                            Batal
                          </Button>
                          <Button onClick={() => {
                            setShowAddComicModal(false)
                            toast.success('Komik berhasil ditambahkan')
                          }}>
                            Simpan
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Cari komik..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Komik</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Chapters</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredComics.map((comic) => (
                        <TableRow key={comic.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <ImageWithFallback
                                src={comic.image}
                                alt={comic.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium">{comic.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  Updated: {comic.updatedAt}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{comic.author}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{comic.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={comic.status.toLowerCase()}
                              onValueChange={(value) => 
                                handleComicStatusChange(comic.id, value as Comic['status'])
                              }
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="hidden">Hidden</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>{comic.chapters}</TableCell>
                          <TableCell>{comic.views}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              {comic.rating}
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Lihat Detail
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteComic(comic.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Hapus
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {filteredComics.map((comic) => (
                    <Card key={comic.id} className="p-4">
                      <div className="flex space-x-4">
                        <ImageWithFallback
                          src={comic.image}
                          alt={comic.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="font-medium">{comic.title}</h3>
                            <p className="text-sm text-muted-foreground">{comic.author}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">{comic.type}</Badge>
                            <Badge className={`text-xs ${getStatusBadge(comic.status)}`}>
                              {comic.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Chapters: </span>
                              <span>{comic.chapters}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Views: </span>
                              <span>{comic.views}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Rating: </span>
                              <span className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                                {comic.rating}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Updated: </span>
                              <span>{comic.updatedAt}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 pt-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Detail
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteComic(comic.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Manajemen User
                  </CardTitle>
                  <Dialog open={showAddUserModal} onOpenChange={setShowAddUserModal}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Tambah User Baru</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" placeholder="Masukkan username" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Masukkan email" />
                        </div>
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="moderator">Moderator</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="Masukkan password" />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowAddUserModal(false)}>
                            Batal
                          </Button>
                          <Button onClick={() => {
                            setShowAddUserModal(false)
                            toast.success('User berhasil ditambahkan')
                          }}>
                            Simpan
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Cari user..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Comments</TableHead>
                        <TableHead>Bookmarks</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>
                                  {user.username.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.username}</p>
                                <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getRoleBadge(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={user.status.toLowerCase()}
                              onValueChange={(value) => 
                                handleUserStatusChange(user.id, value as User['status'])
                              }
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="banned">Banned</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>{user.totalComments}</TableCell>
                          <TableCell>{user.totalBookmarks}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Lihat Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Kirim Pesan
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Hapus
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="p-4">
                      <div className="flex space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="font-medium">{user.username}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge className={`text-xs ${getRoleBadge(user.role)}`}>
                              {user.role}
                            </Badge>
                            <Badge className={`text-xs ${getStatusBadge(user.status)}`}>
                              {user.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Join Date: </span>
                              <span>{user.joinDate}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Last Active: </span>
                              <span>{user.lastActive}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Comments: </span>
                              <span>{user.totalComments}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Bookmarks: </span>
                              <span>{user.totalBookmarks}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Profile
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Banners Tab */}
          <TabsContent value="banners" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <CardTitle className="flex items-center">
                    <Image className="w-5 h-5 mr-2" />
                    Manajemen Banner
                  </CardTitle>
                  <Dialog open={showAddBannerModal} onOpenChange={setShowAddBannerModal}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Banner
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Tambah Banner Baru</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="banner-title">Judul Banner</Label>
                          <Input id="banner-title" placeholder="Masukkan judul banner" />
                        </div>
                        <div>
                          <Label htmlFor="banner-link">Link</Label>
                          <Input id="banner-link" placeholder="Masukkan link banner" />
                        </div>
                        <div>
                          <Label htmlFor="banner-position">Posisi</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih posisi banner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hero">Hero</SelectItem>
                              <SelectItem value="sidebar">Sidebar</SelectItem>
                              <SelectItem value="footer">Footer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowAddBannerModal(false)}>
                            Batal
                          </Button>
                          <Button onClick={() => {
                            setShowAddBannerModal(false)
                            toast.success('Banner berhasil ditambahkan')
                          }}>
                            Simpan
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Cari banner..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Tidak Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBanners.map((banner) => (
                    <Card key={banner.id} className="overflow-hidden">
                      <div className="aspect-video">
                        <ImageWithFallback
                          src={banner.image}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{banner.title}</h3>
                          <Switch
                            checked={banner.isActive}
                            onCheckedChange={() => handleBannerToggle(banner.id)}
                          />
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Posisi:</span>
                            <Badge variant="outline">{banner.position}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Clicks:</span>
                            <span>{banner.clicks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Mulai:</span>
                            <span>{banner.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Berakhir:</span>
                            <span>{banner.endDate}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteBanner(banner.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
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