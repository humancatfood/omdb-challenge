import { get } from 'axios';
import classNames from 'classNames';
import orderBy from 'lodash/orderBy';
import React from 'react';
import { connect as reduxConnect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FourOhFourContent from './../components/404';

import { setSortProp } from './../data/actions';



@reduxConnect(
  store => ({
    films: store.films.films,
    selectedFilm: store.films.selectedFilm,
    searchingFilms: store.films.searchingFilms,
    searchTerm: store.films.searchTerm,
    sortProp: store.ui.sortProp,
    reverse: store.ui.reverse,
  }),
  {
    setSortProp
  }
)
@withRouter
export default class FilmList extends React.Component
{

  render ()
  {
    const { films, searchingFilms, searchTerm } = this.props;
    if (searchingFilms)
    {
      return (
        <p>Searching for films matching <strong>{ searchTerm }</strong> ..</p>
      );
    }
    else if (films && films.length)
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
    else if (searchTerm)
    {
      return (
        <FourOhFourContent />
      );
    }
    else
    {
      return null;
    }
  }

  _renderTableHeader ()
  {
    const { sortProp, reverse } = this.props;

    return (
      <thead>
        <tr className="row">
          <td className="col-xs-1" />
          <td className="col-xs-9">
            <button className="btn btn-link" onClick={() => this._setSortProp('Title')}>
              Title <span className={ classNames('glyphicon', {
                'glyphicon-sort-by-alphabet': sortProp === 'Title',
                'glyphicon-sort-by-alphabet-alt': sortProp === 'Title' && reverse
              }) } />
            </button>
          </td>
          <td className="col-xs-2 text-right">
            <button className="btn btn-link" onClick={() => this._setSortProp('Year')}>
              Year  <span className={ classNames('glyphicon', {
                'glyphicon-sort-by-order': sortProp === 'Year',
                'glyphicon-sort-by-order-alt': sortProp === 'Year' && !reverse
              }) } />
            </button>
          </td>

        </tr>
      </thead>
    );
  }

  _renderTableBody ()
  {
    const { films, sortProp, reverse } = this.props;
    const filmsToDisplay =  this._sortFilms(films, sortProp, reverse);

    return (
      <tbody>
        {
          filmsToDisplay.map(film => (
            <tr key={ film.imdbID }
                onClick={ () => this._selectFilm(film) }
                className={ classNames('film-list-entry row', { info: this._isSelected(film )}) } >
              <td className="col-xs-1">
                <img className="img img-thumbnail" src={ film.Poster } alt={ film.Title } />
              </td>
              <td className="col-xs-9">
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

  _sortFilms (films, sortProp, reverse)
  {
    return orderBy(films, sortProp, reverse ? 'desc' : 'asc');
  }

  _isSelected (film)
  {
    return film === this.props.selectedFilm;
  }

  _selectFilm (film)
  {
    this.props.history.push(`/film/${ film.imdbID }`);
  }

  _setSortProp (newSortProp)
  {
    const { sortProp, reverse, setSortProp } = this.props;

    setSortProp(
      newSortProp,
      newSortProp === sortProp ? !reverse : reverse
    );
  }

}
