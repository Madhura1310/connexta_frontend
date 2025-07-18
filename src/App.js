// import Home from "./pages/home/home";
// import Login from "./pages/login/Login";
// import Profile from "./pages/profile/Profile";
// import Register from "./pages/register/Register";
// import{
//   BrowserRouter as Router,
//   Switch,
//   Route 
// } from "react-router-dom";

// function App() {
//   return (
//       <Router>
//         <Switch>
//           <Route exact path="/">
//             <Home/>
//           </Route>
//            <Route path="/login">
//             <Login/>
//           </Route>
//            <Route path="/register">
//             <Register/>
//           </Route>
//            <Route path="/profile/:username">
//             <Profile/>
//           </Route>
//         </Switch>
//       </Router>
//   );
// }

// export default App;

import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {

  const { user } = useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register/>} />
        <Route path="/login" element={user ? <Navigate to="/" />:<Login />} />
        <Route path="/register" element={user ? <Navigate to="/" />:<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
