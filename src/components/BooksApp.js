/*
# BooksApp

Root component. It represents the app.

Using BooksList and BooksSearch.
*/

import React from 'react'
import { Route } from 'react-router-dom'
import jsonQuery from 'json-query'
import BooksList from './BooksList'
import BooksSearch from './BooksSearch'
import * as BooksAPI from '../utils/BooksAPI'
import '../css/BooksApp.css'

class BooksApp extends React.Component {
  state = {
    booksInShelfs: [],
    booksInSearch: []
  }

  onShelfChange = (id, shelf) => {
    let booksInSearch = this.changeShelf(this.state.booksInSearch, id, shelf);
    let booksInShelfs = this.changeShelf(this.state.booksInShelfs, id, shelf);

    // If it was not in state.booksInShelfs, add it, so we can see the change
    // if we navigate to the home page without refetching the data
    let resultShelfs = jsonQuery(`[id=${id}]`, {
      data: booksInShelfs
    });
    if (!resultShelfs.value) {
      let resultSearch = jsonQuery(`[id=${id}]`, {
        data: booksInSearch
      });
      if (resultSearch.value) {
        booksInShelfs.push(Object.assign({}, resultSearch.value));
      }
    }

    this.setState((state) => ({booksInShelfs, booksInSearch}));
    BooksAPI.update({id}, shelf);
  }

  changeShelf (originalsBooks, id, newShelf) {
    let newBooks = originalsBooks.slice();
    let result = jsonQuery(`[id=${id}]`, {
      data: newBooks
    });
    if (result.value) {
      result.value.shelf = newShelf;
    }

    return newBooks;
  }

  onQueryChange = (query) => {
    if (!query) {
      this.setState({booksInSearch: []});
      return;
    }

    BooksAPI.search(query, 20).then((booksInSearch) => {
      if(booksInSearch === undefined || booksInSearch.error) {
        this.setState({booksInSearch: []});
        return;
      }

      // The books 'shelf' properties kept the last values they got before
      // 'none', even if they don't show in the 'getAll()' endpoints, so update
      // them all
      for (let bookInSearch of booksInSearch) {
        let found = false;
        for (let bookInShelfs of this.state.booksInShelfs) {
          if (bookInSearch.id === bookInShelfs.id) {
            bookInSearch.shelf = bookInShelfs.shelf;
            found = true;
            break;
          }
        }

        if (!found) {
          bookInSearch.shelf = 'none';
        }
      }

      this.setState({booksInSearch});
    }).catch((error) => {
      console.log('ops!', error);
      this.setState({booksInSearch: []});
    });
  }

  componentDidMount () {
    BooksAPI.getAll().then((booksInShelfs) => {
      this.setState({booksInShelfs})
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksList
            books={this.state.booksInShelfs}
            onShelfChange={this.onShelfChange}
          />
        )} />

        <Route exact path="/search" render={() => (
          <BooksSearch
            books={this.state.booksInSearch}
            onShelfChange={this.onShelfChange}
            onQueryChange={this.onQueryChange}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
