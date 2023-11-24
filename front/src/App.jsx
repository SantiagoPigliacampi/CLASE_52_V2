import UserTable from "./components/UserTable";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginV2 from "./components/LoginV2";
import Menu from './components/Menu.jsx';


function App() {
  return (
    <>
      <BrowserRouter> 
        <Routes>
            <Route path="/UserTable" element={<UserTable />} />
            <Route path="/LoginV2" element={<LoginV2 />} />
            <Route path="/Menu" element={<Menu />} />
        </Routes>
      </BrowserRouter>     
    </>
  );
}

export default App;
