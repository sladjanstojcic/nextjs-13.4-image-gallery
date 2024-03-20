import { UnsplashImage } from '@/models/unsplash-image';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Alert } from '@/components/bootstrap';

export const metadata: Metadata = {
    title: 'Static Fetching - NextJS 13.4 Image Gallery',
};

const PageStatic = async () => {
    const response = await fetch(
        'https://api.unsplash.com/photos/random?client_id=' +
            process.env.UNSPLASH_ACCESS_KEY
    );

    const image: UnsplashImage = await response.json();

    const width = Math.min(image.width, 500);
    const height = (width / image.width) * image.height;

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert >
                This page{' '}
                <strong>fetches and cacges data at build time.</strong> Even
                though the Unsplash API always returns a new image, we see the
                same image after refreshing the page until we compile the
                project again.
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

export default PageStatic;
