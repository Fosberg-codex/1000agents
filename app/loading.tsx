import Image from "next/image";

export default function Loading() {
    return(
    <> 
       <div className='flex justify-center bg-black min-h-screen text-textcolor1'>
      {' '}
      <div className='p-5 flex justify-center items-center m-40'>
        <div className='flex flex-col justify-center items-center'>
        <div className="w-12 h-12 border-t-4 border-green border-solid p-2 border-textcolor1 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
    </>)
    
  }

  