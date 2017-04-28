import React from 'react';



export default ({ film, isSelected }) => (

  <div>
    <h2>
      <span>{ film.Title }</span>
      <small>({ film.Year })</small>
    </h2>
    {
      isSelected &&
      <div>
        <img src={film.Poster} alt={film.Title} />
      </div>
    }
  </div>

)
