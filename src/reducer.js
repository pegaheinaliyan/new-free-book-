
//var apiRounter= require('./routes/index')(express, services);
//let insertbook = require("../services/db/books/index.js")

let records = {};

export async function fetchBooks() {

	let response = await fetch('http://localhost:3001/books');
	response = await response.json();

	for (let record of response) {
		let book = {};
		book.id = record.id;
		book.ISBN = record.isbn;
		book.name = record.name;
		book.latitude = record.latitude;
		book.longitude = record.longitude;
		book.category = record.category;

		records[book.ISBN] = book;

	}

	console.log(response);
	return response;
}

  export async function saveBook (book){
    try {
      const postData = book;
      // APT post, save data in DB
      const savedBook= await ( await fetch('http://localhost:3001/books', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(postData)
			})).json();
			
			console.log("inside savebook")
    } catch (err) {
      console.log(err.message)
    }
  }



const initialState = {
	view: 'Home',
	ISBN: "",
	records: records,
	bookInfo: null
};


const reducer = (state = initialState, action) => {
	console.log("state", state);
	switch (action.type) {
		case 'ON_FIND_BOOK':
			return Object.assign({}, state, { view: 'findBook' });
		case 'ON_ADD_BOOK':
			return Object.assign({}, state, { view: 'addBook' });
		case 'FIND_BY_ISBN':
			return findByISBN(state, action);
		case 'ADD_NEW_BOOK':
			return addNewBook(state, action);
		case 'ON_ABOUT_US':
			return Object.assign({}, state, { view: 'aboutUs' })
		case 'BACK_HOME':
			return Object.assign({}, state, { view: "Home" })
		default:
			return state;
	}
};



const findByISBN = (state, action) => {
	let newState = Object.assign({}, state, { ISBN: action.ISBN });
	if (state.ISBN !== null) {
		if (newState.records.hasOwnProperty(newState.ISBN)) {
			newState.bookInfo = newState.records[newState.ISBN];
		}
		else {
			newState.bookInfo = { notfound: "unfortunately we don't have this book!" };
		}
	}
	return newState;
}

const addNewBook = (state, action) => {
	console.log(action.newBook,"action.newbook")
	let newState = Object.assign({}, state, { view: "SuccessfullAdd" });
	newState.records[action.newBook.ISBN] = action.newBook;
	saveBook(action.newBook);
	return newState;
}


export default reducer;