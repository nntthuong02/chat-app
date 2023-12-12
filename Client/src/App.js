

import './App.css';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App(){
  // return <Login/>
  return <BrowserRouter>
    <Routes>
      <Route Component={Login} path='/login'/>
      <Route Component={ChatRoom} path='/'/>

    </Routes>
  </BrowserRouter>
}

export default App;