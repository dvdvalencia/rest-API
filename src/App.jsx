// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Characters from "./components/Characters/Characters";
import CharacterDetails from "./components/Characters/CharacterDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </div>
  );
}

export default App;
