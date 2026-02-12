export type PostType = "free" | "question";

export type ActionModalType =
  | "MY"
  | "OTHERS"
  | "DELETE_CONFIRM"
  | "REPORT"
  | "SELECT_CONFIRM"
  | "EDIT_COMMENT"
  | null;

export interface Writer {
  userId: number;
  nickname: string;
  profileImage?: string;
}

export interface Post {
  postId: number;
  type: PostType;
  content: string;
  writer: Writer;
  createdAt: string;
  updatedAt: string;
  imageUrls: string;
  commentCount: number;
  tags: string[];
}

export interface FreePost extends Post {
  isLiked: boolean;
  likeCount: number;
}

export interface QuestionPost extends Post {
  title: string;
  question: {
    isSolved: boolean;
    reward: number;
  };
}

export interface Comment extends Post {
  replyCount: number;
}

export interface AnswerPost extends Post {
  isAccepted: boolean;
}
