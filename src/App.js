import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
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
      shelfs:[
            {title: 'Currently Reading', value:'currentlyReading'},
            {title: 'Want to Read', value:'wantToRead'},
            {title: 'Read', value:'read'}
            ],
    books: []
  }

  updateState = () => {
    BooksAPI.getAll()
    .then((books) => this.setState({books}))
  }

  componentDidMount = () => {
    this.updateState();
  }

  changeShelf = (bookId, shelf) => {
    console.log("Change "+  +" to shelf "+ shelf)
    BooksAPI.get(bookId).then(bookToChange =>
      BooksAPI.update(bookToChange, shelf).then(this.updateState())
      );
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() =>
          <Search />
        } />

        <Route exact path="/" render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelfs.map(shelf =>
                  <BookShelf key={shelf.value}
                    books={this.state.books}
                    thisShelf={shelf}
                    shelfOptions={this.state.shelfs}
                    onShelfChange={this.changeShelf}/>
                )}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }/>
      </div>
    )
  }
}

export default BooksApp
