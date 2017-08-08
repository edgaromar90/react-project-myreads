import React, { Component } from 'react'
import Book from './Book'

//CONVERT THIS TO A FUNCTIONAL COMPONENT
class BookShelf extends Component {
    render(){
        const { books, thisShelf, shelfOptions, onShelfChange } = this.props;
        return(
            <div className="bookshelf">
              <h2 className="bookshelf-title">{thisShelf.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {(books) &&
                    (books.filter(book => book.shelf === thisShelf.value).map(book =>
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

export default BookShelf;