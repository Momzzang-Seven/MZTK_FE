import { authApi, walletApi } from "./client";

// GET: Kakao Login
export const GetKakaoLogin = async () => {
  const { data } = await authApi.get("/login/kakao/url");

  return data;
};

// GET: Google Login
export const GetGoogleLogin = async () => {
  const { data } = await authApi.get("/login/google/url");

  return data;
};

// POST: Issue Challenge
export const PostIssueChallenge = async (addr: string) => {
  const { data } = await walletApi.post("/challenge", { address: addr });

  return data.message;
};

// POST: Verify Challenge
export const PostVerifyChallenge = async (addr: string, challenge: string) => {
  const { data } = await walletApi.post("/login", {
    address: addr,
    signature: challenge,
  });

  return data;
};

// GET: Check Login Status
export const GetLoginStatus = async () => {
  const { data } = await walletApi.get("/me");

  return data;
};
