export interface FreePost {
  id: number;
  author: {
    userId: number;
    nickname: string;
    profileImage?: string;
  };
  createdAt: string;
  postImage: string;
  likes: number;
  comments: number;
  description: string;
}

export interface FreeComment {
  id: number;
  author: {
    userId: string;
    nickname: string;
    profileImage?: string;
  };
  content: string;
  createdAt: string;
  replyCount: number;
  likes: number;
  parentId?: number; // 대댓글용 (없으면 일반 댓글)
}