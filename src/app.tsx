import React from 'react';
import { Header, ImageSlider } from './components';

function App() {
  const images = [
    'https://3apq7g38q3kw2yn3fx4bojii-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/MV5BMTM0MzM3MTg3MF5BMl5BanBnXkFtZTcwNDcwODE0Nw@@._V1_SY1000_CR006511000_AL_.jpg',
    'https://thesource.com/wp-content/uploads/2018/02/bob.jpg',
    'https://cdn04.allafrica.com/download/pic/main/main/csiid/00311054:2a1ffa3a5063e432b703bfb20c622d6b:arc614x376:w2205:us1.jpg',
  ];

  const slideProps = {
    images,
    height: 400,
    width: 640,
  };

  return (
      <div className="flex flex-col mx-auto">
        <Header />
        <ImageSlider {...slideProps} />
      </div>
  );
}

export default App;
