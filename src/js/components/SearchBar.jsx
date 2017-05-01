import debounce from 'lodash/debounce';
import React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { searchFilms, receiveFilms, setSortProp } from './../data/actions';

import { getFilmList } from './../data/omdb-service';


@reduxConnect(
  store => ({
    sortProp: store.ui.sortProp
  }),
  {
    setSortProp,
    searchFilms,
    receiveFilms
  }
)
export default class SeachBar extends React.Component
{

  render ()
  {
    const onSearch = this._onSearch.bind(this);
    return (
      <form className="form row" onSubmit={ onSearch }>

        <div className="form-group
                        col-xs-12
                        col-sm-8 col-sm-offset-2">
          <label className="input-group">
            <input id="search-input" className="form-control" type="text" placeholder="Search..."
                   onChange={ onSearch }
                   ref="input" />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button"><span className="glyphicon glyphicon-search" /></button>
            </span>
          </label>
        </div>

      </form>
    );
  }

  componentDidMount ()
  {
    this.refs.input.focus();
  }

  _onSearch (e)
  {
    e.preventDefault();

    // With more time I'd factor this whole debounced circus into a much cleverer omdb-service
    const debounced = this.debouncedSearch || (this.debouncedSearch = debounce(this._search.bind(this), 500));

    const searchTerm = this.refs.input.value;
    this.props.searchFilms(searchTerm);
    debounced(searchTerm);
  }

  _search (searchTerm)
  {
    getFilmList(searchTerm)
      .then(this.props.receiveFilms)
      .catch(window.alert);
  }

}
