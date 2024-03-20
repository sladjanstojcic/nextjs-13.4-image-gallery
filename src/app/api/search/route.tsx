import { UnsplashSearchResponse } from '@/models/unsplash-image';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, res: Response) => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json(
            { error: 'No query provided' },
            { status: 400 }
        );
    }

    const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&count=5`,
        {
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            },
        }
    );

    const { results }: UnsplashSearchResponse = await response.json();

    return NextResponse.json(results);
};

export const POST = (request: Request, res: Response) => {};

export const PUT = (request: Request, res: Response) => {};

export const DELETE = (request: Request, res: Response) => {};
