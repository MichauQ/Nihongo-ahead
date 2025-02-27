import DailyWordComponent from "../../components/DailyWordComponent";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../App";
import { fetchArticlesTitles } from "../../components/API";
import CityCarousel from "./HomeComponents/CityCarousel";
import TokyoClock from "./HomeComponents/TokyoClock";
import FunFactCarousel from "./HomeComponents/FunFactCarousel";
import { Link } from "react-router-dom";
export default function Main() {
    const {colorMode} = useContext(Context);
    const [articles, setArticles] = useState([]);

    useEffect (()=>{
    fetchArticlesTitles(setArticles);
    },[])
      
      
    return(
        <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
            <div className="homepage-content">
                <div className="homepage content-box-1">
                    <div className="placeholder-test plh-1">
                        {articles.map((article, index) => (
                            <div className="article" key={index}>
                                <div className="article-image-container">
                                <img src={article.titleImagePath} alt={article.title} />
                                </div>
                                <div className="article-text-container">
                                <Link to={`/article/${article.id}`}>{article.title}</Link>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="homepage content-box-2">
                    <div className="placeholder-test plh-5">
                        <div className="homepage-daily"><DailyWordComponent/></div>
                        <div className="homepage-clock"><TokyoClock/></div>
                    </div>
                    <div className="placeholder-test plh-2">
                        <h2>Ciekawostki o japonii:</h2>
                        <FunFactCarousel/>
                    </div>
                    <div className="placeholder-test plh-3">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6482602.399158573!2d134.89681733945545!3d38.083188283778405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJaponia!5e0!3m2!1spl!2spl!4v1737470612368!5m2!1spl!2spl" width="392" height="414" style={{border:"0", borderRadius: "15px"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>    
                    </div>                
                    <div className="placeholder-test plh-4">
                        <CityCarousel/>
                    </div>
                </div>
            </div>
        </div>
);
}                  
