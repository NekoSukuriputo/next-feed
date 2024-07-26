import { Suspense } from 'react';

import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

// export const metadata = {
//   title: 'NextPosts',
//   decription: 'Browse and share amazing posts.',  
// } static meta data

export async function generateMetadata() {
  const posts = await getPosts();
  const numberOfPosts = posts.length;
  return {
    title: `Browse all our ${numberOfPosts} posts`,
    description: 'Browse and share amazing posts.',
  };
} // dynamic meta data

async function LatestPosts() {
  const latestPosts = await getPosts(2);
  return <Posts posts={latestPosts} />;
}

export default async function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here's what you might've missed.</p>
      <section id="latest-posts">
      <Suspense fallback={<p>Loading recent posts...</p>}>
        <LatestPosts />
      </Suspense>
      </section>
    </>
  );
}
