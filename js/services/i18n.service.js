'use strict'

var gTrans = {
    title: {
        en: 'Welcome to my bookshop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    'creat-book': {
        en: 'Creat new book',
        he: 'צור ספר חדש'
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
    console.log(els)
    // for each el:
    els.forEach(el=>{
        const translateKey = el.dataset.trans
        const translateVal = getTrans(translateKey)
        el.innerText = translateVal
        if (el.placeholder !== undefined) el.placeholder = translateVal
        // el.innerText = 'test'
    })
    //    get the data-trans and use getTrans to replace the innerText 
    //    ITP: support placeholder    
}

function setLang(lang) {
    gCurrLang = lang
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num)
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang,options).format(time)
}

function kmToMiles(km) {
    return km / 1.609
}