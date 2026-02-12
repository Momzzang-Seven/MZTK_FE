export type PostType = "free" | "question";

export type ActionModalType =
  | "MY"
  | "OTHERS"
  | "DELETE_CONFIRM"
  | "REPORT"
  | "SELECT_CONFIRM"
  | "EDIT_COMMENT"
  | null;

export interface Author {
  userId: number;
  nickname: string;
  profileImage?: string;
}

export interface Post {
  id: number;
  writer: Author;
  createdAt: string;
  postImage?: string;
  description: string;
}

export interface FreePost extends Post {
  likes: number;
  comments: number;
}

export interface Comment extends Post {
  replyCount: number;
}

export interface QuestionPost extends Post {
  question: {
    isSolved: boolean;
    reward: number;
  };
  isSolved: boolean;
  reward: number;
  title: string;
  tags: string[];
  answers: number;
}

export interface AnswerPost extends Post {
  comments: number;
  isSelected: boolean;
}
