import { useEffect, useState } from "react";
import { SimpleHeader } from "@components/layout";
import { CommentItem, CommentInputBar } from "@components/community";

import type { Comment } from "@types";

const FreePostDetail = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("/data/freeComments.json")
      .then((res) => res.json())
      .then(setComments)
      .catch(console.error);
  }, []);

  return (
    <div>
      <SimpleHeader />

      <section>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isReply={Boolean(comment.parentId)}
          />
        ))}
      </section>

      <div>
        <CommentInputBar
          onSend={(content) => {
            console.log("보낸 댓글:", content);
          }}
        />
      </div>
    </div>
  );
};

export default FreePostDetail;
