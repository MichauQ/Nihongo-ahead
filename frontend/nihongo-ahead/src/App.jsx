import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Syllables from './pages/Syllables';
import Quiz from './pages/Quiz';
import Kanji from './pages/Kanji';
import NoPage from './pages/NoPage';
import Words from './pages/Words';
import Articles from './pages/Articles'
import AboutPage from './pages/AdditionalPages/AboutPage';
import ContactPage from './pages/AdditionalPages/ContactPage';
import { useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export const Context = createContext();
export function App() {
  
  const getInitialColorMode = () => {
    const storedMode = localStorage.getItem("colorMode");
    return storedMode ? JSON.parse(storedMode) : false; 
  };
  const [selectedValues, setSelectedValues] = useState([]);
  const [colorMode, setColorMode] = useState(getInitialColorMode);

  return (
  <div className="App">
    <BrowserRouter>
      <Context.Provider value = {{dane: selectedValues, setSelectedValues, colorMode, setColorMode}}>
        <div>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/Kanji' element={<Kanji/>}/>
            <Route path='/Syllables' element={<Syllables/>}/>
            <Route path='/Quiz/:quizMode' element={<Quiz/>}/>
            <Route path='/Words' element={<Words/>}/>
            <Route path='/Article/:id' element={<Articles/>}/>
            <Route path='/About' element={<AboutPage/>}/>
            <Route path='/Contact' element={<ContactPage/>}/>
            <Route path='*' element={<NoPage/>}/>
        </Routes>
        </div>
      </Context.Provider>
    </BrowserRouter>
  </div>
  );
}

export default App;
