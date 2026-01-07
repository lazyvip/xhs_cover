import React from 'react'

const ThemePreview = ({ theme }: { theme: string }) => {
  const renderContent = () => {
    switch (theme) {
      case 'outline':
        return (
          <div className='flex h-full w-full flex-col justify-center gap-1.5 bg-gray-300 p-3'>
            <div className='h-3 w-3 rounded-full bg-white' />
            <div className='h-2 w-full rounded-full bg-white' />
            <div className='h-1 w-6 rounded-full bg-white' />
          </div>
        )
      case 'modern':
        return (
          <div className='flex h-full w-full items-center gap-2 bg-gray-300 p-3'>
            <div className='h-4 w-4 shrink-0 rounded-full border-3 border-white bg-transparent' />
            <div className='flex flex-1 flex-col gap-1.5 rounded-sm bg-white p-2'>
              <div className='h-2 w-full rounded-full bg-gray-300' />
              <div className='h-1 w-1/2 rounded-full bg-gray-300' />
            </div>
          </div>
        )
      case 'basic':
        return (
          <div className='flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-300 p-3'>
            <div className='flex w-full flex-col gap-1.5 rounded-sm bg-white p-2'>
              <div className='h-2 w-full rounded-full bg-gray-300' />
              <div className='flex w-full justify-center items-center gap-1.5'>
                <div className='h-2 w-2 rounded-full bg-gray-300' />
                <div className='h-1 w-4 rounded-full bg-gray-300' />
              </div>
            </div>
          </div>
        )
      case 'background':
        return (
          <div className='relative flex h-full w-full items-center justify-center overflow-hidden bg-gray-300'>
            <div className='absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-white opacity-50' />
            <div className='absolute -left-4 top-2 h-10 w-10 rounded-full bg-white opacity-50' />
            <div className='flex flex-col items-center gap-1.5 z-10'>
              <div className='h-4 w-4 rounded-full  bg-white' />
              <div className='h-2 w-16 rounded-full bg-white' />
              <div className='h-1 w-6 rounded-full bg-white' />
            </div>
          </div>
        )
      case 'stylish':
        return (
          <div className='flex h-full w-full items-center justify-between bg-gray-300'>
            <div className='w-1/2 h-full flex flex-1 flex-col justify-center gap-2 bg-white/80 p-2'>
              <div className='h-2 w-full rounded-full bg-gray-300' />
              <div className='flex items-center gap-1'>
                <div className='h-2 w-2 rounded-full bg-gray-300' />
                <div className='h-1 w-4 rounded-full bg-gray-300' />
              </div>
            </div>
            <div className='h-full w-1/2 relative'>
              <div className='absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-white opacity-50' />
              <div className='absolute left-0 -top-2 h-6 w-6 rounded-full bg-white opacity-50' />
            </div>
          </div>
        )
      case 'preview':
        return (
          <div className='flex flex-col h-full w-full items-center justify-end bg-gray-300 px-3 gap-1'>
            <div className='h-1 w-6 bg-white rounded-full'></div>
            <div className='h-2 w-full bg-white rounded-full'></div>
            <div className='flex h-7 w-3/4 flex-col overflow-hidden rounded-t-sm bg-white shadow-sm'>
              <div className='w-full h-3 rounded-t-sm border-b border-gray-100 flex items-center gap-1 px-1'>
                <div className='h-1 w-1 rounded-full bg-gray-300'></div>
                <div className='h-1 w-1 rounded-full bg-gray-300'></div>
                <div className='h-1 w-1 rounded-full bg-gray-300'></div>
              </div>
              <div className='h-full w-full bg-gray-200'></div>
            </div>
          </div>
        )
      case 'mobile':
        return (
          <div className='flex h-full w-full items-center justify-center bg-gray-300 p-3 gap-2'>
            <div className='w-2/3 flex flex-1 flex-col gap-1.5 items-center'>
              <div className='h-1 w-4 rounded-full bg-white' />
              <div className='h-2 w-full rounded-full bg-white' />
            </div>
            <div className='flex h-full w-1/3 flex-col items-center rounded-sm border-2 border-white bg-transparent py-1'>
              <div className='h-0.5 w-3 rounded-full bg-white' />
              <div className='mt-2 h-8 w-full bg-white opacity-20' />
              <div className='mt-auto h-1 w-4 rounded-full bg-white' />
            </div>
          </div>
        )
      default:
        return <div className='h-full w-full bg-gray-200' />
    }
  }

  return <div className='h-[60px] w-full max-w-[120px] overflow-hidden rounded bg-gray-50'>{renderContent()}</div>
}

export default ThemePreview
