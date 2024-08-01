'use client'
import React, { useState, useEffect } from 'react'
import Nav from '@/app/components/nav'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { Plus, MailPlus } from 'lucide-react'

type Agent = {
    _id: string
    name: string
        description: string
        submitterName: string
        submitterURL: string
        link: string
        logo: string
        logoFileName: string
        tags: string
        reference: string
    updatedAt?: string | any;
  }

type SearchParams = {
    search ?: string | string[]
  tags?: string | string[]
}

const Main = ({ initialSearchParams }: { initialSearchParams: SearchParams }) => {

  const [agents, setAgents]  = useState<Agent[]>([])
  const [loading, setLoading] = useState(false)
  const [showcat, setShowcat] = useState(false)
  const [data, setData] = useState<any[]>([])
  const searchParams = useSearchParams();

  const router = useRouter()

  useEffect(() => {
    
    fetchAgents();

    //cokies
    
}, [searchParams,]);

const fetchAgents = async () => {
  try {
    setLoading(true);
    const queryString = searchParams.toString();
    const response = await fetch(`/api/agent?${queryString}`, { cache: 'no-cache' });
    const data: Agent[] = await response.json();
    setAgents(data);
  } catch (error) {
    console.error("Error fetching datasets:", error);
  } finally {
    setLoading(false);
  }
};

const updateQueryParams = (updatedParams: Partial<{ search : string; tags: string[]; }>) => {
  const newSearchParams = new URLSearchParams(searchParams.toString());

  Object.entries(updatedParams).forEach(([key, value]) => {
    if (value === undefined || (Array.isArray(value) && value.length === 0)) {
      newSearchParams.delete(key);
    } else if (Array.isArray(value)) {
      newSearchParams.set(key, value.join(','));
    } else {
      newSearchParams.set(key, value);
    }
  });

  router.push(`/?${newSearchParams.toString()}`);
};

const handleInputChange = (e:any, key: 'tags') => {
  const { value, checked } = e.target;
  const currentValues = searchParams.get(key)?.split(',').filter(Boolean) || [];
  const newValues = checked ? [...currentValues, value] : currentValues.filter((v) => v !== value);
  updateQueryParams({ [key]: newValues });
};

const handleNameSearch = (e: any) => {
  const search = e.target.value;
  updateQueryParams({ search: search || undefined });
};

  return (
    <>
      <Nav />
      <div className='flex w-full bg-black text-white min-h-screen '>
        <div className='w-2/12 flex py-2 flex-col px-8 gap-4 border-r border-gray-500 pt-36'>
        <div className='text-textcolor1'>Categories</div>
        {['SEO', 'Writing', 'Web scraping', 'Programming', 'RAG'].map((tag) => (
            <label key={tag} className="whitespace-nowrap text-base rounded-md border border-gray-600 px-2 py-1 ">
              <input
                type='checkbox'
                value={tag}
                checked={searchParams.get('tags')?.split(',').includes(tag) || false}
                onChange={(e) => handleInputChange(e, 'tags')}
                className='mr-1'
              />
              {tag}
            </label>
          ))}
        </div>
        <div className='w-5/6 px-8'>
          <div className='flex gap-2 flex-col justify-center text-textcolor1 mt-32'>
            <div className=' text-4xl font-bold mb-2'>
              An exclusive list of the 1000s of AI agents.
            </div>
            <div className='mb-3'>Carefully vetted and maintained by humans.</div>
            <div className='flex gap-4 items-center mb-6'>
              <div className='flex gap-1 items-center rounded-full bg-textcolor1 text-black px-2 py-1'>
                <div>
                  <Plus />
                </div>
                <div>Submit</div>
              </div>
              <div className='flex gap-1 items-center rounded-full bg-textcolor1 text-black px-2 py-1'>
                <div>
                  <MailPlus />
                </div>
                <div>Subscribe</div>
              </div>
            </div>
            {showcat? <>
            <div onClick={()=>setShowcat(false)} className='underline'>
            Hide category
            </div>
            </>: <>
            <div onClick={()=>setShowcat(true)} className='underline'>
            Show category
            </div>
            </>}
            {showcat?<>
            <div className='flex gap-2'>
            
            {['SEO', 'Writing', 'Web scraping', 'Programming', 'RAG'].map((tag) => (
            <label key={tag} className="whitespace-nowrap text-base rounded-md border border-gray-600 px-2 py-1 ">
              <input
                type='checkbox'
                value={tag}
                checked={searchParams.get('tags')?.split(',').includes(tag) || false}
                onChange={(e) => handleInputChange(e, 'tags')}
                className='mr-1'
              />
              {tag}
            </label>
          ))}
            </div>
            </>:
            <>
            <div></div>
            </>
            
            }
            
            <div
            
              className='p-2 mt-2 lg:mt-4 md:mt-4 border border-green rounded-full w-9/12'
            >
              <input
                type='text'
                placeholder='Search agents'
                value={searchParams.get('search') || ''}
                onChange={handleNameSearch}
                className='focus:outline-none focus:border-transparent text-lg w-full text-white bg-black'
              />
            </div>
             
             {/* Rendering */}
             <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-6 bg-black'>
      {loading ? (
      <div className='flex justify-center mt-12'>
      <div className="w-12 h-14 border-t-4 border-green border-solid p-2 border-textcolor1 rounded-full animate-spin">
      <Image
      src='/Bot (2).png'
      alt='Youtube video'
      width={55}
      height={55}
      />
      </div>
      </div>
      ) : (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-4'>
      { agents && agents.map((agent: any) => (
      <div

      key={agent._id}
      className=' rounded-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 hover:border-textcolor2/60'
      onClick = {() => router.push(`/agent/${agent._id}`)}
      >
      <div>
        <div className='flex gap-2 items-center'>

            <div>
            <Image
                  src={agent.logo}
                  alt= {agent.name}
                  width={45}
                  height={45}
                />
            </div>
        <div className='text-lg font-semibold mb-2 line-clamp-1'>{agent.name}</div>
        </div>
      
      <p className='text-sm text-textcolor1 mb-4 line-clamp-2'>{agent.description}</p>
      </div>
      <div className='flex justify-between items-center'>
      <span className='bg-orange-600 text-white text-xs font-medium rounded-md px-2 py-1'>
      {agent.website}
      </span>
      <span className='text-sm text-gray-500'>
      Submitter: {agent.submitterName}
      </span>
      </div>
      </div>
      ))}
      </div>
      )}
      </div>

          </div>
        </div>
      </div>
      
    </>
  )
}

export default Main
