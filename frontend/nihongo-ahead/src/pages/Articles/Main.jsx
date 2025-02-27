import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchArticleById } from '../../components/API';
import { useContext } from "react";
import { Context } from "../../App";
import '../../assets/App.css';
import { Button } from 'react-bootstrap';

export default function Articles() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useContext(Context);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleById(id, (data) => {
      if (data) {
        setArticle(data);
      } else {
        setArticle(null);
      }
    });
  }, [id]);

  if (!article) {
    return (
      <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
        <div className="error-container">
          <h1>Nie znaleziono artykułu</h1>
          <p>Przepraszamy, ale artykuł, którego szukasz, nie istnieje.</p>
          <button onClick={() => navigate("/Home")}>Wróć</button>
        </div>
      </div>
    );
  }

  return (
    <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
      <div className="articles-container">
        <div className="articles-page">
          <h1 className="article-title">{article.title}</h1>

          <div 
            className="article-text" 
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />

          <div className="article-images-row">
            {article.images.map((image) => (
              <div key={image.id} className="article-image">
                <img src={image.imagePath} alt={`Obrazek ${image.id}`} />
              </div>
            ))}
          </div>
          <div className='article-button-con'>
            <Link to="/Home">
              <Button className='mb-2' variant={colorMode ? "dark" : "light"}>Powrót</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}






