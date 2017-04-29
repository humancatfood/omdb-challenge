import { get } from 'axios';
import classNames from 'classNames';
import sortBy from 'lodash/sortBy';
import React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { selectFilm, setSortProp } from './../data/actions';



@reduxConnect(
  store => ({
    films: store.films.films,
    selectedFilm: store.films.selectedFilm,
    sortProp: store.ui.sortProp
  }),
  {
    selectFilm,
    setSortProp
  }
)
export default class FilmList extends React.Component
{

  render ()
  {
    const { films } = this.props;
    if (films && films.length)
    {
      return (
        <table className="table table-striped table-hover">
          {
            this._renderTableHeader()
          }
          {
            this._renderTableBody()
          }
        </table>
      );
    }
    else
    {
      return null;
    }
  }

  _sortFilms (films, sortProp)
  {
    return sortBy(films, film => film[sortProp])
  }

  _isSelected (film)
  {
    return film === this.props.selectedFilm;
  }

  _renderTableHeader ()
  {
    const { sortProp, setSortProp } = this.props;

    return (
      <thead>
        <tr className="row">
          <td className="col-xs-10">
            <button className="btn btn-link" onClick={() => setSortProp('Title')}>
              Title <span className={ classNames('glyphicon', {
                'glyphicon-sort-by-alphabet': sortProp === 'Title'
              }) } />
            </button>
          </td>
          <td className="col-xs-2 text-right">
            <button className="btn btn-link" onClick={() => setSortProp('Year')}>
              Year  <span className={ classNames('glyphicon', {
                'glyphicon-sort-by-order': sortProp === 'Year'
              }) } />
            </button>
          </td>

        </tr>
      </thead>
    );
  }

  _renderTableBody ()
  {
    const { films, sortProp, selectFilm } = this.props;
    const filmsToDisplay =  this._sortFilms(films, sortProp);

    return (
      <tbody>
        {
          filmsToDisplay.map(film => (
            <tr onClick={ () => selectFilm(this._isSelected(film) ? null : film) }
                className={ classNames('row', { info: this._isSelected(film )}) } >
              <td className="col-xs-10">
                { film.Title }
              </td>
              <td className="col-xs-2 text-right">
                ({ film.Year })
              </td>
            </tr>
          ))
        }
      </tbody>
    );
  }

}
