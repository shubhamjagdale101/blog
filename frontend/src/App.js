import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/Home';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundpage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import { useState, useEffect } from 'react';
import Alerts from './pages/alerts';


function App() {
  const [user, setUser] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('userInfo')) setUser(true);
    else setUser(false);
  },[localStorage])
  const [alert, setAlert] = useState({msg:null,type:null, vis:false});

  return (
    <BrowserRouter>
    <div className="App" style={{position: 'relative', minHeight:'100vh'}}>
       <NavBar setUser={setUser} user={user}/>
       <div id="page-body">
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage /> } />
        <Route path="/articles" element={<ArticleListPage setAlert={setAlert}/>} />
        <Route path="articles/:articleId" element={<ArticlePage/>} />
        <Route path="/login" element={<LoginPage setUser={setUser} setAlert={setAlert}/>} />
        <Route path="/create-account" element={<CreateAccountPage/>} />
        <Route path="*" element={<NotFoundPage/>}/>
       </Routes>
       </div>
        {alert.vis && <Alerts msg={alert.msg} type={alert.type}/>}
    </div>
    </BrowserRouter>
  );
}

export default App;

