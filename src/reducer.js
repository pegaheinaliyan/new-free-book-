
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
	
	export async function deleteBook(book) {

    try {
				const deleteData = book;
      // APT delete, delete data in DB
      const deletedId = await ( await fetch('http://localhost:3001/books', {
        method: 'delete',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(deleteData)
      })).json();

    } catch (err) {
      console.log(err.message)
    }
  }


const initialState = {
	view: 'Home',
	isbn: "",
	category:"",
	records: records,
	bookInfo: null
};


const reducer = (state = initialState, action) => {
	console.log('state= ',state)
	switch (action.type) {
		case 'ON_FIND_BOOK':
			return Object.assign({}, state, { view: 'findBook' });
		case 'ON_ADD_BOOK':
			return Object.assign({}, state, { view: 'addBook' });
		case 'FIND_BY_ISBN':
			return findByISBN(state, action);
			case 'FIND_BY_CATEGORY':
			return findByCATEGORY(state, action);
		case 'ADD_NEW_BOOK':
			return addNewBook(state, action);
			case 'DELETE_BOOK':
			return  pickBook(state, action);
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
		for(let id in newState.records ){
			if(newState.records[id].isbn.toString() ===  newState.isbn){
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

const findByCATEGORY = (state, action)=>{
let newState = Object.assign({}, state, { category: action.category });

console.log("state.records",state.records)
console.log("newstate.records",newState.records)

if (state.category !== null) {
		for(let id in state.records ){
			if(state.records[id].category ===  action.category){
				newState.bookInfo=(newState.records[id]);
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

const pickBook=(state,action) =>{
	let newState= Object.assign({}, state, { view: "Home" });
	deleteBook(state.bookInfo);
	//to be checked *******************
	console.log("newState.records[newState.bookInfo.id]",newState.records[newState.bookInfo.id])
	delete newState.records[newState.bookInfo.id];
	console.log("records", newState.records)
	//newState.bookInfo = null
	newState.isbn = ""
	newState.category = ""
	return newState;
}


export default reducer;