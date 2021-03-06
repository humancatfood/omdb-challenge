import { get } from 'axios';
import map from 'lodash/map';
import React from 'react';
import { connect as reduxConnect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import FourOhFourContent from './../components/404';

import { fetchFilm, receiveFilm } from './../data/actions';
import { getFilm } from './../data/omdb-service';



@reduxConnect(
  store => ({
    selectedFilm: store.films.selectedFilm,
    fetchingFilm: store.films.fetchingFilm
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
    getFilm(filmId)
      .then(receiveFilm)
      .catch(window.alert);
  }

  render ()
  {
    const {selectedFilm, fetchingFilm} = this.props;

    if (fetchingFilm)
    {
      return this._renderLoading();
    }
    else if (selectedFilm)
    {
      return this._renderFilm(selectedFilm);
    }
    else
    {
      return this._render404();
    }

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
          {
            this._renderBackLink()
          }
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
                  <div key={ k } className="row">
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
          {
            this._renderBackLink()
          }
          <h2>Loading ..</h2>
        </header>
      </div>
    );
  }

  _render404 ()
  {
    return (
      <div className="container">
        <header className="page-header">
          {
            this._renderBackLink()
          }
          <h2>Loading .. Failed</h2>
        </header>
        <FourOhFourContent />
      </div>
    );
  }

  _renderBackLink ()
  {
    return (
      <div>
        <button className="btn btn-link" onClick={() => this.props.history.push('/')}>
          <span className="glyphicon glyphicon-hand-left" style={{'margin-right': '15px'}}/>
          Back to Search
        </button>
      </div>
    );
  }

}
