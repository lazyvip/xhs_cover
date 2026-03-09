'use client'

import { useContext, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { LoaderCircle } from 'lucide-react'

import EditorPreview from './editorPreview'
import EditorSetting from './editorSetting'
import EditorTheme from './editorTheme'
import { CoverContext } from './coverContext'
import { DEFAULT_SETTING } from '../settings/default'

const PROMO_CLOSED_KEY = 'promoWidgetClosed'

const PromoWidget = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    const closed = sessionStorage.getItem(PROMO_CLOSED_KEY) === '1'
    if (closed) return

    const timer = window.setTimeout(() => {
      setIsRendered(true)
      requestAnimationFrame(() => setIsVisible(true))
    }, 9000)

    return () => window.clearTimeout(timer)
  }, [])

  const handleClose = () => {
    sessionStorage.setItem(PROMO_CLOSED_KEY, '1')
    setIsVisible(false)
    window.setTimeout(() => setIsRendered(false), 350)
  }

  if (!isRendered) return null

  return (
    <div className='fixed z-40 left-0 right-0 bottom-0 px-4 pb-4 md:left-auto md:right-6 md:bottom-6 md:w-[320px] md:px-0 md:pb-0'>
      <div
        className={`relative w-full rounded-2xl bg-black/70 text-white shadow-2xl backdrop-blur-md transition-all duration-[350ms] ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
        <button
          type='button'
          aria-label='关闭'
          onClick={handleClose}
          className='absolute right-3 top-2 text-white/70 hover:text-white'>
          ✕
        </button>
        <div className='px-5 py-4'>
          <div className='text-base font-bold mb-2'>🔥 别光顾着制作封面了，看看别人怎么用 AI 搞钱？</div>
          <div className='text-sm text-white/80 mb-4'>
            LazySo内部社群已更新本周【AI工具/自媒体矩阵】的最新变现 SOP 与对标账号。别只做无情的做号机器，来看看底层的商业逻辑。
          </div>
          <a
            href='https://lazyso.com/labs/?from=cover_make'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center rounded-full bg-white text-black font-semibold text-sm px-4 py-2 hover:bg-white/90'>
            👉 免费查阅本周实操案例
          </a>
        </div>
      </div>
    </div>
  )
}

const Editor = () => {
  const { setCoverSetting } = useContext(CoverContext)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 1280px)')

    const handleResize = (event: MediaQueryListEvent) => {
      setIsSmallScreen(event.matches)
    }

    // 初始化检查
    setIsSmallScreen(mediaQueryList.matches)
    // 初始化数据
    const savedData = localStorage.getItem('coverSetting')
    const defaultData = savedData ? JSON.parse(savedData) : DEFAULT_SETTING
    setCoverSetting({ ...DEFAULT_SETTING, ...defaultData })
    setLoading(false)
    // 添加事件监听器
    mediaQueryList.addEventListener('change', handleResize)
    // 清理事件监听器
    return () => mediaQueryList.removeEventListener('change', handleResize)
  }, [setCoverSetting])

  if (loading)
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
        <div className='flex flex-col items-center gap-2'>
          <LoaderCircle size={48} className='animate-spin mb-4' /> 加载中…
        </div>
      </div>
    )

  return (
    <div className='pt-14 h-full'>
      <PromoWidget />
      {isSmallScreen ? (
        <Tabs defaultValue='setting' className='w-full h-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='setting'>基础配置</TabsTrigger>
            <TabsTrigger value='preview'>封面预览</TabsTrigger>
            <TabsTrigger value='theme'>主题选择</TabsTrigger>
          </TabsList>
          <TabsContent value='setting'>
            <div className='h-full w-full'>
              <EditorSetting />
            </div>
          </TabsContent>
          <TabsContent value='preview'>
            <div className='w-full h-full overflow-auto bg-gray-50'>
              <EditorPreview />
            </div>
          </TabsContent>
          <TabsContent value='theme'>
            <div className='h-full w-full'>
              <EditorTheme />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className='h-full w-full flex overflow-hidden'>
          <div className='h-full w-1/5 xl:w-1/4'>
            <EditorSetting />
          </div>
          <Separator orientation='vertical' />
          <div className='h-full flex-1 overflow-auto bg-gray-50'>
            <EditorPreview />
          </div>
          <Separator orientation='vertical' />
          <div className='h-full w-[120px] xl:w-[160px] 2xl:w-[280px]'>
            <EditorTheme />
          </div>
        </div>
      )}
    </div>
  )
}

export default Editor
