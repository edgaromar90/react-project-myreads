import React, { Component } from 'react'

class Book extends Component {

    handleChange = (event) => {
        this.props.onShelfChange(event.target.name, event.target.value)
    }

    render(){

        const { book } = this.props;
        /* Before the API call cover is '' and after we access the Image */
        const cover = (book !== []) ? book.imageLinks.thumbnail : '';

        return(
            <div className="book">
              <div className="book-top">
                <div className="book-cover"
                style={{ width: 128, height: 188, backgroundImage: `url("${cover}")` }}></div>
                <div className="book-shelf-changer">
                  <select name={book.id} value={book.shelf} onChange={this.handleChange}>
                    <option value="" disabled>Move to...</option>
                    {this.props.shelfOptions.map(shelf =>
                        <option key={shelf.value} value={shelf.value}
                        >{shelf.value}</option>
                    )}
                    <option value="none">None</option>
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