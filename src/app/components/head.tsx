'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { QrCode } from 'lucide-react'

export default function Head({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className='h-14 fixed border-b top-0 z-40 w-full bg-white shadow-xs'>
      <div className={`h-full px-8 flex justify-between items-center ${className}`}>
        <Link className='h-full flex items-center cursor-pointer' href='/'>
          <Image src='/logo.png' alt='logo' width={28} height={28} priority />
          <div className='text-xl ml-2 font-bold font-mono text-primary'>懒人封面生成器</div>
        </Link>
        <div className='flex-1 flex items-center justify-between'>
          <div className='flex-1 flex items-center'>
          </div>
          <div className='h-full flex items-center justify-end'>
            {/* 下拉菜单容器 */}
            <div 
              className="relative" 
              id="tools-dropdown"
              ref={dropdownRef}
              onMouseEnter={() => {
                if (window.innerWidth >= 768) openDropdown()
              }}
              onMouseLeave={() => {
                if (window.innerWidth >= 768) closeDropdown()
              }}
            >
              {/* 触发按钮 - Adapted for light background */}
              <button 
                id="tools-btn" 
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(!isOpen)
                }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 hover:bg-black/10 backdrop-blur-sm transition-all text-gray-900 text-sm font-medium group outline-none"
              >
                更多工具 <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              
              {/* 下拉菜单内容 */}
              <div 
                id="tools-menu" 
                className={`absolute right-0 mt-2 w-64 rounded-xl bg-[#1a1a1c] border border-white/10 shadow-xl overflow-hidden z-50 transform origin-top-right transition-all duration-200 ${
                  isOpen 
                    ? 'opacity-100 scale-100 visible' 
                    : 'opacity-0 scale-95 invisible'
                }`}
              >
                <a href="https://lazyso.com/" target="_blank" className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2">
                    <span>🏠</span> 回到 LazySo 主站
                </a>
                <a href="https://wcnkxg1u4986.feishu.cn/base/UTBDb7vwiap3zmsJwuJctoVPnWx?from=from_copylink" target="_blank" className="block px-4 py-3 text-sm text-[#a78bfa] font-medium hover:bg-white/5 hover:text-[#c4b5fd] transition-colors border-t border-white/5 flex items-center gap-2">
                    <span>🚀</span> 懒人兵器库 (AI 提示词/资源)
                </a>
                {/* 联系作者按钮 */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button 
                      id="contact-btn" 
                      className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors border-t border-white/5 flex items-center gap-2 outline-none"
                    >
                        <span>💬</span> 联系作者
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-xs p-6">
                    <DialogTitle className="text-center mb-4">扫码添加作者微信</DialogTitle>
                    <div className="flex items-center justify-center">
                      <div className="relative w-56 h-56">
                        <Image 
                          src="/vx_qrcode.jpg" 
                          alt="作者微信二维码" 
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
