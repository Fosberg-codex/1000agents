import Image from 'next/image'
import Link from 'next/link'

export default function Notfound () {
  return (
    <div className='flex justify-center bg-black min-h-screen text-textcolor1'>
      {' '}
      <div className='p-4 sm:p-6 md:p-8 lg:p-10 flex justify-center items-center min-h-screen'>
      <div className='flex flex-col justify-center items-center text-center max-w-sm'>
        <div className='mb-4 sm:mb-6'>
          <Image
            src='/Bot (2).png'
            alt='Bot icon'
            width={55}
            height={55}
            className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20'
          />
        </div>
        <div className='mb-4 sm:mb-6 text-sm sm:text-base md:text-lg lg:text-xl'>
          This page is not ready
        </div>
        <Link href='/'>
          <div className='text-center rounded-md hover:bg-textcolor2 hover:text-black border border-green px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 cursor-pointer hover:bg-creams transition-colors duration-300 text-sm sm:text-base md:text-lg lg:text-xl'>
            Go back Home
          </div>
        </Link>
      </div>
    </div>
    </div>
  )
}
