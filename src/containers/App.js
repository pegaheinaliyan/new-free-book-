import {connect} from 'react-redux';
import App from '../components/App';
import {onFindBook, onAddBook, findByISBN, findByCATEGORY ,addBook, deleteBook,backHome, aboutUs} from '../components/actions/App'


const mapStateToProps = (state) => {
    return {
        view : state.view,
        category : state.category,
        isbn : state.isbn,
        bookInfo : state.bookInfo,
        records : state.records
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFindBook: () => dispatch(onFindBook()),
        onAddBook: () => dispatch(onAddBook()),
        findByISBN: (isbn) => {dispatch(findByISBN(isbn))},
        findByCATEGORY: (category)=>{dispatch(findByCATEGORY(category))},
        addBook: (newBook) => {dispatch(addBook(newBook))},
        deleteBook: () => {dispatch(deleteBook())},
        backHome: () => {dispatch(backHome())},
        aboutUs: () => {dispatch(aboutUs())}
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);