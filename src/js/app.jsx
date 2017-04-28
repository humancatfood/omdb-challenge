import { get } from 'axios';
import sortBy from 'lodash/sortBy';
import React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { searchFilms, receiveFilms, selectFilm, setSortProp } from './data/actions';



@reduxConnect(
  store => ({
    films: store.films.films,
    selectedFilm: store.films.selectedFilm,
    sortProp: store.ui.sortProp
  })
)
export default class App extends React.Component
{

  render ()
  {
    const { films, selectedFilm, sortProp } = this.props;

    const filmsToDisplay = films && films.length && this._sortFilms(films, sortProp) || [];

    return (
      <div>
        <h1>Film Search</h1>

        <input id="search-input" type="text" placeholder="Search..." onChange={ e => this._search(e.currentTarget.value) }/>

        <span>sort:</span>
        <input id="title-input" type="radio" name="sort-group"
               value="Title"
               checked={sortProp === 'Title'}
               onChange={() => this._setSortProp('Title')} />
        <label htmlFor="title-input">Title</label>,

        <input id="date-input" type="radio" name="sort-group"
               value="Year"
               checked={sortProp === 'Year'}
               onChange={() => this._setSortProp('Year')} />
        <label htmlFor="date-input">Date</label>

        <ul className="film-list">
          {
            filmsToDisplay.map(film => (
              <li key={ film.imdbID } onClick={ () => this._selectFilm(film)}>
                { film.Title }
                {
                  selectedFilm && selectedFilm.imdbID === film.imdbID &&
                  <div>
                    Year: { film.Year }, imdbID: { film.imdbID } <br />
                    <img src={film.Poster} alt={film.Title} />
                  </div>
                }
              </li>
            ))
          }
        </ul>

      </div>
    );
  }

  _search (searchterm)
  {
    const { dispatch } = this.props;

    dispatch(searchFilms(searchterm));
    get(`http://www.omdbapi.com/?s=${ searchterm }`)
      .then(response => dispatch(receiveFilms(response.data && response.data.Search)))
      .catch((...args) => console.error(args));
  }

  _selectFilm (film)
  {
    const { dispatch, selectedFilm } = this.props;
    dispatch(selectFilm(selectedFilm === film ? null : film));
  }

  _setSortProp (sortProp)
  {
    const { dispatch } = this.props;
    dispatch(setSortProp(sortProp));
  }

  _sortFilms (films, sortProp)
  {
    return sortBy(films, film => film[sortProp])
  }

}
