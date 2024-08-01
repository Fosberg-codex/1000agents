import { Metadata } from 'next'
import IdAgent from '@/app/components/idagent'

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
  updatedAt?: string | any
}

async function getAgent (id: string): Promise<Agent | null> {
  try {
    console.log(` Fetching metadata on agent  with ID: ${id}`)
    const res = await fetch(`http://localhost:3000/api/agent/${id}`, {
      cache: 'no-store'
    })
    if (!res.ok) return null
    const data: Agent = await res.json()
    return data
  } catch (error) {
    console.error('Failed to fetch Agents:', error)
    return null
  }
}

export const generateMetadata = async ({
  params
}: {
  params: { id: string }
}): Promise<Metadata> => {
  const agent = await getAgent(params.id)
  if (!agent || !agent.name) return { title: 'Agent Not Found' }
  const title = `${agent.name} - Agent Details`
  const description = agent.description || 'detail information about the agent'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://africabase.vercel.app/dash/${params.id}`,
      images: [
        {
          url: 'https://yourdomain.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Agent Open Graph Image'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://yourdomain.com/og-image.jpg']
    }
  }
}

export default async function Page ({ params }: { params: { id: string } }) {
  const Agent = await getAgent(params.id)
  return <IdAgent id={params.id} initialAgent={Agent} />
}
