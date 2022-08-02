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

var gCurrLang = 'en'

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

function setLang(lang) {
    gCurrLang = lang
}

function formatNum(lang) {
    const shekelOpt = {
        style: 'currency',
        currency: 'ils'
    }
    const usdOpt = {
        style: 'currency',
        currency: 'USD'
    }
    var els = document.querySelectorAll('.num')
    // console.log(num)
    els.forEach(el => {
    if ( lang === 'he') el.innerText = new Intl.NumberFormat(lang, shekelOpt).format(+el.innerText)
    if ( lang === 'en') el.innerText = new Intl.NumberFormat(lang, usdOpt).format(+el.innerText)
})
}


// function formatCurrency(num) {
//     return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num)
// }

