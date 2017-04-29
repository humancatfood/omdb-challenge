import { get } from 'axios';
import classNames from 'classNames';
import map from 'lodash/map';
import React from 'react';
import { connect as reduxConnect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';

import { fetchFilm, receiveFilm } from './../data/actions';



@reduxConnect(
  store => ({
    selectedFilm: store.films.selectedFilm,
    fetchingFilm: store.ui.sortProp
  }),
  {
    fetchFilm,
    receiveFilm
  }
)
@withRouter
export default class Film extends React.Component
{

  componentWillMount ()
  {
    const { fetchFilm, receiveFilm, filmId} = this.props;

    fetchFilm();

    get(`http://www.omdbapi.com/?i=${ filmId }&plot=full`)
      .then(response => receiveFilm(response.data))
      .catch((...args) => console.error(args));
  }

  render ()
  {
    const {selectedFilm} = this.props;
    return selectedFilm ? this._renderFilm(selectedFilm) : this._renderLoading();
  }

  _renderFilm ({ Title, Year, Country, Poster, Plot, Type, Genre, Director, Actors, Language, Released, Awards, imdbID })
  {
    const details = {
      Type,
      Genre,
      Director,
      Actors,
      Language,
      Released,
      Awards
    };

    const imdbLink = `http://www.imdb.com/title/${ imdbID }`;

    return (
      <div className="container">
        <header className="page-header">
          <h1>
            <span>{ Title }</span>
            <br/>
            <small>({ Country ? `${ Country }, ` : '' }{ Year })</small></h1>
        </header>
        <div className="row">
          <section className="text-center
                              col-xs-6
                              col-md-4">
            <img className="img img-thumbnail"
                 src={ Poster } alt={ Title } />
          </section>
          <section className="col-xs-6
                              col-md-8">

            <dl>
              {
                map(details, (v, k) => (
                  <div className="row">
                    <dt className="col-sm-3
                                   col-lg-2">
                      {k}:
                    </dt>
                    <dd className="col-sm-9
                                   col-lg-10">
                      {v}
                    </dd>
                  </div>
                ))
              }
              <hr/>
              <div className="row">
                <dt className="col-sm-12">Plot:</dt>
              </div>
              <div className="row">
                <dd className="col-sm-11 col-sm-offset-1">{ Plot }</dd>
              </div>
            </dl>
            <hr/>
            <div className="row">
              <dt className="col-sm-3
                             col-lg-2">
                IMDB:
              </dt>
              <dd className="col-sm-9
                             col-lg-10">
                <a href={imdbLink} target="_blank">{ imdbLink }</a>
              </dd>
            </div>

          </section>

        </div>
      </div>
    );
  }

  _renderLoading ()
  {
    return (
      <div className="container">
        <header className="page-header">
          <h2>Loading ..</h2>
        </header>
      </div>
    );
  }

}
