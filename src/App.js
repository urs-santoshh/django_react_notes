import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hocs/Layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AlertContextProvider } from "./context/AlertContext";
import { UserContextProvider } from "./context/UserContext";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <AlertContextProvider>
          <UserContextProvider>
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
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </Layout>
          </UserContextProvider>
        </AlertContextProvider>
      </Router>
    </>
  );
}

export default App;
