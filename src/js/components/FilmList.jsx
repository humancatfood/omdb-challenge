import { get } from 'axios';
import sortBy from 'lodash/sortBy';
import React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { selectFilm, setSortProp } from './../data/actions';

import FilmView from './FilmView';



@reduxConnect(
  store => ({
    films: store.films.films,
    selectedFilm: store.films.selectedFilm,
    sortProp: store.ui.sortProp
  })
)
export default class FilmList extends React.Component
{

  render ()
  {
    const { films, selectedFilm, sortProp } = this.props;

    const filmsToDisplay = films && films.length && this._sortFilms(films, sortProp) || [];

    return (
      <ul className="film-list">
        {
          filmsToDisplay.map(film => (
            <li>
              <FilmView film={ film }
                        onSelect={ () => this._selectFilm(film) }
                        isSelected={ selectedFilm === film } />
            </li>
          ))
        }
      </ul>
    );
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
