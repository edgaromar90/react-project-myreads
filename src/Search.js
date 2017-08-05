import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends Component {

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query})
    }

    handleBookSearch = (event) => {
        (event.target.value &&
        this.props.searchBooks(event.target.value))
        this.updateQuery(event.target.value)
    }

    render(){
        const { books } = this.props

        return(
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text"
                    placeholder="Search by title or author"
                    value={this.state.query}
                    onChange={this.handleBookSearch}/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                    {(books || books !== undefined) && (
                    books.map(book =>
                      <li key={book.id}><Book book={book}
                            shelfOptions={this.props.shelfOptions}
                            onShelfChange={this.props.onShelfChange}/>
                        </li>
                    ))}
                </ol>
              </div>
            </div>
        )
    }
}

export default Search;