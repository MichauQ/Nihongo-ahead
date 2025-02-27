  /*---------------------------------------------------//
  //                     Syllables                     //
  //---------------------------------------------------*/
export async function fetchImageDataForSyllables(setImageData) {
      try {
        const imageResponse = await fetch(`http://localhost:8080/syl/allsyllabledata`);
      if (!imageResponse.ok){
        throw new Error('Network response was not ok');
      }
      const imageData = await imageResponse.json();
      const imageUrlData = imageData.map(image => ({id: image.id, imageUrl: image.imageUrl, imageName: image.syllableName }));
      setImageData(imageUrlData);
      } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      }
  }
  export async function fetchNamesDataForSyllables(setNames) {
    try {
      const imageResponse = await fetch(`http://localhost:8080/syl/allnames`);
    if (!imageResponse.ok){
      throw new Error('Network response was not ok');
    }
    const data = await imageResponse.json();
    const dataMapped = data.map(syllable => ({id: syllable.id, name: syllable.syllableName }));
    setNames(dataMapped);
    } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    }
}

  export async function fetchSyllableDataForDefaultQuiz(storedValues, setImageData) { 
    try {
      const values = storedValues.join(',');
      const imageResponse = await fetch(`http://localhost:8080/syl/shuffled/${values}`);
      if (!imageResponse.ok){
        throw new Error('Network response was not ok');
      }
      const imageData = await imageResponse.json();
      const imageUrlData = imageData.map(image => ({id: image.id, imageUrl: image.imageUrl }));
      setImageData(imageUrlData);
      } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
}
  /*---------------------------------------------------//
  //                      Kanji                        //
  //---------------------------------------------------*/
export async function fetchAllDataForKanji(setImageData) {
  try {
    const imageResponse = await fetch(`http://localhost:8080/kan/allkanjidata`);
  if (!imageResponse.ok){
    throw new Error('Network response was not ok');
  }
  const imageData = await imageResponse.json();
  const imageUrlData = imageData.map(image => ({id: image.id, onyomi: image.onyomi, kunyomi: image.kunyomi,  imageUrl: image.imageUrl }));
  setImageData(imageUrlData);
  } catch (error) {
  console.error('There was a problem with the fetch operation:', error);
  }
}
export async function fetchFullKanjiInfo(setImageData) {
  try {
    const imageResponse = await fetch(`http://localhost:8080/kan/fullkanjidata`);
  if (!imageResponse.ok){
    throw new Error('Network response was not ok');
  }
  const imageData = await imageResponse.json();
  const imageUrlData = imageData.map(image => ({id: image.id, onyomi: image.onyomi, kunyomi: image.kunyomi,  imageUrl: image.imageUrl, translation: image.translation, association: image.association, examples:image.example}));
  setImageData(imageUrlData);
  } catch (error) {
  console.error('There was a problem with the fetch operation:', error);
  }
}
export async function fetchNamesDataForKanji(setNames) {
  try {
    const imageResponse = await fetch(`http://localhost:8080/kan/allkanjinames`);
  if (!imageResponse.ok){
    throw new Error('Network response was not ok');
  }
  const data = await imageResponse.json();
  const dataMapped = data.map(kanji => ({id: kanji.id, name: kanji.onyomi }));
  setNames(dataMapped);
  } catch (error) {
  console.error('There was a problem with the fetch operation:', error);
  }
}
export async function fetchKanjiDataForDefaultQuiz(storedValues, setKanjiImageData) { 
  try {
    const values = storedValues;

    const imageResponse = await fetch(`http://localhost:8080/kan/shuffledkanji/${values}`);
    if (!imageResponse.ok){
      throw new Error('Network response was not ok');
    }
    const imageData = await imageResponse.json();
    const imageUrlData = imageData.map(image => ({id: image.id, imageUrl: image.imageUrl }));
    setKanjiImageData(imageUrlData);
    } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

  /*---------------------------------------------------//
  //                      Words                        //
  //---------------------------------------------------*/
export async function fetchAllWordsData(setWordsData) {
  try {
    const dataResponse = await fetch(`http://localhost:8080/word/allwordsdata`);
  if (!dataResponse.ok){
    throw new Error('Network response was not ok');
  }
  const wordsData = await dataResponse.json();
  const wordsMappedData = wordsData.map(data => ({id: data.id, hiragana: data.hiragana, reading: data.reading,  meaning: data.meaning, type: data.type}));
  setWordsData(wordsMappedData);
  } catch (error) {
  console.error('There was a problem with the fetch operation:', error);
  }
}
export async function fetchWordsDataForCards(selectedValues, setCardInfo) {
  try {
    const values = selectedValues;
    // console.log(values);
    const dataResponse = await fetch(`http://localhost:8080/word/allwordsdatashuffled/${values}`);
    if (!dataResponse.ok) {
      throw new Error("Network response was not ok");
    }
    const wordsData = await dataResponse.json();
    const wordsMappedData = wordsData.map((data) => ({
      id: data.id,
      hiragana: data.hiragana,
      reading: data.reading,
      meaning: data.meaning,
      type: data.type,
      kanji: data.kanji,
    }));
    setCardInfo(wordsMappedData);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
export async function fetchDailyWord(setWordsData) {
  try {
    const dataResponse = await fetch(`http://localhost:8080/word/daily`);
    if (!dataResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const wordData = await dataResponse.json();
    const wordsMappedData = {
      id: wordData.id,
      hiragana: wordData.hiragana,
      reading: wordData.reading,
      meaning: wordData.meaning,
      type: wordData.type,
    };
    setWordsData(wordsMappedData);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

  /*---------------------------------------------------//
  //                   ChooseOneQuiz                   //
  //---------------------------------------------------*/
  export async function fetchSyllableDataForChooseQuiz(storedValues, setImageData) { 
    try {
      const values = storedValues.join(',');
      const imageResponse = await fetch(`http://localhost:8080/syl/ChooseOneQuiz/${values}`);
      if (!imageResponse.ok){
        throw new Error('Network response was not ok');
      }
      const imageData = await imageResponse.json();
      const imageUrlData = imageData.map(image => ({
        id: image.id,
        name: image.name,
        imageAnswers: image.imageAnswers.map(answer => ({
          id: answer.id,
          imageUrl: answer.imageUrl
        }))
      }));
      // console.log(imageUrlData);
      setImageData(imageUrlData);
      } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
}
export async function fetchKanjiDataForChooseQuiz(storedValues, setKanjiImageData) { 
  try {
    const values = storedValues;

    const imageResponse = await fetch(`http://localhost:8080/kan/ChooseOneQuiz/${values}`);
    if (!imageResponse.ok){
      throw new Error('Network response was not ok');
    }
    const imageData = await imageResponse.json();

    const imageUrlData = imageData.map(image => ({
      id: image.id,
      name: image.name,
      imageAnswers: image.imageAnswers.map(answer => ({
        id: answer.id,
        imageUrl: answer.imageUrl
      }))
    }));
    // console.log(imageUrlData);
    setKanjiImageData(imageUrlData);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
  /*---------------------------------------------------//
  //                      Articles                     //
  //---------------------------------------------------*/
  export async function fetchArticlesTitles(setArticlesData) {
    try {
      const response = await fetch('http://localhost:8080/art/allarticles');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const articlesData = await response.json();
      const formattedArticles = articlesData.map(article => ({
        id: article.id,
        title: article.title,
        titleImagePath: article.titleImagePath,
      }));
      setArticlesData(formattedArticles);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  export async function fetchArticleById(articleId, setArticleData) {
    try {
      const response = await fetch(`http://localhost:8080/art/article/${articleId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const articleData = await response.json();
      const formattedArticle = {
        id: articleData.id,
        title: articleData.title,
        titleImagePath: articleData.titleImagePath,
        content: articleData.content,
        images: articleData.images.map(image => ({
          id: image.id,
          imagePath: image.imagePath,
        })),
      };
      setArticleData(formattedArticle);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  