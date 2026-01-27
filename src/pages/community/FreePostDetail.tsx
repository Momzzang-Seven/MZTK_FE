import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SimpleHeader } from "@components/layout";
import { CommentItem, CommentInput } from "@components/community";
import type { Comment } from "@types";

const FreePostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("/data/comments.json")
      .then((res) => res.json())
      .then(setComments)
      .catch(console.error);
  }, []);

  return (
    <div>
      <SimpleHeader />

      <section>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </section>

      <div>
        <CommentInput postId={Number(postId)} />
      </div>
    </div>
  );
};

export default FreePostDetail;
