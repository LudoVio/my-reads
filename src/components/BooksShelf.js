import React, { Component } from 'react'
import BooksGrid from './BooksGrid'

class BookShelf extends Component {
  render () {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <BooksGrid books={this.props.books} onShelfChange={this.props.onShelfChange} />
        </div>
      </div>
    )
  }
}

export default BookShelf
