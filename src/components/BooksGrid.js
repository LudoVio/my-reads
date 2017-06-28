/*
# BooksGrid

Represent a list of Book.

Using Book.
Used by BooksShelf and BooksSearch.
*/

import React, { Component } from 'react'
import Book from './Book'
import sortBy from 'sort-by'

class BooksGrid extends Component {
  render () {
    let books = this.props.books || [];

    // Sort the books so the order is consistant across reload
    books.sort(sortBy('title'));

    return (
      <ol className="books-grid">
        {books.map((book, index) =>
          <li key={book.id}>
            <Book data={book} onShelfChange={this.props.onShelfChange} />
          </li>
        )}
      </ol>
    )
  }
}

export default BooksGrid
