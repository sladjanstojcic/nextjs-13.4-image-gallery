import { Metadata } from 'next';
import SearchPage from './SearchPage';

export const metadata: Metadata = {
    title: 'Search - NextJS 13.4 Image Gallery',
    description: 'Page description',
    keywords: 'Page, description, keywords',
};

const Page = () => {
    return <SearchPage />;
};

export default Page;
