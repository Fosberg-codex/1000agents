import React from 'react'
import Footer from '../components/footer'
import Nav from '../components/nav'
import Link from 'next/link'

const Page = () => {
  return (
    <>

      <Nav />
      <div className='bg-black flex'>
      <div className='bg-black text-textcolor1 rounded-lg shadow-md p-6 border border-gray-500 mt-24 mx-4 sm:mx-8 md:mx-12 lg:mx-16'>
        <div className='flex flex-col  gap-6 sm:gap-8 md:gap-10'>
          <div className='flex flex-col gap-2 sm:gap-3'>
            <h2 className='text-lg sm:text-xl md:text-2xl font-bold'>
              Why Agent Galaxy
            </h2>
            <p className='text-sm sm:text-base md:text-md'>
            By 2030, AI agents will be revolutionizing the way we interact with technology. From automating simple tasks to developing Artificial General Intelligence (AGI), the future of AI promises to be both exciting and transformative.
            Whether you're looking for an agent to handle routine tasks, provide advanced analytical insights, or collaborate on complex projects, AgentGalaxy is designed to simplify your search. We curate a diverse range of AI agents, each equipped to tackle various challenges and deliver exceptional results.
             And this platform aim to assist coporate workers
              researchers, IT professionals and businesses find more agents.
            </p>
  
          </div>
          <div className='flex flex-col gap-2 sm:gap-3'>
            <h2 className='text-lg sm:text-xl md:text-2xl font-bold'>
              Who is behind this
            </h2>
            <div className='text-sm sm:text-base md:text-md'>
              <p className='mb-2 sm:mb-3'>
                I am Fosberg, and I built this. I am into software engineering,
                machine learning engineering, and AI engineering. I am also a
                recent college graduate from KNUST Ghana. This should have
                existed, and I am now building it. Currently, it is maintained
                by me and my college classmate Yakubuku Seidu, a professional
                software engineer.
              </p>
              <Link
                href='mailto:fosberg1addai@gmail.com'
                className='text-red-500 hover:text-red-600 transition-colors'
              >
                Email Fosberg
              </Link>
            </div>
          </div>

          <div className='flex flex-col gap-2 sm:gap-3'>
            <h2 className='text-lg sm:text-xl md:text-2xl font-bold'>
              Is my model safe?
            </h2>
            <div className='text-sm sm:text-base md:text-md'>
              <p className='mb-2 sm:mb-3'>
                Yes your data is safe after submission. It stored in MongoDB database with azure clustor. Sincerely it is not reviewed for anything. We are building
                a community to help scientists and developers and we respect thier contributions to open and close ML/AI.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Page
