type UserProfileProps = {
  username?: string;
  levelLabel?: string;
};

export const UserProfile = ({
  username = "Username",
  levelLabel = "User Level: 5",
}: UserProfileProps) => {
  return (
    <div className="flex flex-row justify-start items-center gap-x-4">
      <div className="rounded-full bg-main w-16 h-16" />
      <div className="flex flex-col">
        <div className="text-xl font-bold">{username}</div>
        <div className="body text-grey-main">{levelLabel}</div>
      </div>
    </div>
  );
};
