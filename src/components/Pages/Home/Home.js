import React from 'react';
import Header from '../../Header/Header';

const Home = ({onLogOut}) => {
  return (
    <section>
      <Header onLogOut={onLogOut}/>
      <div className="container">
        <h2>Home page</h2>
      </div>
    </section>
  );
};

export default Home;