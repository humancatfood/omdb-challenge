import { get } from 'axios';
import React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { searchFilms, receiveFilms, setSortProp } from './../data/actions';



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
    return (
      <form className="form row">

        <div className="form-group
                        col-xs-12
                        col-sm-8 col-sm-offset-2">
          <label className="input-group">
            <input id="search-input" className="form-control" type="text" placeholder="Search..."
                   onChange={ e => this._search(e.currentTarget.value) }/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button"><span className="glyphicon glyphicon-search" /></button>
            </span>
          </label>
        </div>

      </form>
    );
  }

  _search (searchterm)
  {
    const { searchFilms, receiveFilms } = this.props;

    searchFilms(searchterm);
    get(`http://www.omdbapi.com/?s=${ searchterm }`)
      .then(response => receiveFilms(response.data && response.data.Search))
      .catch((...args) => console.error(args));
  }

}
