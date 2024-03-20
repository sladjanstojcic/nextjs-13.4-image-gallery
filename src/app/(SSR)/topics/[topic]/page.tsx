import { UnsplashImage } from '@/models/unsplash-image';
import Image from 'next/image';
import React from 'react';

import styles from './TopicPage.module.css';
import { Alert } from '@/components/bootstrap';

import { Metadata } from 'next';

interface PageProps {
    params: {
        topic: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

// export const dynamicParams = false;

export const generateMetadata = ({
    params: { topic },
}: PageProps): Metadata => {
    return {
        title: `${topic} - NextJS 13.4 Image Gallery`
    };
};

export const generateStaticParams = () => {
    return ['health', 'fitness', 'coding'].map((topic) => ({
        topic,
    }));
};

const Page: React.FC<PageProps> = async ({ params: { topic } }) => {
    const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${topic}&count=4&&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const images: UnsplashImage[] = await response.json();

    return (
        <div>
            <Alert>
                This page uses <strong>generateStaticParams</strong> to render
                and cache static pages at build time, even though the URL has a
                dynamic parameter. Pages that are not included in
                generateStaticParams will be fetched & rendered on first access
                and then cached for subsequent requests (this can be disabled).
            </Alert>
            <h1>{topic}</h1>

            <div>
                {images.map((image, i) => (
                    <Image
                        key={image.urls.raw}
                        src={image.urls.raw}
                        alt={image.description || 'Image'}
                        width={250}
                        height={250}
                        className={styles.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
