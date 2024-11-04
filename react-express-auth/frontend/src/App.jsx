import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./routes/Login";
import Home from "./routes/Home";
import AuthProvider from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
