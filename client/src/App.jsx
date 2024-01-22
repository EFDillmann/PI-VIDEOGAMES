import { Routes, Route } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Post from "./components/Post/Post";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/videogame/:id" element={<Detail />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
