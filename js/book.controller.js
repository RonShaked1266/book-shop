'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    render()
}

function render() {
    renderBooks()
    // checkModalOpened()
    doTrans()
}

function renderBooks() {
    var books = getBooksForDisplay()
    var strHTMLs = books.map(book =>
        `
        <tr>
            <td>${book.id}</td>
            <td class="book-title" onclick="onSortByName()">${book.title}</td>
            <td class="num">${getCurrencyPrice(book.price)}</td>
            <td>${book.rate}</td>
            <td><button data-trans="read" class="read" onclick="onReadBook('${book.id}')" >Read</button></td>
            <td><button data-trans="update" class="update" onclick="onUpdateBook('${book.id}') ">Update</button></td>
            <td><button data-trans="delete" class="delete" onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>
        `
    )
    // console.log('strHTMLs:', strHTMLs)
    document.querySelector('.books-table').innerHTML = strHTMLs.join('')
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var strHTML = ` 
    <h3>${book.title}</h3>
    <h4 data-trans="book-desc">Book Description</h4>
    <img class="img-book" src="img/${book.title}.jpg">
    <br><p data-trans="rate-book">rate:</p>
    <input type="number" name="rate" min="0" max="10" onchange="onRate(+this.value)">
    <br><br><button data-trans="close" class="close" onclick="onCloseModal()">Close</button>
    `
    const elModal = document.querySelector('.modal')
    elModal.innerHTML = strHTML
    elModal.dataset.id = bookId
    elModal.classList.add('open')
    render()
}

// function onReadBook(bookId) {
//     var book = getBookById(bookId)
//     const elModal = document.querySelector('.modal')
//     elModal.querySelector('h3').innerText = book.title
//     elModal.querySelector('p').innerText = book.desc
//     elModal.dataset.id = bookId
//     elModal.classList.add('open')
// }

function onUpdateBook(bookId) {
    var book = getBookById(bookId)
    const newPrice = +prompt('Price?', book.price)
    book = updateBook(bookId, newPrice)
    renderBooks()
}

function onAddBook() {
    var name = prompt('Name?')
    var price = prompt('Price?')
    if (price > 150) {
        alert('The maximum price for a book is 150$')
        return
    }
    const book = addBook(name, price)
    renderBooks()
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onSetFilterBy(filterBy, ev) {
    ev.preventDefault()
    console.log('filterBy:', filterBy)
    // console.log('ev', ev)
    // console.log('this', el)
    // console.dir(el)
    filterBy = setBookFilter(filterBy)
    const elTxt = document.querySelector('.filter-input')
    renderBooks()
    elTxt.value = ''
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&bookTitle=${filterBy.bookTitle}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: +queryStringParams.get('maxPrice') || 150,
        minRate: +queryStringParams.get('minRate') || 0,
        bookTitle: queryStringParams.get('bookTitle') || '',
    }

    if (!filterBy.maxPrice && !filterBy.minRate && !filterBy.bookTitle) return

    document.querySelector('.filter-price-range').value = filterBy.maxPrice
    document.querySelector('.filter-rate-range').value = filterBy.minRate
    document.querySelector('.filter-input').value = filterBy.bookTitle

    setBookFilter(filterBy)
}

function onSetSortBy(sortBy) {
    setBookSort(sortBy)
    renderBooks()
}

// }

// function onSearchBook(ev) {
//     ev.preventDefault()
//     const elTxt = document.querySelector('.filter-input')
//     searchBook(elTxt.value)
//     renderBooks()
//     elTxt.value = ''
// }

function onRate(rate) {
    // console.log(rate)
    // if (rate <= 0 || rate >= 10) return
    const elModal = document.querySelector('.modal')
    // console.log(elModal)
    var bookId = elModal.dataset.id
    // console.log(bookId)
    updateRate(bookId, rate)
    renderBooks()
}

function onCloseModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('open')
    const elInput = elModal.querySelector('input')
    // console.log(elInput)
    elInput.value = 0
    // 
    setSelectedBook(null)
    _saveBooksToStorage('selectedBook')
    // 
}

function onNextPage() {
    const isLastPage = nextPage()
    const elPrevPage = document.querySelector('.prev-page')
    const elNextPage = document.querySelector('.next-page')

    elPrevPage.removeAttribute('disabled')
    if (isLastPage) {
        elNextPage.setAttribute('disabled', '')
    }
    renderBooks()
}

function onPrevPage() {
    const isFirstPage = prevPage()
    const elPrevPage = document.querySelector('.prev-page')
    const elNextPage = document.querySelector('.next-page')

    elNextPage.removeAttribute('disabled')
    if (isFirstPage) {
        elPrevPage.setAttribute('disabled', '')
    }
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang)
    // if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
    formatNum(lang)
    render()
}

// function checkModalOpened() {
//     const book = getSelectedBook()  // better to work with the query string params to get bookmark-ability
//     if (book) onReadBook(bookId)
// }

// function renderModalByQueryStringParams() {

// }