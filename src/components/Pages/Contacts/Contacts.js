import React from 'react';
import Header from '../../Header/Header';

const Contacts = ({onLogOut}) => {
  return (
    <section>
      <Header onLogOut={onLogOut}/>
      <div className="container">
        <h2>Contacts page</h2>
      </div>
    </section>
  );
};

export default Contacts;
