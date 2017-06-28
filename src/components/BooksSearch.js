/*
# BooksSearch

Represent the search screen.

Using BooksGrid.
Used by BooksApp.
*/

import React, { Component } from 'react'
import BooksGrid from './BooksGrid'
import { Link } from 'react-router-dom'

class BooksSearch extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    this.props.onQueryChange(query);
  }

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <BooksGrid books={this.props.books} onShelfChange={this.props.onShelfChange} />
        </div>
      </div>
    )
  }
}

export default BooksSearch
