import { Navbar } from "./components/Navbar";
import { Minesweeper } from "./games/minesweeper/components/Minesweeper";
import { About } from "./components/About"
import { Route, Routes, Navigate } from "react-router-dom"
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="*" element={<Navigate to="/about" />} />
        <Route path="minesweeper" element={<Minesweeper />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
