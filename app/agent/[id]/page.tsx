import { Metadata } from 'next';
import IdDash from '@/app/components/idagent';

interface Dataset {
        _id: string;
        name?: string;
        description?: string;
        submitterName?: string;
        submitterURL?: string;
        link?: string;
        logo?: string;
        logoFileName?: string;
        tags?: string[];
        reference?: string
        createdAt?: string | any;
        updatedAt?: string | any;
}

async function getDataset(id: string): Promise<Dataset | null> {
  try {
    console.log(` Fetching metadata on dataset with ID: ${id}`)
    const res = await fetch(`https://agentshive.vercel.app/api/agent/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data: Dataset = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch dataset:', error);
    return null;
  }
}

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const dataset = await getDataset(params.id);
  if (!dataset || !dataset.name) return { title: 'Dataset Not Found' };
  const title = `${dataset.name} - Dataset Details`;
  const description = dataset.description || 'Detailed information about the dataset';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://agentshive.vercel.app/agent/${params.id}`,
      images: [
        {
          url: 'https://yourdomain.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Dataset Open Graph Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://yourdomain.com/og-image.jpg'],
    },
  };
};

export default async function Page({ params }: { params: { id: string } }) {
  const dataset = await getDataset(params.id);
  return <IdDash id={params.id} initialDataset={dataset} />;
}