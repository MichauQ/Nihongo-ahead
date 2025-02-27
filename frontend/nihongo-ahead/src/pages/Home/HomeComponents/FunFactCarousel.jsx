import React from 'react';
import { Carousel } from 'react-bootstrap';

export default function FunFactCarousel() {
    const funfacts = [
          {
            id: 1,
            description: 'W Japonii nie używa się czerwonego atramentu do zapisywania nazwisk, ponieważ uważa się, że to przynosi pecha i zwiastuje śmierć.',
          },
          {
            id: 2,
            description: 'Kimono, tradycyjny strój japoński, nadal jest noszone podczas uroczystych okazji.',
          },
          {
            id: 3,
            description: 'W Japonii wiele osób zbliżających się do śmierci tworzy tradycyjne „wiersze śmierci”, aby podsumować esencję swojego życia.',
          },
          {
            id: 4,
            description: 'Japończycy nie drą papieru opakowaniowego prezentów, gdyż jest to uważane za niegrzeczne.',
          },
          {
            id: 5,
            description: 'W japońskiej kulturze czystość jest bardzo ważna, dlatego Japończycy nie wchodzą do toalety w tych samych pantoflach, których używają w innych pomieszczeniach.',
          },
          {
            id: 6,
            description: 'Wydmuchiwanie nosa w obecności innych osób jest uważane za nie grzeczne i gorszące.',
          },
          {
            id: 7,
            description:  'Podczas posiłków w Japonii wbicie pałeczek w jedzenie jest uważane za niegrzeczne, ponieważ przypomina to praktyki pogrzebowe.',
          },
          {
            id: 8,
            description: 'Wchodząc do japońskich świątyń, należy zdjąć buty i wejść na bosaka.',
          },
          {
            id: 9,
            description: 'Obecność makaków (gatunek małp) japońskich w lasach nie jest niczym nadzwyczajnym. Można je także spotkać w parkach, ale lepiej unikać bliskiego kontaktu, gdyż mogą zaatakować.',
          },
          {
            id: 10,
            description: 'Makaki japońskie (gatunek małp) występują prawie na całym obszarze Japonii, z wyjątkiem wyspy Hokkaido.',
          },
          {
            id: 11,
            description: 'Spacerując po japońskich lasach, warto uważać na mamushi, jednego z najbardziej jadowitych wężów Japonii, który może ukąsić, jeśli poczuje się zagrożony.',
          },
          {
            id: 12,
            description: 'W japonii otwarcie prezentu zaraz po jego dostaniu może być uznane słabą powściągliwość i unoszenie się pychą ',
          },
          {
            id: 13,
            description: 'Niedźwiedzie brunatne na Hokkaido są znacznie większe niż te z innych części Japonii.',
          },
          {
            id: 14,
            description: 'Szerszeń azjatycki, największy przedstawiciel swojego gatunku, ma użądlenie, które jest niezwykle bolesne i może powodować reakcję alergiczną.',
          },
          {
            id: 15,
            description: 'W Japonii można zobaczyć znaki ostrzegające przed kani, dużym ptakiem drapieżnym, który poluje na jedzenie, które jedzą ludzie.',
          },
          {
            id: 16,
            description: 'Na terenie Fukushimy, gdzie doszło do katastrofy nuklearnej, wyewoluował nowy gatunek dzika, który powstał z krzyżowania dzików ze świniami domowymi.',
          },
          {
            id: 17,
            description: 'Na japońskich ulicach nie znajdziemy koszy na śmieci, a pomimo tego nie uświadczymy na ziemi ani jednego odpadu. Jest to związane z wielką dbałością japończyków o pożądek.',
          },
          {
            id: 18,
            description: 'W japońskich lasach niedźwiedzie czasem wkraczają na osiedla mieszkalne, a do ich odstraszania używa się wilków-robotów.',
          },
      ];
      

  const chunkArray = (arr, size) =>
    arr.reduce((acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc), []);

  const funfactGroups = chunkArray(funfacts, 3);

  return (
    <div className="funfact-carousel-container">
      <Carousel pause="hover">
        {funfactGroups.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="funfact-item">
              <ul>
                {group.map((fact) => (
                  <li key={fact.id}>{fact.description}</li>
                ))}
                <p>źródło: <a href='https://www.national-geographic.pl/traveler/kierunki/ciekawostki-o-japonii-poznaj-50-zaskakujacych-informacji/'>artykuł national geographic</a></p>
              </ul>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
