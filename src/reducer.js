
//var apiRounter= require('./routes/index')(express, services);
//let insertbook = require("../services/db/books/index.js")

let records = {};

export async function fetchBooks() {

	let response = await fetch('http://localhost:3001/books');
	response = await response.json();

	for (let record of response) {
		let book = {};
		book.id = record.id;
		book.isbn = record.isbn;
		book.name = record.name;
		book.latitude = record.latitude;
		book.longitude = record.longitude;
		book.category = record.category;

		records[book.id] = book;

	}

	console.log(response);
	return records;
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
	isbn: "",
	records: records,
	bookInfo: null
};


const reducer = (state = initialState, action) => {

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
	let newState = Object.assign({}, state, { isbn: action.isbn });
	console.log("state.records",state.records)
	if (state.isbn !== null) {
		// if (newState.records.hasOwnProperty(newState.isbn)) {
		// 	newState.bookInfo = newState.records[newState.isbn];
		// }
		// else {
		// 	newState.bookInfo = { notfound: "unfortunately we don't have this book!" };
		// }
		for(let id in newState.records ){
			console.log("newState.records[id].isbn",newState.records[id].isbn)
			console.log("newState.isbn",newState.isbn);
			console.log(typeof newState.isbn)
			if(newState.records[id].isbn.toString() ===  newState.isbn){
				
				console.log('hey')
				newState.bookInfo = newState.records[id];
				return newState
			}
			else {
				newState.bookInfo = { notfound: "unfortunately we don't have this book!" };
			}
		}
	}
	return newState;
}

const addNewBook = (state, action) => {
	console.log(action.newBook,"action.newbook")
	console.log(action.newBook.isbn,"isbn")
	let newState = Object.assign({}, state, { view: "SuccessfullAdd" });
	saveBook(action.newBook);
	newState.records[action.newBook.isbn] = action.newBook;

	return newState;
}


export default reducer;