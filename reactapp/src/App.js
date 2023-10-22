import './styles/App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register';
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
