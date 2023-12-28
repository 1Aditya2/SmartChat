import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import Avatar from "./Pages/Avatar/Avatar";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Chat />} />
          <Route path="/setAvatar" element={<Avatar />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
