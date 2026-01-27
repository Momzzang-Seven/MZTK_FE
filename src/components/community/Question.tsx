import { useNavigate } from "react-router-dom";
import type { QuestionPost } from "@types";
import { getStatus, statusStyleMap } from "@utils";

interface QuestionProps {
  question: QuestionPost;
}

const Question = ({ question }: QuestionProps) => {
  const navigate = useNavigate();
  const status = getStatus(question.isSolved, question.answers);
  const statusStyle = statusStyleMap[status];

  return (
    <section className="px-4 py-3 flex flex-col gap-3 border-b-1 border-gray-200 bg-white shadow-sm">
      {/* 제목 */}
      <h1 className="text-lg font-semibold leading-snug">{question.title}</h1>

      {/* 상태 + 토큰 */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm text-white font-normal ${statusStyle.bg}`}
        >
          {statusStyle.label}
        </span>
        <div className="flex items-center gap-1 text-sm font-normal text-[#ffffff] bg-[#FAB12F] px-2 py-1 rounded-full">
          <img src="/icon/token.svg" alt="token" className="w-5 h-5" />
          <span>{question.rewardToken}</span>
        </div>
      </div>

      {/* 본문 */}
      {question.description && (
        <p className="text-base text-gray-700 whitespace-pre-line">
          {question.description}
        </p>
      )}

      {/* 이미지 */}
      {question.postImage && (
        <img
          src={question.postImage}
          alt="question"
          className="w-full rounded-lg object-cover"
        />
      )}

      {/* 태그 */}
      <div className="flex gap-2 flex-wrap">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded cursor-pointer"
            onClick={() => navigate("/community/search/" + tag)}
          >
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Question;
