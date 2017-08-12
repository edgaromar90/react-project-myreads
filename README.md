# My Reads
This App allows you to have a collection of books in different categories, where you can move your books from one category to another. There's also a search that allows you to find more books and add them to your personal collection.

_**Note:**_ This App was created using facebook tool `create-react-app`.

## Prerequisites
You'll need to install **Node.js** and **npm** first.
* [Node + npm](https://nodejs.org/en/download/)

**Caveat:** You need at least Node v6.

## Installing
1. Clone this Repo
`git clone https://github.com/edgaromar90/react-project-myreads.git myReads`
The **`myReads`** is optional. You can change the directory name.

2. After cloning this repository, go inside the directory
`cd myReads`

3. Once inside the main directory install all the dependencies with
`npm install`

4. After you have installed all the dependencies you just need to start the app
`npm start`

The App should be running in **`localhost:3000`**

If you want more information on all the dependencies that will be needed for this App you can take a look at this file **`package.json`**.

## More about this project
This is the final assessment project for [Udacity's React Fundamentals course](https://www.udacity.com/course/react-nanodegree--nd019), developed by [React Training](https://reacttraining.com/). They provided a [template](https://github.com/udacity/reactnd-project-myreads-starter) for this App, which saved me time by giving me a static example of the CSS and HTML markup that may be used, but without any of the React code was is needed to complete the project.

I had to separate all the HTML in to separate Components, including Stateless Functional Components and Controlled Components, also used LifeCycle events to handle calls to the API and many more concepts. If you want to know more about this app feel free to dig into the code, everything is very well documented.

For more information about React visit the [Official Documentation](https://facebook.github.io/react/docs/hello-world.html) and consider the **Udacity's React Nanodegree**.

## Backend Server
To simplify the development process, udacity provided a backend server to develop against. The provided file **`BooksAPI.js`** contains the the following methods used to fetch and alter the data in the server:

##### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

##### `update(book, shelf)`
* book: `<Object>` containing at minimum an id attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

##### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

##### `get(bookId)`
* bookId: `<Integer>`
* Returns a Promise which resolves to a JSON object containing the book matching the id provided (If it exists).
* This method only get books from your personal collection (the ones in your shelves).

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in SEARCH_TERMS.md. That list of terms are the only terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## create-react-app
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Developed by
_Edgar Henriquez R._