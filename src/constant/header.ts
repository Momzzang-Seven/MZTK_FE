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
    path: "/community/free/postId",
  },
  {
    label: "새 게시물",
    path: "/community/free/new",
  },
];

export const adminHeaderByPath: HeaderByPathType[] = [
  {
    label: "대시보드",
    path: "/admin/dashboard",
  },
  {
    label: "토큰 지급 기록",
    path: "/admin/token-logs",
  },
];
