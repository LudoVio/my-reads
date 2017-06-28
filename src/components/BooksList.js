/*
# BooksList

Represent the home screen.

Using BooksShelf.
Used by BooksApp.
*/

import React, { Component } from 'react'
import BooksShelf from './BooksShelf'
import { Link } from 'react-router-dom'

class BooksList extends Component {
  render () {
    const books = this.props.books || [];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            <BooksShelf
              shelfTitle="Currently Reading"
              books={books.filter((book) => book.shelf === 'currentlyReading')}
              onShelfChange={this.props.onShelfChange}
            />

            <BooksShelf
              shelfTitle="Want to Read"
              books={books.filter((book) => book.shelf === 'wantToRead')}
              onShelfChange={this.props.onShelfChange}
            />

            <BooksShelf
              shelfTitle="Read"
              books={books.filter((book) => book.shelf === 'read')}
              onShelfChange={this.props.onShelfChange}
            />
          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksList
