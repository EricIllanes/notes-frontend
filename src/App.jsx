import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage";
import "./styles/App.css"
import EditNote from "./components/editComponent";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<EditNote />} />
        </Routes>

      </Router>
    </div>
  )
}

export default App;