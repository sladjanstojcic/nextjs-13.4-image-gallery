import React from 'react';
import { Metadata } from 'next';
import { UnsplashImage } from '@/models/unsplash-image';
import { Alert } from '@/components/bootstrap';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Incemental Static Regeneration - NextJS 13.4 Image Gallery',
};

export const revalidate = 15;

const PageDynamic = async () => {
    const response = await fetch(
        'https://api.unsplash.com/photos/random?client_id=' +
            process.env.UNSPLASH_ACCESS_KEY,
        {
            next: {
                revalidate: 15,
            },
        }
    );
    const image: UnsplashImage = await response.json();

    const width = Math.min(image.width, 500);
    const height = (width / image.width) * image.height;

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page uses <strong>incremental static regeneration</strong>.
                A new image is fetched every 15 seconds (after refreshing the
                page) and then served from the cache for that duration.
            </Alert>
            <Image
                src={image.urls.raw}
                width={width}
                height={height}
                alt={image.description || 'Image'}
                className="rounded shadow mw-100 h-100 mb-3"
            />
            by{' '}
            <Link href={'/users/' + image.user.username}>
                {image.user.username}
            </Link>
        </div>
    );
};

export default PageDynamic;
