import React, { Component } from 'react'
import Book from './Book'
import sortBy from 'sort-by'

class BooksGrid extends Component {
  render () {
    // Sort the books so the order is consistant across reload
    this.props.books.sort(sortBy('title'))

    return (
      <ol className="books-grid">
        {this.props.books && this.props.books.map((book, index) =>
          <li key={book.id}>
            <Book data={book} onShelfChange={this.props.onShelfChange} />
          </li>
        )}
      </ol>
    )
  }
}

export default BooksGrid
