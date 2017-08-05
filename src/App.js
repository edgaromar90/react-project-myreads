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
      shelfs:[//If later another shelf was needed we could just add it right here
            {title: 'Currently Reading', value:'currentlyReading'},
            {title: 'Want to Read', value:'wantToRead'},
            {title: 'Read', value:'read'}
            ],
      books: [], //State for the Local Books
      booksFound: [] //State for the Search Result
  }

  updateState = () => {
    BooksAPI.getAll()
    .then(books => this.setState({books}))
  }

  searchBooks = (query, maxResult=100) => {
    BooksAPI.search(query, maxResult).then(booksFound =>{
      booksFound = booksFound.map(bookFound => {
        for(const localBook of this.state.books){
          if(bookFound.id === localBook.id){
            bookFound.shelf = localBook.shelf
            //If the book from the search is Found we modify it and return it
            return bookFound
          }
        }
        //If the book is never found is because we don't have it so we set it to none
        bookFound.shelf = "none"
        return bookFound
      })
      //At the end we Update the State
      this.setState({booksFound})
    })
  }

  componentDidMount = () => {
    this.updateState();
  }

  changeShelf = (bookId, shelf) => {
    BooksAPI.get(bookId).then(bookToChange =>
      BooksAPI.update(bookToChange, shelf).then(this.updateState())
      );
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() =>
          <Search
            searchBooks={this.searchBooks}
            books={this.state.booksFound}
            shelfOptions={this.state.shelfs}
            onShelfChange={this.changeShelf}/>
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

export default BooksApp;
