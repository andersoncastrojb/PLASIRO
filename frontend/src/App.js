import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='/documen' element={<h1>Hello</h1>} />
        </Route>
      </Routes>
      <Footer />

    </div>

  );
}

export default App;
