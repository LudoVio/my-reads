import React from 'react'
import { Route } from 'react-router-dom'
import BooksList from './BooksList'
import BooksSearch from './BooksSearch'
import * as BooksAPI from '../utils/BooksAPI'
import '../css/BooksApp.css'

class BooksApp extends React.Component {
  state = {
    booksInShelfs: []
  }

  onShelfChange = (id, shelf) => {
    this.setState((state) => ({
      booksInShelfs: this.changeShelf(state.booksInShelfs, id, shelf)
    }));

    BooksAPI.update({id}, shelf);
  }

  changeShelf (originalsBooks, id, newShelf) {
    let newBooks = originalsBooks.slice();
    for (let book of newBooks) {
      if (book.id === id) {
        book.shelf = newShelf;
        break;
      }
    }

    return newBooks;
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
          <BooksSearch />
        )} />
      </div>
    )
  }
}

export default BooksApp
