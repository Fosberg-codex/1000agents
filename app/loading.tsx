import Image from "next/image";

export default function Loading() {
    return(
    <> 
        <div className='flex justify-center items-center min-h-screen text-textcolor1 bg-black sm:bg-transparent'>
      <div className='p-4 sm:p-6 md:p-8 lg:p-10 flex justify-center items-center w-full h-full sm:m-8 md:m-16 lg:m-24'>
        <div className='flex flex-col justify-center items-center'>
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 border-t-4 border-green border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl">Loading...</p>
        </div>
      </div>
    </div>
    </>)
    
  }

  