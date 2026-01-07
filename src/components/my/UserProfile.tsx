export const UserProfile = () => {
  return (
    <div className="flex flex-row justify-start items-center gap-x-4">
      <div className="rounded-full bg-main w-16 h-16" />
      <div className="flex flex-col">
        <div className="text-xl font-bold">Username</div>
        <div className="body text-grey-main">User Level: 5</div>
      </div>
    </div>
  );
};
