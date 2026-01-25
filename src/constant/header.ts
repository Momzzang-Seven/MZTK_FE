type HeaderByPathType = {
  label: string;
  path: string;
};

export const headerByPath: HeaderByPathType[] = [
  {
    label: "위치 인증하기",
    path: "/verify",
  },
  {
    label: "운동 인증하기",
    path: "/verify/health",
  },
  {
    label: "댓글",
    path: "/community/f/postId",
  },
  {
    label: "새 게시물",
    path: "/community/f/new",
  },
  {
    label: "새 질문",
    path: "/community/q/new",
  },
];
