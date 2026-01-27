import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CommonModal } from "@components/common";
import { SimpleHeader } from "@components/layout";
import {
  NewPostImageUploader,
  NewPostContentInput,
  RewardToken,
  TokenSelect,
} from "@components/community";

const NewPost = () => {
  const navigate = useNavigate();
  const { type, postId } = useParams();
  const isAnswer = Boolean(postId);
  const isQuestionPost = type === "question";

  const [rewardToken, setRewardToken] = useState(1);
  const [rewardTokenModalOpen, setRewardTokenModalOpen] = useState(false);

  const handleConfirm = () => {
    setRewardTokenModalOpen(false);
  };

  const handleSubmitClick = () => {
    navigate("/community");
  };

  return (
    <div>
      <SimpleHeader
        button={
          <div
            className="font-semibold font-xs text-yellow-400 items-center cursor-pointer"
            onClick={handleSubmitClick}
          >
            공유하기
          </div>
        }
      />

      <div className="flex flex-col gap-4">
        <NewPostImageUploader
          onChange={(file) => {
            // 전송 시 파일 처리 로직
          }}
        />

        <NewPostContentInput
          onChange={(text) => {
            // 전송 시 내용 처리 로직
          }}
        />
      </div>

      {isQuestionPost && !isAnswer && (
        <div className="fixed bottom-10 w-full max-w-[420px] px-6">
          <RewardToken
            rewardToken={rewardToken}
            onClick={() => setRewardTokenModalOpen(true)}
          />
        </div>
      )}

      {isQuestionPost && !isAnswer && rewardTokenModalOpen && (
        <CommonModal
          title="보상 토큰 지급"
          desc={`채택된 답변의 사용자에게 <b>${rewardToken} MZTK</b>을 지급합니다.`}
          confirmLabel="설정"
          cancelLabel="취소"
          onConfirmClick={handleConfirm}
          onCancelClick={() => setRewardTokenModalOpen(false)}
        >
          <TokenSelect />
        </CommonModal>
      )}
    </div>
  );
};

export default NewPost;
