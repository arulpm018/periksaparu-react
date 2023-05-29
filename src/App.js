import {BrowserRouter,Route, Routes} from "react-router-dom";

import Login from "./components/Login"
import Dashboard4 from "./components/Dashboard4";
import Register from "./components/Register";
import Dashboard3 from "./components/Dashboard3";
import Report from "./components/Report";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/report" element={<><Report/></>}></Route>
        <Route path="/dashboard" element={<><Dashboard4/></>}></Route>
        <Route path="/dashboard3" element={<><Dashboard3/></>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
