import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
    render(){
        const { shelfTitle } = this.props;
        return(
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelfTitle}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {(this.props.books) &&
                    (this.props.books.filter(
                        book => book.shelf.toLowerCase() === shelfTitle.split(' ').join('').toLowerCase()).map(
                        book => <li key={book.title}><Book book={book} shelfOptions={this.props.shelfOptions}/></li>))}
                </ol>
              </div>
            </div>
        )
    }
}

export default BookShelf;