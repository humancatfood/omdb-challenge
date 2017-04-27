import { get } from 'axios';
import sortBy from 'lodash/sortBy';
import React from 'react';
import { connect as reduxConnect } from 'react-redux';



@reduxConnect(
  store => ({
    store
  })
)
export default class App extends React.Component
{

  constructor (props, context)
  {
    super(props, context);

    this.state = {
      sortType: 'TITLE',
      films: [ ],
      selectedFilm: null
    };
  }

  render ()
  {
    const { films, selectedFilm, sortType } = this.state;

    const filmsToDisplay = films && films.length && this._sortFilms(films, sortType) || [];


    return (
      <div>
        <h1>Film Search</h1>

        <input id="search-input" type="text" placeholder="Search..." onChange={ e => this._search(e.currentTarget.value) }/>

        <span>sort:</span>
        <input id="title-input" type="radio" name="sort-group"
               value="TITLE"
               checked={sortType === 'TITLE'}
               onChange={() => this.setState({sortType: 'TITLE'})} />
        <label htmlFor="title-input">Title</label>,

        <input id="date-input" type="radio" name="sort-group"
               value="DATE"
               checked={sortType === 'DATE'}
               onChange={() => this.setState({sortType: 'DATE'})} />
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

  _search (term)
  {
    get(`http://www.omdbapi.com/?s=${ term }`)
      .then(response => {
        this.setState({
          films: response.data && response.data.Search
        });
      })
      .catch(console.error);
  }

  _selectFilm (film)
  {
    this.setState({
      selectedFilm: this.state.selectedFilm === film ? null : film
    });
  }

  _sortFilms (films, sortType)
  {
    let sortProp;
    switch ( sortType )
    {
      case 'DATE':
        sortProp = 'Year';
        break;
      case 'TITLE':
      default:
        sortProp = 'Title';
        break;
    }

    return sortBy(films, film => film[sortProp])

  }

}
