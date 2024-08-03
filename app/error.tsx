'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='text-textcolor1 bg-black min-h-screen flex items-center justify-center'>
    <div className='flex flex-col items-center justify-center gap-6 p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-md'>
      <div className='text-red-700 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold'>
        Oops! Something went wrong.
      </div>
      <button 
        className='px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 transition duration-300 text-sm sm:text-base md:text-lg lg:text-xl'
        onClick={() => reset()}
      >
        Try again
      </button>
      <div className='text-center text-sm sm:text-base md:text-lg lg:text-xl'>
        Or contact <br /> 
        <Link href="mailto:fosberg1addai@gmail.com" className='text-textcolor2 underline hover:text-textcolor2/80 transition duration-300'>
          PlutoFlow Team
        </Link>
      </div>
    </div>
  </div>
  )
}
