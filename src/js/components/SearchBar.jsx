import { get } from 'axios';
import React from 'react';
import { connect as reduxConnect } from 'react-redux';

import { searchFilms, receiveFilms, setSortProp } from './../data/actions';



@reduxConnect(
  store => ({
    sortProp: store.ui.sortProp
  })
)
export default class SeachBar extends React.Component
{

  render ()
  {
    const { sortProp } = this.props;

    return (
      <div>
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

  _setSortProp (sortProp)
  {
    const { dispatch } = this.props;
    dispatch(setSortProp(sortProp));
  }

}
