import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
    render(){
        const { thisShelf } = this.props;
        return(
            <div className="bookshelf">
              <h2 className="bookshelf-title">{thisShelf.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {(this.props.books) &&
                    (this.props.books.filter(book => book.shelf === thisShelf.value).map(book =>
                        <li key={book.id}>
                            <Book book={book}
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

export default BookShelf;