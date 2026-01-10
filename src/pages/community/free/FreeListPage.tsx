import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FreePostCard } from "@components/community";
import { CommonButton } from "@components/common";
import type { FreePost } from "@types";

const FreeListPage = () => {
  const [posts, setPosts] = useState<FreePost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/freePosts.json")
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  const handleCreatePost = () => {
    navigate("/community/free/new");
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <FreePostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="fixed bottom-[90px] flex w-full max-w-[420px] flex-row items-end justify-end px-4">
        <CommonButton
          onClick={handleCreatePost}
          width="w-[60px]"
          padding="p-0"
          shadow={true}
          className="h-[60px] !rounded-full"
          label="十"
        />
      </div>
    </div>
  );
};

export default FreeListPage;
