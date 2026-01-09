import { Layout } from "@components/layout";
import { Callback, Community, Err404, Home, Login, My, Verify } from "@pages";
import ExerciseAuth from "./pages/ExerciseAuth";
import Onboarding from "./pages/Onboarding";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/login-success" element={<Navigate to="/" replace />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Protected Routes (Temporarily Open) */}
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/community" element={<Community />} />
          <Route path="/my" element={<My />} />
          <Route path="/exercise-auth" element={<ExerciseAuth />} />

          {/* Error */}
          <Route path="/404" element={<Err404 />} />
          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
