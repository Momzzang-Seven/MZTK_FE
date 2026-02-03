export const TOKEN_MESSAGES = {
  ERROR: {
    INVALID_ADDRESS: "유효하지 않은 지갑 주소입니다.",
    EXCEED_BALANCE: "잔액이 부족합니다.",
    INVALID_AMOUNT: "송금 금액을 다시 확인해 주세요.",
    FETCH_BALANCE_FAILED: "잔액 정보를 가져오는 데 실패했습니다.",
    WALLET_NOT_FOUND: "지갑 정보가 없습니다.",
    CONFIG_MISSING: "환경 설정(RPC/Contract)이 누락되었습니다.",
    TRANSFER_FAILED:
      "PIN 번호가 틀렸거나, 네트워크 오류로 송금에 실패했습니다.",
  },
  SUCCESS: {
    TRANSFER_COMPLETE: "송금이 완료되었습니다.",
  },
  MODAL: {
    CONFIRM_RETRY: "다시 시도하기",
    TITLE_FAILED: "송금 실패",
  },
};
