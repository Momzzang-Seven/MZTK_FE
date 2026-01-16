import { Layout } from "@components/layout";
import { useEffect } from "react";
import {
  Callback,
  Err404,
  Home,
  Login,
  My,
  MyTx,
  Verify,
  FreeListPage,
  FreeDetailPage,
  FreeCreatePage,
  QuestionListPage,
  QuestionDetailPage,
  Market,
  MarketDetail,
  MarketPurchase,
  Leaderboard,
  QuestionCreatePage,
} from "@pages";
import ExerciseAuth from "./pages/ExerciseAuth";
import RecordAuth from "./pages/RecordAuth";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useUserStore } from "@store/userStore";
import GlobalSnackbar from "@components/common/GlobalSnackbar";

function App() {
  const { checkAnalysisCompletion } = useUserStore();

  useEffect(() => {
    const interval = setInterval(() => {
      checkAnalysisCompletion();
    }, 1000); // Poll every second
    return () => clearInterval(interval);
  }, [checkAnalysisCompletion]);

  return (
    <BrowserRouter>
      <Layout>
        <div className="w-full max-w-[450px] mx-auto h-full bg-white shadow-xl flex flex-col relative overflow-hidden">
          <GlobalSnackbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/login-success" element={<Navigate to="/" replace />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Protected Routes (Temporarily Open) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/verify" element={<Verify />} />
              {/* Community */}
              {/* <Route path="/market" element={<Market />} /> */}
              <Route path="/market" element={<Market />} />
              <Route path="/market/:id" element={<MarketDetail />} />
              <Route path="/market/:id/purchase" element={<MarketPurchase />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/community" element={<FreeListPage />} />
              <Route path="/community/free" element={<FreeListPage />} />
              <Route path="/community/free/postId" element={<FreeDetailPage />} />
              <Route path="/community/free/new" element={<FreeCreatePage />} />
              <Route path="/community/question" element={<QuestionListPage />} />
              <Route
                path="/community/question/:postId"
                element={<QuestionDetailPage />}
              />
              <Route
                path="/community/question/new"
                element={<QuestionCreatePage />}
              />
              {/* my */}
              <Route path="/my" element={<My />} />
              <Route path="/myTknTx" element={<MyTx />} />
              {/* auth */}
              <Route path="/exercise-auth" element={<ExerciseAuth />} />
              <Route path="/record-auth" element={<RecordAuth />} />
            </Route>

            {/* Error */}
            <Route path="/404" element={<Err404 />} />
            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
