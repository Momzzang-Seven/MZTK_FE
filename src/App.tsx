import { Layout } from "@components/layout";
import { Home } from "@pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
