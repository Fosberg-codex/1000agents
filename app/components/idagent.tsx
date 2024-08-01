'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X, FolderPlus, Router } from 'lucide-react'
import Link from 'next/link'
import Nav from '../components/nav'
//export const //runtime = "edge";

interface Agent {
  _id: string
  name: string
  description: string
  submitterName: string
  submitterURL: string
  link: string
  logo: string
  logoFileName: string
  tags: string[]
  reference: string
  updatedAt?: string | any
}

async function getAgent (id: string): Promise<Agent | null> {
  try {
    const res = await fetch(`/api/agent/${id}`, { cache: 'no-cache' })
    if (!res.ok) return null
    const data: Agent = await res.json()
    return data
  } catch (error) {
    console.error('Failed to fetch agent:', error)
    return null
  }
}

interface IdAgentProps {
  id: string
  initialAgent: Agent | any
}

export default function IdAgent ({ id, initialAgent }: IdAgentProps) {
  const [agent, setAgent] = useState<Agent | null>(initialAgent)
  const [loading, setLoading] = useState(!initialAgent)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData () {
      if (!agent) {
        const data = await getAgent(id)
        if (!data) {
          setError('Sorry, we couldnt find the AI agnet youre looking for.')
        } else {
          setAgent(data)
        }
        setLoading(false)
      }
    }

    fetchData()
  }, [id, agent])

  const viewDownload = () => {
    if (agent) {
      window.open(`${agent.link}`, '_blank')
    }
  }

  const title = 'Go back'
  const link = '/dash'

  return (
    <>
      <Nav />

      <div className='flex justify-end mt-16'>
        <div className='flex self-end mt-8 lg:mt-12 md:mt-12 lg:mr-8 md:mr-8 mr-4 text-green underline rounded-md '>
          <div className='text-sm lg:text-base md:text-base cursor-pointer'>
            <Link href='/dash/form'>Agent</Link>
          </div>
        </div>
      </div>

      {loading ? (
        <>
          <div className='flex pt-36 flex-col gap-2 justify-center items-center'>
            <div className='w-16 h-16 border-t-4 border-green border-solid rounded-full animate-spin'></div>
            <div>Please wait...</div>
          </div>
        </>
      ) : !agent ? (
        <div className='pt-36 flex justify-center text-bold text-2xl text-red-700'>
          Error while loading data
          <br />
          please refresh the page
        </div>
      ) : (
        <div className='pt-8 flex '>
          <div className='flex flex-col gap-2  lg:gap-3 md:gap-3 px-2 md:px-24 lg:px-24'>
            <div className='text-3xl font-bold text-green'>{agent.name}</div>
            <div className='text-greenal text-justify'>{agent.description}</div>
            <div className='flex gap-4'>
              <div className='p-1 text-green text-lg'>
                <span className='font-semibold'>Sector</span> {agent.name}
              </div>
              <div className='p-1 bg-gray-800 rounded-md text-cream'>
                <span className='text-cream'>Country:</span> {agent.name}
              </div>
            </div>
            <div>
              <span className='font-semibold'>File Type:</span> {agent.name}
            </div>
            <div className='flex gap-2 items-center justify-start'>
              <div className='font-semibold text-lg'>Data format</div>
              {agent.tags &&
                agent.tags.map(data => (
                  <div
                    className='px-2 py-1 bg-creams border border-gray-500 rounded-md mt-2'
                    key={data}
                  >
                    {data}
                  </div>
                ))}
            </div>
            <div
              onClick={viewDownload}
              className='self-start text-cream bg-blue-800 hover:bg-blue-800/60 cursor-pointer px-2 py-1 mt-2 mb-4 lg:mb-1 md:mb-1 rounded-md'
            >
              view and download
            </div>
            <div className='lg:hidden md:hiden font-semibold text-lg'>
              Tags related to data:
            </div>
            <div className='flex flex-row lg:flex-row md:flex-row gap-2 items-center justify-start'>
              <div className='hidden lg:block md:block font-semibold text-lg'>
                Tags related to data:
              </div>
              {agent.tags &&
                agent.tags.map(data => (
                  <div
                    className='px-2 py-1 bg-gray-600 text-cream border border-gray-500 rounded-md lg:mt-2 mtd:mt-2'
                    key={data}
                  >
                    #{data}
                  </div>
                ))}
            </div>
            <div className='flex gap-4 text-lg'>
              <div>
                <span className='font-bold'>Last updated:</span>{' '}
                {new Date(agent.updatedAt).toLocaleDateString('en-GB')}
              </div>
              <div>
                <span className='font-bold'>Source:</span> {agent.submitterName}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
