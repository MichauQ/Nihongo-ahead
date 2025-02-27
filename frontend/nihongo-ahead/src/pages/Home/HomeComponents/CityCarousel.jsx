import React from 'react';
import { Carousel } from 'react-bootstrap';

export default function CityCarousel() {
  const cities = [
    {
      title: 'Tokio',
      imgSrc: 'https://placehold.co/1000x300?text=Tokio',
      description: 'Wieża Tokio, Przejście Shibuya, i Świątynia Meiji.',
    },
    {
      title: 'Kioto',
      imgSrc: 'https://placehold.co/1000x300?text=Kioto',
      description: 'Kinkaku-ji, Fushimi Inari Taisha, i dzielnica Gion.',
    },
    {
      title: 'Osaka',
      imgSrc: 'https://placehold.co/1000x300?text=Osaka',
      description: 'Zamek Osaka, Dotonbori, i Universal Studios Japan.',
    },
  ];

  return (
    <div className="city-carousel-container">
      <Carousel>
        {cities.map((city, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={city.imgSrc}
              alt={city.title}
            />
            <Carousel.Caption>
              {/* <h3>{city.title}</h3> */}
              <p>{city.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};


