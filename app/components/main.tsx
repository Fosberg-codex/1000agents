'use client'
import React, { useState, useEffect } from 'react'
import Nav from '@/app/components/nav'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { Plus, MailPlus, Menu } from 'lucide-react'

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
    const [agents, setAgents] = useState<Agent[]>([])
    const [loading, setLoading] = useState(false)
    const [showcat, setShowcat] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const searchParams = useSearchParams();
    const router = useRouter()

    useEffect(() => {
        fetchAgents();
    }, [searchParams]);

    const fetchAgents = async () => {
        try {
            setLoading(true);
            const queryString = searchParams.toString();
            const finalQueryString = searchParams.get('tags') === 'All' 
                ? queryString.replace(/&?tags=All/, '')
                : queryString;
            const response = await fetch(`/api/agent?${finalQueryString}`, { cache: 'no-cache' });
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'tags') => {
        const { value, checked } = e.target;
        let newValues: string[];

        if (value === 'All' && checked) {
            newValues = ['All'];
        } else if (value === 'All' && !checked) {
            newValues = [];
        } else {
            const currentValues = searchParams.get(key)?.split(',').filter(Boolean) || [];
            if (currentValues.includes('All')) {
                newValues = checked ? [value] : [];
            } else {
                newValues = checked
                    ? [...currentValues, value]
                    : currentValues.filter((v) => v !== value);
            }
        }

        updateQueryParams({ [key]: newValues });
    };

    const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        updateQueryParams({ search: search || undefined });
    };

  

    return (
        <>
            <Nav />
            <div className='flex w-full bg-black text-white min-h-screen'>
                {/* Sidebar for large screens */}
                <div className={`fixed left-0 top-0 z-2 w-2/12 h-screen overflow-y-auto flex py-2 flex-col px-8 gap-4 border-r border-gray-500 pt-36 bg-black transition-transform duration-300 ease-in-out transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                    <div className='text-textcolor1'>Categories</div>

                    {['All', 'SEO', 'Writing', 'Web scraping', 'Programming', 'RAG'].map((tag) => (
                        <label
          key={tag}
          className={`
            whitespace-nowrap text-base rounded-md px-2 py-1 cursor-pointer
            transition-colors duration-200 ease-in-out
            ${
              searchParams.get('tags')?.split(',').includes(tag)
                ? 'bg-green-200 text-black'
                : 'bg-transparent text-textcolor1 border border-textcolor1 hover:bg-green-200 hover:text-black'
            }
          `}
        >
          <input
            type="checkbox"
            value={tag}
            checked={searchParams.get('tags')?.split(',').includes(tag) || false}
            onChange={(e) => handleInputChange(e, 'tags')}
            className="absolute opacity-0 w-0 h-0"
          />
          {tag}
        </label>
                    ))}
                </div>

                {/* Main content */}
                <div className='w-full lg:w-10/12 lg:ml-auto px-4 lg:px-12 flex flex-col gap-2 mb-8 mt-24'>
                    <div className='flex gap-2 flex-col text-textcolor1 lg:mt-0 sm:mt-0'>
                        <div className='text-4xl font-bold mb-2'>
                            An exclusive list of 1000s of AI agents.
                        </div>
                        <div className='mb-3'>Carefully vetted and maintained by humans.</div>
                        <div className='flex gap-4 items-center mb-6'>
                            <div onClick={() =>{router.push('/submitagent')}} className='cursor-pointer flex gap-1 items-center rounded-full bg-textcolor1 text-black px-2 py-1'>
                                <div>
                                    <Plus />
                                </div>
                                <div>Submit</div>
                            </div>
                            <div onClick={() =>{router.push('https://codeandlifebyfosberg.beehiiv.com/subscribe')}} className='cursor-pointer flex gap-1 items-center rounded-full bg-textcolor1 text-black px-2 py-1'>
                                <div>
                                    <MailPlus />
                                </div>
                                <div>Subscribe</div>
                            </div>
                        </div>

                        {/* Show category for small and medium screens */}
                        <div className='lg:hidden'>
                            {showcat ? (
                                <>
                                    <div onClick={() => setShowcat(false)} className='underline'>
                                        Hide category
                                    </div>
                                    <div className='flex gap-2 flex-wrap mt-2'>
                                        {['All','SEO', 'Writing', 'Web scraping', 'Programming', 'RAG'].map((tag) => (
                                            <label
                                            key={tag}
                                            className={`
                                              flex items-center justify-center
                                              whitespace-nowrap text-sm sm:text-sm rounded-full
                                              px-3 py-2 sm:px-4 sm:py-2 cursor-pointer
                                              transition-all duration-200 ease-in-out
                                              ${
                                                searchParams.get('tags')?.split(',').includes(tag)
                                                  ? 'bg-green-200 text-black shadow-md'
                                                  : ' bg-transparent text-textcolor1 border border-textcolor1 hover:bg-green-200 hover:text-black'
                                              }
                                              active:scale-95 touch-manipulation
                                            `}
                                          >
                                            <input
                                              type="checkbox"
                                              value={tag}
                                              checked={searchParams.get('tags')?.split(',').includes(tag) || false}
                                              onChange={(e) => handleInputChange(e, 'tags')}
                                              className="absolute opacity-0 w-0 h-0"
                                            />
                                            {tag}
                                          </label>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div onClick={() => setShowcat(true)} className='underline'>
                                    Show category
                                </div>
                            )}
                        </div>

                        <div className='p-2 mt-2 lg:mt-4 md:mt-4 border border-gray-700 rounded-full w-full max-w-3xl'>
                            <input
                                type='text'
                                placeholder='Search agents'
                                value={searchParams.get('search') || ''}
                                onChange={handleNameSearch}
                                className='focus:outline-none focus:border-transparent text-lg w-full text-gray-600 bg-black'
                            />
                        </div>
                        
                        
                    </div>
                    <div className='container mx-auto mt-6 bg-black'>
                            {loading ? (
                                <div className='flex justify-center mt-12'>
                                    <div className="w-12 h-14 border-t-4 border-green border-solid p-2 border-textcolor1 rounded-full animate-spin">
                                        <Image
                                            src='/Bot (2).png'
                                            alt='Youtube video'
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-4'>
                                    {agents && agents.map((agent: Agent) => (
                                        <div
                                            key={agent._id}
                                            className='rounded-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 hover:border-textcolor2/60'
                                            onClick={() => router.push(`/agent/${agent._id}`)}
                                        >
                                            <div>
                                                <div className='flex gap-2 items-center'>
                                                    <div>
                                                        <Image
                                                            src={agent.logo||'Bot (1).png'}
                                                            alt={agent.name}
                                                            width={45}
                                                            height={45}
                                                        />
                                                    </div>
                                                    <div className='text-lg font-semibold mb-2 line-clamp-1'>{agent.name}</div>
                                                </div>
                                                <p className='text-sm text-textcolor1 mb-4 line-clamp-2'>{agent.description}</p>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <span className='text-white-gray-500 text-xs font-medium rounded-md px-2 py-1'>
                                                    {agent.tags[0]}
                                                </span>
                                                <span className='text-sm text-black rounded-md px-2 py-1 bg-textcolor1 hover:bg-green-200'>
                                                    view
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                </div>
                

        
            </div>
        </>
    )
}

export default Main