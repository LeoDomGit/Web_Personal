import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Index from './Pages/film/Index';
import New from './Pages/film/New';
import Single from './Pages/film/Single';
import Watch from './Pages/film/Watch';
import CateFilm from './Pages/film/CateFilm';
import CateFilm2 from './Pages/film/CateFilm2';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/vu-tru-phim' element={<Index />} />
          <Route path='/vu-tru-phim/phim-moi' element={<New />} />
          <Route path='/vu-tru-phim/:id' element={<Single />} />
          <Route path='/vu-tru-phim/loai-phim/:id' element={<CateFilm />} />
          <Route path='/vu-tru-phim/quoc-gia/:id' element={<CateFilm2 />} />
          <Route path="/xem-phim/:slug/:episode" element={<Watch />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
