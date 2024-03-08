import { BrowserRouter, Route, Routes } from "react-router-dom";
import TakeImage from "./components/TakeImage";
import Landingpage from "./components/landingpage";
import Cvfiles from "./components/csvfiles";
import { Toaster } from "react-hot-toast";
import React from "react";

function App() {
  return (
    <div className="dark:bg-dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />}></Route>
          <Route path="/takeimg" element={<TakeImage />}></Route>
          <Route path="/csv/:sub/:sec" element={<Cvfiles />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
