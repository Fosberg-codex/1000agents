
"use client"
import React, { useState } from 'react'
import Nav from '../components/nav';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

const Page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/agsubmit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert('Agent submitted successfully');
        // router.push(`/modelform/${data._id}`);
        router.refresh()
      } else {
        alert('Error in your sumission please try again');
        console.error('Form creation failed');
      }
    } catch (error) {
      console.error('Agent submitting form:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <div className='min-h-screen bg-black '>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-24   text-textcolor1 min-h-screen'>
        {/* <div className='flex flex-wrap gap-2 justify-start items-center mb-6'> */}
          {/* <button className='flex justify-center px-3 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors'>Tabular data</button> */}
          {/* <button className='flex justify-center px-3 py-2 border border-black rounded-md hover:bg-gray-100 transition-colors'><Link href="/waitlist">Image data</Link></button> */}
          {/* <button className='flex justify-center px-3 py-2 border border-black rounded-md hover:bg-gray-100 transition-colors'><Link href="/waitlist">Generative AI</Link> </button> */}
        {/* </div> */}
        <div className='w-full flex flex-col justify-center items-center gap-4'>
          <h1 className='text-3xl sm:text-4xl font-bold text-center'>Submit your Agent(s)</h1>
          <div className='text-sm text-green-200'>We will add your powerful agents to our page after review.</div>
          <form onSubmit={handleSubmit} className='w-full max-w-2xl space-y-6 mb-8'>
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Name:</label>
              <input type="text" id="name" name="name" required className="w-full p-2 border border-gray-300 bg-black  rounded-md focus:ring-2 focus:ring-textcolor1 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="description" className="block mb-1 font-medium">Description:</label>
              <textarea id="description" name="description" maxLength={200} className="w-full p-2 border bg-black border-gray-300 rounded-md focus:ring-2 focus:ring-textcolor1 focus:border-transparent h-32 resize-none"></textarea>
            </div>
            <div>
              <label htmlFor="logo" className="block mb-1 font-medium">Upload Agent logo</label>
              <input
                type="file"
                id="logo"
                name="logo"
                // accept=".onnx"
                className="w-full p-2 border border-gray-300 rounded-md bg-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-200 file:text-black hover:file:bg-textcolor1"
              />
            </div>
            <div>
              <label htmlFor="link" className="block mb-1 font-medium">Product Url:</label>
              <input type="text" id="link" name="link" required className="w-full p-2 border border-gray-300 bg-black  rounded-md focus:ring-2 focus:ring-textcolor1 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="submitterName" className="block mb-1 font-medium">Submitter Name</label>
              <input type="text" id="submitterName" name="submitterName" required className="w-full p-2 border border-gray-300 bg-black  rounded-md focus:ring-2 focus:ring-textcolor1 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="submitterURL" className="block mb-1 font-medium">Submitter Url</label>
              <input type="text" id="submitterURL" name="submitterURL" required className="w-full p-2 border border-gray-300 bg-black  rounded-md focus:ring-2 focus:ring-textcolor1 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="tags" className="block mb-1 font-medium">Tags (comma-separated):</label>
              <input type="text" id="tags" name="tags" required className="w-full p-2 border border-gray-300 bg-black  rounded-md focus:ring-2 focus:ring-textcolor1 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="reference" className="block mb-1 font-medium">Link to relevant resource</label>
              <input type="text" id="reference" name="reference" required className="w-full p-2 border border-gray-300 bg-black  rounded-md focus:ring-2 focus:ring-textcolor1 focus:border-transparent" />
            </div>
            
            {/* <div> */}
              {/* <label htmlFor="framework" className="block mb-1 font-medium">Framework used:</label> */}
              {/* <input type="text" id="framework" name="framework" required className="w-full p-2 border bg-black border-gray-300 rounded-md focus:ring-2 focus:ring-textcolor1 focus:border-transparent" /> */}
            {/* </div> */}
            
            <button 
              type="submit" 
              className="w-full bg-textcolor1 text-black px-4 flex justify-center py-2 mb-4 rounded-md hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-textcolor1 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <div className="w-4 h-4 border-t-4 border-pink-500 border-solid p-2 border-textcolor-1 rounded-full animate-spin"></div>: 'Launch Agent'}
            </button>
          </form>
        </div>
      </div>
      </div>
    </>
  )
}

export default Page