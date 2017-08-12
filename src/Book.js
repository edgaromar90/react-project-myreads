import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
* @description Component will render a single book with shelf-changer
* allowing us to move a book to another shelf.
*
* Note: The shelf selector has the default value of each particular book.
* Meaning that the shelf where it is stored will be highlighted.
*/
class Book extends Component {

  /**
  * @description Pass the params to the onShelfChange function
  * @param {number} bookId -The id of the selected book
  * @param {string} shelf - The value of the selected shelf
  * which is formated to match the value of API's shelf property
  * of each book -- e.g., for Want to Read -> wantToRead
  */
  handleChange = (bookId, shelf) => {
    this.props.onShelfChange(bookId, shelf);
  }

  render(){

    //Destructuring the props object
    const { book, shelfOptions } = this.props;
    /**
    * Before the call to the API, book is empty so we assign cover
    * an empty string. Once the component is mounted we get Data from
    * the API and we can access one of the Images in book.imageLinks
    */
    const cover = (!!book && book.imageLinks) ? book.imageLinks.thumbnail : '';

    return(
      (book !== []) &&
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${cover}")` }}></div>
          <div className="book-shelf-changer">
            {/* book.id and the selected shelf are send it to the handleChange method. */}
            <select name={book.id} value={book.shelf} onChange={(e) =>
              this.handleChange(e.target.name, e.target.value)}>
              {/**
              * First option is just for the title which is disabled,
              * and the last one is the default to None (remove from
              * collection). We received shelfOptions and generate
              * them dinamically (If later we add another shelf we just
              * need to modify the array of objects in App.js). So we map
              * over the shelfOptions and create an <option> with each one.
              */}
              <option disabled>Move to...</option>
              {shelfOptions.map(shelf =>
                <option key={shelf.value} value={shelf.value}>{shelf.value}</option>
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

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelfOptions: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

export default Book;