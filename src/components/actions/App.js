export const onFindBook = () => {
  return {
    type: 'ON_FIND_BOOK'
  }
}

export const onAddBook = () => {
  return {
    type: 'ON_ADD_BOOK'
  }
}

export const aboutUs = () => {
  return {
    type: 'ON_ABOUT_US'
  }
}
export const findByISBN = (isbn) => {
  return {
    type: 'FIND_BY_ISBN',
    isbn
  }
}

export const addBook = (newBook) => {
  return{
    type : 'ADD_NEW_BOOK',
    newBook
  }
}

export const deleteBook = () => {
  return{
    type : 'DELETE_BOOK',
  }
}

export const backHome = () => {
  return{
    type : "BACK_HOME"
  }
}
