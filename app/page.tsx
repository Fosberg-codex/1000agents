import { Metadata } from 'next'
import Main from './components/main'
//export const //runtime = "edge"; 

type SearchParams = {
  name?: string | string[]
  tags?: string | string[]
}

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> => {
  const { name, tags} = searchParams;

  let title = 'Agentshive | Home';
  let description = 'Explore a galaxy of AI Agents';

  if (name || tags) {
    const parts = [];
    if (name) parts.push(`Title: ${Array.isArray(name) ? name.join(', ') : name}`);
    if (tags) parts.push(`Category: ${Array.isArray(tags) ? tags.join(', ') : tags}`);
    
    title = `Search Results - ${parts.join(', ')}`;
    description = `Explore ${parts.join(', ')} in Agent Galaxy`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://yourdomain.com/dash?${new URLSearchParams(searchParams as Record<string, string>).toString()}`,
      images: [
        {
          url: 'https://yourdomain.com/og-image.jpg', // Replace with your actual Open Graph image URL
          width: 1200,
          height: 630,
          alt: 'Data Room Open Graph Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://yourdomain.com/og-image.jpg'], // Replace with your actual Twitter card image URL
    },
  }
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <Main initialSearchParams={searchParams} />
}