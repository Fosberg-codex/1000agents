'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../components/nav';
import { useRouter } from 'next/navigation';

type Dataset = {
  _id?: string;
  name?: string;
  description?: string;
  submitterName?: string;
  submitterURL?: string;
  link?: string;
  logo?: string;
  logoFileName?: string;
  tags?: string[];
  reference?: string;
  createdAt?: string;
  updatedAt?: string|any;
}

async function getDataset(id: string): Promise<Dataset | null> {
  try {
    const res = await fetch(`/api/agent/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data: Dataset = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch dataset:', error);
    return null;
  }
}

interface IdDashProps {
  id: string;
  initialDataset: Dataset | null;
}

export default function IdDash({ id, initialDataset }: IdDashProps) {
  const [dataset, setDataset] = useState<Dataset | null>(initialDataset);
  const [loading, setLoading] = useState(!initialDataset);
  const [error, setError] = useState('');

  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      if (!dataset) {
        const data = await getDataset(id);
        if (!data) {
          setError("Sorry, we couldn't find the dataset you're looking for.");
        } else {
          setDataset(data);
        }
        setLoading(false);
      }
    }

    fetchData();
  }, [id, dataset]);

  if (loading) {
    return (
      <>
        <Nav />
        <div className='flex pt-24 flex-col gap-2 justify-center items-center'>
          <div className="w-16 h-16 border-t-4 border-green border-solid rounded-full animate-spin"></div>
          <div>Please wait...</div>
        </div>
      </>
    );
  }

  if (error || !dataset) {
    return (
      <>
        <Nav />
        <div className='pt-36 flex justify-center text-bold text-2xl text-red-700'>
          {error || 'Error while loading data'}
          <br />
          please refresh the page
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className='flex text-textcolor1 justify-center bg-black min-h-screen px-4 sm:px-6 md:px-8'>
        <div className='flex flex-col justify-center gap-2 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 mt-24 mb-8'>
          <div className='flex-start'>
            <Image
              src={dataset.logo || ''}
              alt={dataset.name || ''}
              width={75}
              height={75}
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
            <div className='text-2xl sm:text-3xl font-bold'>{dataset.name}</div>
            {dataset.link && (
              <Link href={dataset.link} passHref>
                <div className='px-4 sm:px-6 py-1 bg-textcolor1 rounded-md text-black text-sm sm:text-base'>Visit</div>
              </Link>
            )}
          </div>
          {dataset.reference && (
            <Link href={dataset.reference} passHref>
              <div className='underline text-sm sm:text-base'>Check resources</div>
            </Link>
          )}
          <div className='border-t-1 border-x-textcolor1/50 text-sm sm:text-base'>
            {dataset.description}
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center text-wrap'>
            <div className='flex flex-wrap gap-2'>
                {dataset.tags && 
                   dataset.tags.map((data) => ( 
                     <div className='px-2 py-1 bg-creams border border-gray-500 rounded-md mt-2 hover:bg-green-500 hover:text-black text-xs sm:text-sm' key={data}> 
                       {data} 
                     </div> 
                   ))} 
            </div>
            <div onClick={()=>{router.push(`/${dataset.submitterURL}`)}} className='cursor-pointer hover:text-green-700 underline mt-4 sm:mt-0 text-sm sm:text-base'>
              Submitted by: {dataset.submitterName}
            </div>
          </div>
          <div className='text-gray-400 text-sm sm:text-base'><span>Last updated:</span> {new Date(dataset.updatedAt).toLocaleDateString('en-GB')}</div>
        </div>
      </div>
    </>
  );
}