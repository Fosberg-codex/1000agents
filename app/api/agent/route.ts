import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb'
import Agent from "@/app/models/agents"
import { uploadFileToBlob } from '@/lib/azureBlob';


interface QueryParams {
    search?: string;
    tags?:string[];
  }
  
// GET handler for fetching all agents
export async function GET(request:any) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);

    const queryParams: QueryParams = {};
    const search = searchParams.get('search');
    const tags = searchParams.get('tags')?.split(',');

    if (search) {
        queryParams.search = search;
      }
    
    if (tags && tags.length>0) {
        queryParams.tags = tags;
      }


      const filter: any = {};

      if (queryParams.search) {
        filter.$or = [
          { name: { $regex: queryParams.search, $options: 'i' } },
          { description: { $regex: queryParams.search, $options: 'i' } },
          { submitterName: { $regex: queryParams.search, $options: 'i' } },
          { tags: { $in: [new RegExp(queryParams.search, 'i')] } },
          { reference: { $regex: queryParams.search, $options: 'i' } },
        ];
      }

      if (queryParams.tags && queryParams.tags.length > 0) {
        filter.tags = { $all: queryParams.tags };
      }

      console.log('Filter:', JSON.stringify(filter, null, 2))

    const agents = await Agent.find(filter).exec();

    console.log('Agents found:', agents.length);

    return NextResponse.json(agents);
  } catch (error:any) {
    console.error('Error in GET /api/agents:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching agents', error: error.message },
      { status: 500 }
    );
  }
}


// POST handler for creating a new agent
export async function POST(request: any) {
    try {
      await connectMongoDB();
  
      const formData = await request.formData();
      const name = formData.get('name');
      const description = formData.get('description');
      const submitterName = formData.get('submitterName');
      const submitterURL = formData.get('submitterURL');
      const link = formData.get('link');
      const tags = (formData.get('tags') as string).split(',').map(name => name.trim());// Parse tags as JSON
      const reference = formData.get('reference');
      const logo = formData.get('logo');
  
      if (!name || !description || !link || !logo || !tags || tags.length === 0) {
        return NextResponse.json(
          { success: false, message: 'Missing required fields' },
          { status: 400 }
        );
      }
  
      let logoUrl, logoBase64, fileName;
      if (logo instanceof Blob) {
        const buffer = Buffer.from(await logo.arrayBuffer());
        fileName = `${Date.now()}-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
        logoUrl = await uploadFileToBlob(buffer, fileName);
        logoBase64 = buffer.toString('base64');

      } else {
        return NextResponse.json(
          { success: false, message: 'Invalid logo file' },
          { status: 400 }
        );
      }
  
      const agent = await Agent.create({
        name,
        description,
        submitterName,
        submitterURL,
        link,
        logo: logoUrl,
        logoFileName: fileName,
        tags,
        reference
      });
  
      return NextResponse.json({
        success: true,
        data: {
          ...agent.toObject(),
          logoBase64,
        }
      }, { status: 201 });
    } catch (error: any) {
      console.error('Error in POST /api/agents:', error);
      return NextResponse.json(
        { success: false, message: 'Error creating agent', error: error.message },
        { status: 500 }
      );
    }
  }
