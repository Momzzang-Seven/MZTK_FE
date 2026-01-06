import { authApi, walletApi } from "./client";

// POST: Login
export const PostLogin = async (
  provider: "KAKAO" | "GOOGLE" | "LOCAL",
  code: string,
  redirectUri?: string
) => {
  const { data } = await authApi.post("/login", {
    provider,
    authorizationCode: code,
    redirectUri,
  });

  return data;
};

// POST: Reissue Token
export const PostReissueToken = async () => {
  const { data } = await authApi.post("/reissue");
  return data;
};

// POST: Logout
export const PostLogout = async () => {
  await authApi.post("/logout");
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

// GET: Check Login Status (Get Me)
// Currently verifying if there is a 'me' endpoint or if we rely on stored data.
// Based on UserController, we might not have a direct 'me' endpoint for basic info except re-issue or during login.
// However, the original code called /me on walletApi.
// Let's assume we might use /users/me/role to check validity or just rely on store.
export const GetLoginStatus = async () => {
  // Try to reissue token to check validity and get new access token
  const { data } = await authApi.post("/reissue");
  return data;
};

