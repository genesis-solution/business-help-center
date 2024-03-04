import "./App.css";
import Header from "./pages/Header";
import Submit from "./pages/Submit";
import Verification from "./pages/Verification";
import Confirm from "./pages/Confirm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Header />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/verification" element={<Verification/>}/>
          <Route path="/confirm" element={<Confirm/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
