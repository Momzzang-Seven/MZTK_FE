export type BoardType = "free" | "question";

export interface Author {
  userId: number;
  nickname: string;
  profileImage?: string;
}

export interface Post {
  id: number;
  author: Author;
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
  isSolved: boolean;
  rewardToken: number;
  title: string;
  tags: string[];
  answers: number;
}

export interface AnswerPost extends Post {
  comments: number;
  isSelected: boolean;
}
