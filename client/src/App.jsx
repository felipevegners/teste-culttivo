import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CharacterList from "./pages/CharacterList";
import FavHeroesList from "./pages/FavHeroesList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/favheroes" element={<FavHeroesList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
