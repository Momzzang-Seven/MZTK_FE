import { useEffect, useState } from 'react';
import { FreePostCard } from '@components/community';
import type { FreePost } from '@types';

const FreeListPage = () => {
 const [posts, setPosts] = useState<FreePost[]>([]);

  useEffect(() => {
    fetch('/data/freePosts.json')
      .then(res => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {posts.map(post => (
        <FreePostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default FreeListPage;