import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book';
import PropTypes from 'prop-types';

/**
* @description Component will render search bar allowing the user to
* enter some text that you'll be then passed to a function that will
* fetch books based on the query. When books are found they're
* rendered below the search bar.
*/
class Search extends Component {

  state = {
    query: ''
  }

  /**
  * @description We're using a controlled component, so here
  * we can update that component to reflect the changes in the
  * input field.
  * @param {string} query -The text that the user types in.
  */
  updateQuery = (query) => {
    this.setState({query});
  }

  /**
  * @description Pass the query to the searchBooks function
  * defined in App.js.
  * @param {string} query -The text that the user types in.
  */
  handleBookSearch = (query) => {
    (query && this.props.searchBooks(query));
  }

  render(){

    //Destructuring the props object
    const { books, shelfOptions, onShelfChange } = this.props;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => {
                this.updateQuery(e.target.value);
                this.handleBookSearch(e.target.value);
              }}/>
          </div>
        </div>
        {/**
          * We map over the list of books found (if any) and create
          * a new Book Component for each one of them.
          * Passing:
          *** book - the book it self
          *** shelfOptions - the options for changing the shelves
          *** onShelfChange - Function to change between Shelves
          */}
        <div className="search-books-results">
          <ol className="books-grid">
          {(books) && (books.map(book =>
            <li key={book.id}>
              <Book
                book={book}
                shelfOptions={shelfOptions}
                onShelfChange={onShelfChange}/>
            </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  books: PropTypes.array.isRequired,
  shelfOptions: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  searchBooks: PropTypes.func.isRequired
}

export default Search;