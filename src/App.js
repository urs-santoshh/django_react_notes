import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hocs/Layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import NotePage from "./pages/NotePage";
import Login from "./pages/Login";
import { AlertContextProvider } from "./context/AlertContext";
import { UserContextProvider } from "./context/UserContext";
import "./App.css";
import { ThemeContextProvider } from "./context/ThemeContext";

function App() {
  return (
    <div className="app">
      <Router>
        <AlertContextProvider>
          <UserContextProvider>
            <ThemeContextProvider>
              <Layout>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    exact
                    path="/notes/:noteId"
                    element={
                      <ProtectedRoute>
                        <NotePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route exact path="/login" element={<Login />} />
                </Routes>
              </Layout>
            </ThemeContextProvider>
          </UserContextProvider>
        </AlertContextProvider>
      </Router>
    </div>
  );
}

export default App;
