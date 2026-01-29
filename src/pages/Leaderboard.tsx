import { LeaderboardItem } from "@components/leaderboard";
import { leaderboardData } from "@mocks/leaderboard";

const Leaderboard = () => {
  const [me, ...others] = leaderboardData;

  const topTen = others.filter((user) => user.rank <= 10);
  return (
    <div className="flex flex-col">
      <ul className="flex flex-col">
        {/* 내 랭킹 (항상 최상단) */}
        <LeaderboardItem user={me} isMe />

        {/* 1~10위 */}
        {topTen.map((user) => (
          <LeaderboardItem key={user.rank} user={user} isMe={false} />
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
