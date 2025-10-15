import React from 'react'
import { Heart, Github, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-xl font-bold">
              KEDAIKOMIK
            </div>
            <p className="text-sm text-muted-foreground">
              Platform terbaik untuk membaca manga, manhwa, dan manhua favorit Anda.
            </p>
            <div className="flex space-x-3">
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-blue-500 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-pink-500 cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-muted-foreground hover:text-gray-800 dark:hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Daftar Manga
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Manhwa
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Manhua
              </a>
            </div>
          </div>

          {/* Genre */}
          <div className="space-y-4">
            <h3 className="font-semibold">Genre Populer</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Action
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Romance
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Fantasy
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Comedy
              </a>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold">Tentang</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tentang Kami
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Kontak
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 KEDAIKOMIK. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center space-x-1 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for comic lovers</span>
          </p>
        </div>
      </div>
    </footer>
  )
}