type FooterItemType = {
  label: string;
  src: string;
  activeSrc: string;
  path: string;
};

export const footerItem: FooterItemType[] = [
  {
    label: "홈",
    src: "/icon/home.svg",
    activeSrc: "/icon/homeActive.svg",
    path: "/",
  },
  {
    label: "리더보드",
    src: "/icon/leaderboard.svg",
    activeSrc: "/icon/leaderboardActive.svg",
    path: "/leaderboard",
  },
  {
    label: "커뮤니티",
    src: "/icon/community.svg",
    activeSrc: "/icon/communityActive.svg",
    path: "/community",
  },
  // {
  //   label: "마켓",
  //   src: "/icon/market.svg",
  //   activeSrc: "/icon/marketActive.svg",
  //   path: "/market",
  // },
  {
    label: "마이페이지",
    src: "/icon/user.svg",
    activeSrc: "/icon/userActive.svg",
    path: "/my",
  },
];
