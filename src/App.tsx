import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "@store/userStore";
import { AdminLayout, Layout } from "@components/layout"; // AdminLayout 추가
import GlobalSnackbar from "@components/common/GlobalSnackbar";
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
  CreateWallet,
  RegisterWallet,
  AdminLogin,
  AdminDashboard,
  TokenLog,
  UserManagement,
  PostManagement,
} from "@pages";
import ExerciseAuth from "./pages/ExerciseAuth";
import RecordAuth from "./pages/RecordAuth";
import LocationRegister from "./pages/LocationRegister";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const { checkAnalysisCompletion } = useUserStore();

  useEffect(() => {
    const interval = setInterval(() => {
      checkAnalysisCompletion();
    }, 1000);
    return () => clearInterval(interval);
  }, [checkAnalysisCompletion]);

  return (
    <BrowserRouter>
      <Routes>
        {/* admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="posts" element={<PostManagement />} />
                <Route path="token-logs" element={<TokenLog />} />

                <Route path="/404" element={<Err404 />} />
                <Route
                  path="*"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
              </Routes>
            </AdminLayout>
          }
        />

        {/* user  */}
        <Route
          path="*"
          element={
            <Layout>
              <div className="flex flex-1 w-full mx-auto h-full bg-white flex flex-col relative overflow-hidden max-w-[450px]">
                <GlobalSnackbar />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/callback" element={<Callback />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/create-wallet" element={<CreateWallet />} />
                  <Route path="/register-wallet" element={<RegisterWallet />} />

                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/market" element={<Market />} />
                    <Route path="/market/:id" element={<MarketDetail />} />
                    <Route
                      path="/market/:id/purchase"
                      element={<MarketPurchase />}
                    />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/community/free" element={<FreeListPage />} />
                    <Route
                      path="/community/free/postId"
                      element={<FreeDetailPage />}
                    />
                    <Route
                      path="/community/free/new"
                      element={<FreeCreatePage />}
                    />
                    <Route
                      path="/community/question"
                      element={<QuestionListPage />}
                    />
                    <Route
                      path="/community/question/:postId"
                      element={<QuestionDetailPage />}
                    />
                    <Route
                      path="/community/question/new"
                      element={<QuestionCreatePage />}
                    />
                    <Route path="/my" element={<My />} />
                    <Route path="/myTknTx" element={<MyTx />} />
                    <Route path="/exercise-auth" element={<ExerciseAuth />} />
                    <Route path="/record-auth" element={<RecordAuth />} />
                    <Route
                      path="/location-register"
                      element={<LocationRegister />}
                    />
                  </Route>

                  <Route path="/404" element={<Err404 />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
