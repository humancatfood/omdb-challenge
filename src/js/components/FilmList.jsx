import { get } from 'axios';
import sortBy from 'lodash/sortBy';
import React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { selectFilm } from './../data/actions';

import FilmView from './FilmView';



@reduxConnect(
  store => ({
    films: store.films.films,
    selectedFilm: store.films.selectedFilm,
    sortProp: store.ui.sortProp
  }),
  {
    selectFilm
  }
)
export default class FilmList extends React.Component
{

  render ()
  {
    const { films, selectFilm, selectedFilm, sortProp } = this.props;

    const filmsToDisplay = films && films.length && this._sortFilms(films, sortProp) || [];

    return (
      <ul className="film-list">
        {
          filmsToDisplay.map(film => (
            <li onClick={ () => selectFilm(this._isSelected(film) ? null : film) }>
              <FilmView film={ film } isSelected={ this._isSelected(film) } />
            </li>
          ))
        }
      </ul>
    );
  }

  _sortFilms (films, sortProp)
  {
    return sortBy(films, film => film[sortProp])
  }

  _isSelected (film)
  {
    return film === this.props.selectedFilm;
  }

}
