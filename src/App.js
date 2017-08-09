import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'

/**
* @description This is the Main Component of the application. From here
* we render the main page "/" with the books that are in our shelves.
* Each book has the option to be transfer to other shelf or be removed
* from the collection (by selecting NONE). There's a Link that will take
* you to "/search" where you can select more books and add them to your
* own shelf, "Want to Read" for example.
*
* Note: The Data is persistent!
*/
class BooksApp extends Component {
  /**
  ***** shelves - an array of objects with "Title" and "Value" of each shelf.
  ***** books - an empty array of objects that will contain the books in shelves.
  ***** booksFound - an empty array of objects that will contain the result of a search.
  */
  shelves = [
    {title: 'Currently Reading', value:'currentlyReading'},
    {title: 'Want to Read', value:'wantToRead'},
    {title: 'Read', value:'read'}
  ]

  state = {
    books: [],
    booksFound: []
  }

  /**
  * @description Adds a new property "shelf" with a default value of "none".
  * If bookFound is in our localBooks then we change the shelf property to
  * match our local shelf value.
  * @param {array} localBooks - the books in state
  * @param {object} bookFound - the book found with the Search API call
  * @returns {object} bookFound with the right shelf property
  */
  matchLocalShelves = (localBooks, bookFound) => {
    bookFound.shelf = 'none';
    for(const localBook of localBooks){
      if(bookFound.id === localBook.id){
        bookFound.shelf = localBook.shelf;
      }
    }
    return bookFound;
  }

  /**
  * @description Update the state of booksFound but first changing each
  * bookFound, by calling matchLocalShelves(), to have a shelf property
  * depending on our book's state.
  * @param {array} booksFound - list of books fetched by the API
  */
  updateBooksFound = (booksFound) => {
    this.setState(
      {
        booksFound: booksFound.map(bookFound =>
          this.matchLocalShelves(this.state.books, bookFound))
      }
    );
  }

  /**
  * @description Sends the query along with the maxResult to the BooksAPI, then
  * a list of books is received (if found). We pass those books to the
  * updateBooksFound() function.
  * @param {string} query - values entered by the user
  * @param {number} maxResult - limit the number of results from the API
  */
  searchBooks = (query, maxResult=20) => {
    BooksAPI.search(query, maxResult).then(booksFound => {
      this.updateBooksFound(booksFound)
    })
  }

  /**
  * @description every time the component gets mounted we fetch data from
  * the API, then we update our books state.
  */
  componentDidMount(){
    BooksAPI.getAll().then(books => this.setState({books}))
  }

  /**
  * @description Using the get method of the BooksAPI we fetch the book
  * that's going to be changed. After that we use the update method of the
  * API to change the book's shelf property in the server. Then we make
  * update the state with the correct shelf.
  * @param {number} bookId - id of the targerted book
  * @param {string} shelf - the shelf that we want to change the book to
  */
  changeShelf = (bookId, shelf) => {
    BooksAPI.get(bookId).then(bookToChange => {
      BooksAPI.update(bookToChange, shelf).then(response => {
        bookToChange.shelf = shelf;
        this.setState(prevState => (
          {books: prevState.books.filter(book => book.id !== bookId).concat(bookToChange)}
        ));
      })
    })
  }

  render() {

    //Destructuring the props object
    const { books, booksFound } = this.state;

    return (
      <div className="app">
        <Route exact path="/search" render={() =>
          <Search
            searchBooks={this.searchBooks}
            books={booksFound}
            shelfOptions={this.shelves}
            onShelfChange={this.changeShelf}/>
        }/>

        <Route exact path="/" render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {/**
                * Filter the books that doesn't belong to this shelf. After
                * that we're left with the correct list of books, we map
                * over that list and create a new Book Component for each one
                * of them. Passing:
                *** books - the array of books it self
                *** shelfOptions - the options for changing the shelves
                *** onShelfChange - Function to change between Shelves
                */}
                {this.shelves.map(shelf =>
                  <BookShelf key={shelf.value}
                    books={books}
                    thisShelf={shelf}
                    shelfOptions={this.shelves}
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