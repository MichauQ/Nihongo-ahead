import React  from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from './Main';
import '../../assets/App.css';

export default function Home() {
    
    return (
    <div className="App" style={{height:"100%"}}>
      <Header/>
      <Main 
      />
      <Footer/>
    </div>
    );
  }