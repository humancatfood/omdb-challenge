import React from 'react';

import FourOhFourContent from './../components/404';
import Header from './../components/Header';



export default ({ path }) => (
  <div className="container">
    <Header title="Four-Oh-Four"/>
    <FourOhFourContent />
  </div>
);
