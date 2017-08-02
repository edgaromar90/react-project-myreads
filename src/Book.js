import React, { Component } from 'react'

class Book extends Component {

    render(){

        const { book } = this.props;
        const cover = (book !== []) ? book.imageLinks.thumbnail : '';

        return(
            <div className="book">
              <div className="book-top">
                <div className="book-cover"
                style={{ width: 128, height: 188, backgroundImage: `url("${cover}")` }}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf.toLowerCase()} onChange={() => {}}>
                    <option value="none" disabled>Move to...</option>
                    {this.props.shelfOptions.map(option =>
                        <option key={option} value={option.split(' ').join('').toLowerCase()}//Easier to Match with <select value>
                        >{option}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

export default Book;