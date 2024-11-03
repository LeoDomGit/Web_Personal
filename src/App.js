import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';

import Index from './Pages/film/Index';
import New from './Pages/film/New';
import Single from './Pages/film/Single';
import Watch from './Pages/film/Watch';
import CateFilm from './Pages/film/CateFilm';
import CateFilm2 from './Pages/film/CateFilm2';
import Tic from './Pages/Tic';
import Dinosaur from './Pages/Dinosaur';
import KeoBuaBao from './Pages/KeoBuaBao';
import NotFound from './Pages/NotFound';
import Search from './Pages/film/Search';
import TicTacToe from './Pages/TicTacToe';
import Flip from './Pages/Flip';
import Game2048 from './Pages/Game2048';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tic-tac-toe' element={<TicTacToe />} />
          <Route path='/2048' element={<Game2048 />} />
          <Route path='/tic-tac-toe' element={<TicTacToe />} />
          <Route path='/vu-tru-phim' element={<Index />} />
          <Route path='/vu-tru-phim/phim-moi' element={<New />} />
          <Route path='/vu-tru-phim/:id' element={<Single />} />
          <Route path='/vu-tru-phim/loai-phim/:id' element={<CateFilm />} />
          <Route path='/vu-tru-phim/tim-kiem/:id' element={<Search />} />
          <Route path='/vu-tru-phim/quoc-gia/:id' element={<CateFilm2 />} />
          <Route path="/xem-phim/:slug/:episode" element={<Watch />} />
          <Route path='/game' element={<Tic />} />
          <Route path='/lat-hinh' element={<Flip />} />
          <Route path='/dinosaur' element={<Dinosaur />} />
          <Route path='/dinosaur' element={<Dinosaur />} />
          <Route path="/keobuabao" element={<KeoBuaBao />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
