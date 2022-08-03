'use strict'


var gTrans = {
    title: {
        en: 'Welcome to my bookshop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    'search': {
        en: 'Search:',
        he: 'חפש:'
    },
    'search-placeholder': {
        en: 'Search for book..',
        he: 'חפש ספר..'
    },
    'max-price': {
        en: 'Max Price:',
        he: 'מחיר מקסימלי:'
    },
    'min-rate': {
        en: 'Min Rate:',
        he: 'דירוג מימלי:'
    },
    'creat-book': {
        en: 'Creat new book',
        he: 'צור ספר חדש'
    },
    'sort-by': {
        en: 'Sort By:',
        he: 'מיין לפי:'
    },
    'select': {
        en: 'Select Sorting',
        he: 'בחר'
    },
    'name': {
        en: 'Name',
        he: 'שם'
    },
    'id': {
        en: 'Id',
        he: 'ת.ז'
    },
    'title-book': {
        en: 'Title',
        he: 'שם הספר'
    },
    'price': {
        en: 'Price',
        he: 'מחיר'
    },
    'rate': {
        en: 'Rate',
        he: 'דירוג'
    },
    'rate-book': {
        en: 'Rate:',
        he: 'דרג את הספר:'
    },
    'actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'prev-page': {
        en: 'Previous Page',
        he: 'עמוד קודם',
    },
    'next-page': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'book-desc': {
        en: 'Book Description',
        he: 'תיאור הספר'
    },
    'close': {
        en: 'Close',
        he: 'סגור'
    },
    'read': {
        en: 'Read',
        he: 'קרא'
    },
    'update': {
        en: 'Update',
        he: 'עדכן'
    },
    'delete': {
        en: 'Delete',
        he: 'מחק'
    }
}

var gCurrLang = _loadLngFromLocalStorage() || 'en'

function setLang(lang) {
    gCurrLang = lang
    _setLangToLocalStorage(lang)
}

function getTrans(transKey) {
    const key = gTrans[transKey]
    // if key is unknown return 'UNKNOWN'
    if (!key) return 'UNKNOWN'
    //  get from gTrans
    let translateVal = key[gCurrLang]
    // If translation not found - use english
    if (!translateVal) translateVal = key['en']
    return translateVal
}

function doTrans() {
    // 
    // var els = document.querySelectorAll('[data-trans]'
    const els = document.querySelectorAll('[data-trans]')
    // console.log(els)
    // for each el:
    els.forEach(el => {
        const translateKey = el.dataset.trans
        const translateVal = getTrans(translateKey)
        el.innerText = translateVal
        if (el.placeholder !== undefined) el.placeholder = translateVal
        // el.innerText = 'test'
    })
}

function getCurrencyPrice(price) {
    var currency = (gCurrLang === 'en') ? 'USD' : 'ILS' 
    const opt = {
        style: 'currency',
        currency
    }
    // console.log(opt)
    var price = new Intl.NumberFormat(gCurrLang, opt).format(price)
    return price
}

function _setLangToLocalStorage(lang) {
    saveToStorage('currLang', lang)
}
function _loadLngFromLocalStorage() {
    return loadFromStorage('currLang')
}

