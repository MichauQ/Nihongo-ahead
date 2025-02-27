import React, { useState, useEffect } from "react";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from './Main';
import { fetchAllWordsData } from "../../components/API";

export default function Words() {
  const [wordsData, setWordsData] = useState([]);
  // const [initialized, setInitialized] = useState(false); 

  // useEffect(() => {
  //   if (!initialized) { 
  //     setSelectedValues(JSON.parse(sessionStorage.getItem("selectedValues")));
  //     setInitialized(true); 
  //   } else {
  //     const fetchData = async () => {
  //       await fetchWordsDataForCards(selectedValues, setCardInfo);
  //     };
  //     fetchData();
  //   }
  // }, [selectedValues, initialized]); 
  useEffect(()=>{
    const fetchData = async () => {
    await fetchAllWordsData(setWordsData);
  };
  fetchData();
  },[])
  return (
    <div className="App">
      <Header />
      <Main
        wordsData={wordsData}
      />
      <Footer />
    </div>
  );
}
