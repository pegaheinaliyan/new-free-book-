

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


	return records;
}

export async function saveBook(book) {
	try {
		const postData = book;
		// APT post, save data in DB
		const savedBook = await (await fetch('http://localhost:3001/books', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData)
		})).json();


	} catch (err) {

	}
}

export async function deleteBook(book) {

	try {
		const deleteData = book;
		// APT delete, delete data in DB
		const deletedId = await (await fetch('http://localhost:3001/books', {
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(deleteData)
		})).json();

	} catch (err) {

	}
}


const initialState = {
	view: 'Home',
	isbn: "",
	category: "",
	records: records,
	bookInfo: []
};


const reducer = (state = initialState, action) => {

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
			return pickBook(state, action);
		case 'ON_ABOUT_US':
			return Object.assign({}, state, { view: 'aboutUs' })
		case 'BACK_HOME':
			return Object.assign({}, state, { view: "Home" }, { isbn: "", category: "", bookInfo: [] })
		default:
			return state;
	}
};



const findByISBN = (state, action) => {
	let newState = Object.assign({}, state, { isbn: action.isbn });

	if (state.isbn !== null) {
		for (let id in newState.records) {
			if (newState.records[id].isbn.toString() === newState.isbn) {
				newState.bookInfo[0] = newState.records[id];
				return newState
			}
			else {
				newState.bookInfo[0] = { notfound: "unfortunately we don't have this book!" };
			}
		}
	}
	return newState;
}

const findByCATEGORY = (state, action) => {
	let newState = Object.assign({}, state, { category: action.category }, { isbn: "", bookInfo: [] });
	let found = false;


	if (newState.category !== null) {
		for (let id in newState.records) {


			if (newState.records[id].category === action.category) {
				found = true;
				newState.bookInfo.push((newState.records[id]));

			}

		}
	}
	if (!found) {
		newState.bookInfo[0] = { notfound: "unfortunately we don't have this book!" };
	}

	return newState;
}


const addNewBook = (state, action) => {

	let newState = Object.assign({}, state, { view: "SuccessfullAdd" });
	saveBook(action.newBook);
	newState.records[Number(action.newBook.isbn)] = action.newBook;

	return newState;
}

const pickBook = (state, action) => {
	let newState = Object.assign({}, state, { view: "Home" });

	deleteBook(state.bookInfo[0]);

	//to be checked *******************

	delete newState.records[newState.bookInfo[0].id];
	console.log("records", newState.records)

	newState.isbn = ""
	newState.category = ""
	return newState;
}


export default reducer;