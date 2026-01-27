export const getStatus = (isSolved: boolean, answers: number) => {
  if (isSolved) return "completed";
  if (answers === 0) return "wating";
  return "answering";
};

export const statusStyleMap: Record<string, { label: string; bg: string }> = {
  wating: { label: "답변대기", bg: "bg-[#F59E0B]" },
  answering: { label: "답변중", bg: "bg-[#9CA3AF]" },
  completed: { label: "채택완료", bg: "bg-[#27DDA1]" },
};
