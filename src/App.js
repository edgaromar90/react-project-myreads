import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    shelfs: [
            'Currently Reading', //currentlyReading
            'Want to Read', //wantToRead
            'Read', //read
            'None'
        ],
    books: []
  }

  componentDidMount = () => {
    BooksAPI.getAll()
    .then((books) => this.setState({books}))
  }

  render() {
    return (
      <div className="app">
        <Search />
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelfs.filter(shelf => shelf !== 'None').map(shelf =>
                  <BookShelf key={shelf} books={this.state.books} shelfTitle={shelf} shelfOptions={this.state.shelfs}/>
                )}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp
