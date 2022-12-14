'use strict'

const STORAGE_KEY = 'bookDB'
const gTitles = ['THE END', 'LOST', 'THE GIRL', 'OUR WORLD', 'GOOD DOG', 'HARRY POTTER']
const PAGE_SIZE = 4

var gBooks
var gFilterBy = { maxPrice: 150, minRate: 0, bookTitle: '' }
var gPageIdx = 0

_createBooks()

function nextPage() {
    gPageIdx++
    const isLastPage = (PAGE_SIZE + gPageIdx * PAGE_SIZE >= gBooks.length)
    return isLastPage
}

function prevPage() {
    gPageIdx--
    const isFirstPage = (PAGE_SIZE + gPageIdx * PAGE_SIZE >= gBooks.length)
    return isFirstPage
}

function getBooksForDisplay() {
    var books = gBooks.filter((book) => (
        book.rate >= gFilterBy.minRate &&
        book.price <= gFilterBy.maxPrice &&
        book.title.toLowerCase().includes(gFilterBy.bookTitle.toLowerCase())
    )
    )
    // console.log(books)
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage
}

function addBook(name, price) {
    const book = _createBook(name, price)
    gBooks.unshift(book)
    _saveBooksToStorage
}

function updateBook(bookId, bookPrice) {
    const book = gBooks.find(book => bookId === book.id)
    book.price = bookPrice
    _saveBooksToStorage
    return book
}
function updateRate(bookId, rate) {
    const book = gBooks.find(book => bookId === book.id)
    book.rate = rate
    _saveBooksToStorage
    return book
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function setBookFilter(filterBy = {}) {
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if (filterBy.bookTitle !== undefined) gFilterBy.bookTitle = filterBy.bookTitle
    // console.log(gFilterBy)
    return gFilterBy
}


// function setBookSort(sortBy) {
//     gBooks.sort((book1, book2) => {
//         if (sortBy === 'price') return (book2[sortBy] - book1[sortBy]) 
//         if (sortBy === 'rate') return (book2[sortBy] - book1[sortBy]) * -1
//     })
// }

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < gTitles.length; i++) {
            var name = gTitles[i]
            var price = getRandomIntInclusive(10, 100) + +Math.random().toFixed(2)
            books.push(_createBook(name, price))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _createBook(name, price) {
    var book = {
        id: makeId(),
        title: name,
        price: price,
        desc: makeLorem(),
        rate: 0
    }
    return book
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

