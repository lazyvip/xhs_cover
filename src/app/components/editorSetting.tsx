'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, RotateCcw, Save } from 'lucide-react'

import { useContext, useEffect, useState } from 'react'
import { CoverContext } from './coverContext'
import { fontLoader, FONTS } from '../settings/fonts'
import { PATTERNS } from '../settings/patterns'
import { SIZES } from '../settings/sizes'
import { DEFAULT_SETTING } from '../settings/default'
import { imgToBase64 } from '../tools/utils'
import CenteredAlert from './common/centeredAlert'
import IconSelect from './iconSelect'
import BackgroundSelect from './backgroundSelect'

const EditorSetting = () => {
  const { coverSetting, setCoverSetting } = useContext(CoverContext)
  const [fontData, setFontData] = useState<GroupData[]>([])
  const [patternData, setPatternData] = useState<GroupData[]>([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState<CenterAlertOptions>()

  // 初始化
  useEffect(() => {
    setFontData(groupWithTypeName(FONTS))
    setPatternData(groupWithTypeName(PATTERNS))
  }, [])

  const showNotification = (data: React.SetStateAction<CenterAlertOptions | undefined>) => {
    setAlertData(data)
    setShowAlert(true)
  }

  const handleClose = () => {
    setShowAlert(false)
  }

  // 字体分组显示
  const groupWithTypeName = (items: GroupItem[]): GroupData[] => {
    const grouped = items.reduce<Record<string, GroupData>>((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = {
          type: item.type,
          typeName: item.typeName,
          list: []
        }
      }
      acc[item.type].list.push(item)
      return acc
    }, {})

    return Object.values(grouped)
  }

  type changeOptions = Font | Pattern | Size
  const changeValue = (value: string, key: string, array: changeOptions[]) => {
    const selectedOption = array.filter((item) => {
      return item.value === value
    })
    setCoverSetting({
      ...coverSetting,
      [key]: selectedOption[0]
    })
  }

  const saveSetting = () => {
    const promises = []
    const settingToSave = { ...coverSetting }

    // 处理自定义图标
    if (coverSetting.customIcon) {
      promises.push(
        imgToBase64(coverSetting.customIcon).then((res) => {
          settingToSave.customIcon = 'data:image/png;base64,' + res
        })
      )
    }

    // 处理背景图片
    if (coverSetting.bg.type === 'local' && coverSetting.bg.image) {
      promises.push(
        imgToBase64(coverSetting.bg.image).then((res) => {
          settingToSave.bg.image = 'data:image/png;base64,' + res
        })
      )
    }

    if (promises.length > 0) {
      Promise.all(promises)
        .then(() => {
          localStorage.setItem('coverSetting', JSON.stringify(settingToSave))
          showNotification({
            type: 'success',
            title: '设置已保存',
            message: '数据仅保存在本地浏览器中，请放心使用'
          })
        })
        .catch((err) => {
          showNotification({
            type: 'error',
            title: '设置保存失败',
            message: err
          })
        })
    } else {
      localStorage.setItem('coverSetting', JSON.stringify(settingToSave))
      showNotification({
        type: 'success',
        title: '配置已保存',
        message: '数据仅保存在本地浏览器中，请放心使用'
      })
    }
  }

  const resetSetting = () => {
    setCoverSetting({
      ...DEFAULT_SETTING,
      title: coverSetting.title,
      author: coverSetting.author,
      icon: coverSetting.icon,
      customIcon: coverSetting.customIcon,
      bg: { ...DEFAULT_SETTING.bg }
    })
    showNotification({
      type: 'success',
      title: '样式已重置',
      message: '标题、作者、图标等信息不会被重置'
    })
  }

  const clearLocalSetting = () => {
    localStorage.setItem('coverSetting', JSON.stringify(DEFAULT_SETTING))
    showNotification({
      type: 'success',
      title: '保存配置已清除',
      message: '刷新页面或下次进入网站后生效'
    })
  }

  // 动态加载字体
  useEffect(() => {
    fontLoader.loadFont(coverSetting.font.label, coverSetting.font.url)
  }, [coverSetting.font.label, coverSetting.font.url])

  return (
    <div className='h-full w-full overflow-y-auto py-4'>
      <h2 className='text-lg font-bold text-center mb-4'>基础配置</h2>
      <form className='pr-10 pb-4'>
        <div className='flex w-full items-center flex-wrap gap-y-4'>
          <div className='flex w-full'>
            <Label htmlFor='title' className='w-16 justify-end mr-2'>
              标题
            </Label>
            <Textarea
              id='title'
              className='flex-1 focus-visible:ring-1'
              placeholder='请输入封面标题'
              value={coverSetting.title}
              onChange={(e) => setCoverSetting({ ...coverSetting, title: e.target.value })}
            />
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full'>
            <Label htmlFor='author' className='w-16 justify-end mr-2'>
              作者
            </Label>
            <Input
              id='author'
              className='flex-1 focus-visible:ring-1'
              placeholder='请输入作者'
              value={coverSetting.author}
              onChange={(e) => setCoverSetting({ ...coverSetting, author: e.target.value })}
            />
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full'>
            <Label className='w-16 justify-end mr-2'>图标</Label>
            <IconSelect />
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <Label htmlFor='font' className='w-16 justify-end mr-2'>
              字体
            </Label>
            <Select
              value={coverSetting.font.value}
              onValueChange={(value) => {
                changeValue(value, 'font', FONTS)
              }}>
              <SelectTrigger id='font' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder='请选择字体' />
              </SelectTrigger>
              <SelectContent position='popper'>
                {fontData.map((item) => (
                  <SelectGroup key={item.type}>
                    <SelectLabel className='font-bold text-primary'>{item.typeName}</SelectLabel>
                    {item.list.map((temp) => (
                      <SelectItem className={temp.value} key={temp.value} value={temp.value}>
                        {temp.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <div className='w-16 flex items-center justify-end mr-2 gap-1'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className='w-3 h-3 text-gray-400 hover:text-gray-600 cursor-help' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>纹理仅在纯色/渐变背景下生效</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Label htmlFor='pattern'>纹理</Label>
            </div>
            <Select
              value={coverSetting.pattern.value}
              onValueChange={(value) => {
                changeValue(value, 'pattern', PATTERNS)
              }}>
              <SelectTrigger id='pattern' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder='请选择纹理' />
              </SelectTrigger>
              <SelectContent position='popper'>
                {patternData.map((item) => (
                  <SelectGroup key={item.type}>
                    <SelectLabel className='font-bold text-primary'>{item.typeName}</SelectLabel>
                    {item.list.map((temp) => (
                      <SelectItem key={temp.value} value={temp.value}>
                        {temp.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full'>
            <Label htmlFor='bg' className='w-16 justify-end mr-2'>
              背景
            </Label>
            <BackgroundSelect />
          </div>
          <div className='flex w-full'>
            <Label htmlFor='size' className='w-16 justify-end mr-2'>
              尺寸
            </Label>
            <Select
              value={coverSetting.size.value}
              onValueChange={(value) => {
                changeValue(value, 'size', SIZES)
              }}>
              <SelectTrigger id='size' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder='请选择宽高比例' />
              </SelectTrigger>
              <SelectContent position='popper'>
                {SIZES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <Label htmlFor='download' className='w-16 justify-end mr-2'>
              格式
            </Label>
            <Select
              value={coverSetting.download}
              onValueChange={(value) => {
                setCoverSetting({ ...coverSetting, download: value as DownloadType })
              }}>
              <SelectTrigger id='download' className='flex-1 mr-0 overflow-hidden focus-visible:ring-1'>
                <SelectValue placeholder='请选择输出文件格式' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectItem key='png' value='png'>
                  PNG
                </SelectItem>
                <SelectItem key='jpg' value='jpg'>
                  JPG
                </SelectItem>
                <SelectItem key='webp' value='webp'>
                  WEBP
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-full md:w-1/2 xl:w-full 2xl:w-1/2'>
            <Label htmlFor='download' className='w-16 justify-end mr-2'>
              输出
            </Label>
            <div className='h-9 flex-1 flex items-center gap-2 border border-input rounded-md shadow-xs px-2'>
              <Slider
                id='download'
                className='flex-1'
                value={[coverSetting.scale]}
                min={0.5}
                max={5}
                step={0.5}
                onValueChange={(newValue) => setCoverSetting({ ...coverSetting, scale: newValue[0] })}
              />
              <div className='nowrap text-sm'>缩放{coverSetting.scale}倍</div>
            </div>
          </div>
        </div>
      </form>

      {/* Insider Card */}
      <div className='px-4 mb-4'>
        <a href='https://lazyso.com/insider' target='_blank' className='block'>
          <Card className='bg-gradient-to-r from-amber-50 to-orange-50 border-orange-100 hover:shadow-md transition-shadow cursor-pointer'>
            <CardHeader className='p-4'>
              <CardTitle className='text-sm text-orange-800 flex items-center gap-2'>
                🚀 让点击率翻倍？
              </CardTitle>
              <CardDescription className='text-xs text-orange-700 mt-1'>
                一张好封面能提升 300% 的 CTR。LazySo Insider 社群已拆解《爆款封面设计与流量底层逻辑》，教你用图骗点击。
              </CardDescription>
            </CardHeader>
          </Card>
        </a>
      </div>

      <div className='flex justify-center items-center p-4'>
        <Button className='cursor-pointer mr-4' onClick={saveSetting}>
          <Save className='w-4 h-4 hidden md:block' />
          保存
        </Button>
        <Button className='cursor-pointer' variant='outline' onClick={resetSetting}>
          <RotateCcw className='w-4 h-4 hidden md:block' />
          重置
        </Button>
      </div>
      <div className='flex justify-end items-center p-4 pr-12'>
        <span className='text-sm underline cursor-pointer' onClick={clearLocalSetting}>
          清除已保存配置
        </span>
      </div>
      {showAlert && <CenteredAlert type={alertData?.type} title={alertData?.title} message={alertData?.message} onClose={handleClose} />}
    </div>
  )
}

export default EditorSetting
