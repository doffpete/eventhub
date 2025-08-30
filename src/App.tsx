import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext";
import CreateEvents from "./components/CreateEvents";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./guards/ProtectedRoute";
import Layout from "./layout/Layout";
import RegisteredUserRoute from "./guards/RegisteredUserRoute";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ResetSuccess from "./components/ResetSuccess";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot_password"
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/reset_password"
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/reset_success"
            element={
              <ProtectedRoute>
                <ResetSuccess />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="search_events" element={<SearchResults />} />
            <Route
              path="create_events"
              element={
                <RegisteredUserRoute>
                  <CreateEvents />
                </RegisteredUserRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
            <Route path="search_results" element={<SearchResults />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
