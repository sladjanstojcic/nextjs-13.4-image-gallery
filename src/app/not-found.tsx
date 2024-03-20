import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

const NotFoundPage = async () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link href="/">Go back to home</Link>
        </div>
    );
};

export default NotFoundPage;
