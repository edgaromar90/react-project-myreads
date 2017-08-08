import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
      shelves:[//If later another shelf was needed we could just add it right here
            {title: 'Currently Reading', value:'currentlyReading'},
            {title: 'Want to Read', value:'wantToRead'},
            {title: 'Read', value:'read'}
            ],
      books: [], //State for the Local Books
      booksFound: [] //State for the Search Result
  }


  matchLocalShelves = (localBooks, bookFound) => {
    bookFound.shelf = "none"
    for(const localBook of localBooks){
      //If the book from the search is Found we modify it
      if(bookFound.id === localBook.id){
        bookFound.shelf = localBook.shelf
      }
    }
    return bookFound
  }

  searchBooks = (query, maxResult=100) => {
    BooksAPI.search(query, maxResult).then(booksFound =>{
      booksFound = booksFound.map(bookFound =>
        this.matchLocalShelves(this.state.books, bookFound)
      )
      //When we have BooksFound with the appropriate shelves we Update the State
      this.setState({booksFound})
    })
  }

  componentDidMount = () => {
    BooksAPI.getAll()
    .then(books => this.setState({books}))
  }

  changeShelf = (bookId, shelf) => {
    BooksAPI.get(bookId).then(bookToChange => {
      BooksAPI.update(bookToChange, shelf).then(response => {
        bookToChange.shelf = shelf
        this.setState(prevState => (
          {books: prevState.books.filter(book => book.id !== bookId).concat(bookToChange)}
          ))
        }
      )
    })
  }

  render() {

    const { books, booksFound, shelves } = this.state;

    return (
      <div className="app">
        <Route exact path="/search" render={() =>
          <Search
            searchBooks={this.searchBooks}
            books={booksFound}
            shelfOptions={shelves}
            onShelfChange={this.changeShelf}/>
        }/>

        <Route exact path="/" render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map(shelf =>
                  <BookShelf key={shelf.value}
                    books={books}
                    thisShelf={shelf}
                    shelfOptions={shelves}
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
