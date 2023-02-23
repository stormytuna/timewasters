import { Navbar } from "./components/Navbar";
import { Minesweeper } from "./games/minesweeper/components/Minesweeper";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Minesweeper />
    </div>
  );
}

export default App;
