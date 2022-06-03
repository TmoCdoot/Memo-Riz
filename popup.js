const btnDarkMode = document.querySelector('.mr-dark-mode')
const darkModeBtn = document.querySelector('.mr-dark-mode')
const btnAddMemo = document.querySelector('.mr-btn')
const formMemo = document.querySelector('.mr-form-memo')
const viewMemo = document.querySelector('.mr-view-memo')
const filterMemo = document.querySelector('.mr-filter')
const viewTextarea = document.querySelector('.view-textarea')
const filterMemoView = document.querySelector('.mr-filter-view')
const btnCloseFormMemo = document.querySelector('.form-close')
const btnCloseViewMemo = document.querySelector('.view-close')
const btnSendMemo = document.querySelector('.form-btn')
const btnBlocAddMemo = document.querySelector('.btn-bloc')
const btnTextAddMemo = document.querySelector('.btn-text')
const memoContener = document.querySelector('.mr-memo')
const viewTitle = document.querySelector('.view-title')
const viewEdit = document.querySelector('.view-edit')


const inputTitle = document.querySelector('.form-title-input')
const inputTextArea = document.querySelector('.form-textarea-input')
const inputLock = document.querySelector('.form-lock-input')


const root = document.documentElement 

var darkMode = false
var showFormMemo = false
var isCheck = true
var tabMemo = []

starDarkmode()
getMemoLocalStorage()
addMemoOnHtml(tabMemo)
activeInteract()





btnDarkMode.addEventListener('click', () => {

    darkModeSwitch()

})

viewEdit.addEventListener('click', event => {

    showMemo("preloadEdit", event.composedPath()[0].id)

})

btnAddMemo.addEventListener('click', () => {

    showMemo("form")

})

btnCloseFormMemo.addEventListener('click', () => {

    showMemo("form")

})

btnCloseViewMemo.addEventListener('click', () => {

    showMemo("view")

})

inputLock.addEventListener('click', () => {

    if (isCheck) {

        isCheck = false

    } else {

        isCheck = true

    }

})

btnSendMemo.addEventListener('click', event => {

    if (event.composedPath()[0].id != "") {
        
        localStorage.removeItem(tabMemo[event.composedPath()[0].id].title)
        const memoObject = {
            title: inputTitle.value,
            data: inputTextArea.value,
            isLock: isCheck,
        }
        localStorage.setItem(inputTitle.value, JSON.stringify(memoObject))
        getMemoLocalStorage()
        addMemoOnHtml(tabMemo)
        activeInteract()
        showMemo('form')

    } else {

        const memoObject = {
            title: inputTitle.value,
            data: inputTextArea.value,
            isLock: isCheck,
        }
        localStorage.setItem(inputTitle.value, JSON.stringify(memoObject))
        getMemoLocalStorage()
        addMemoOnHtml(tabMemo)
        activeInteract()
        showMemo('form')

    }
    
})





//refresh interaction
function activeInteract() {

    //load data edit memo
    document.querySelectorAll('.memo-text-area').forEach(item => {
        item.addEventListener('click', event => {

            showMemo("view")
            const index = event.composedPath()[0].id
            const memo = tabMemo[index]
            viewEdit.id = index
            viewTitle.innerHTML = memo.title
            viewTextarea.innerHTML = memo.data

        })
    })
    
    //remove memo
    document.querySelectorAll('.memo-param').forEach(item => {
        item.addEventListener('click', event => {

            localStorage.removeItem(tabMemo[event.composedPath()[0].id].title)
            getMemoLocalStorage()
            addMemoOnHtml(tabMemo)
            activeInteract()

        })
    })
}

//switch mode
function switchProperties(properties) {

    for (let el in properties) {

        root.style.setProperty('--' + el, properties[el])

    }

}

//show memo form
function showMemo(type, id) {

    if (type == "form") {

        if (showFormMemo) {

            filterMemo.style.visibility = "collapse"
            formMemo.style.visibility = "collapse"
            inputTitle.value = ""
            inputTextArea.value = ""
            inputLock.checked = true
            isCheck = true
            showFormMemo = false
            document.querySelector('.form-btn').id = ""
            ,document.querySelector('.btn-bloc').id = ""
            document.querySelector('.btn-text').id = ""

        } else {

            filterMemo.style.visibility = "initial"
            formMemo.style.visibility = "initial"
            showFormMemo = true

        }

    } else if (type == "preloadEdit") {

        filterMemoView.style.visibility = "collapse"
        viewMemo.style.visibility = "collapse"
        showFormMemo = false
        showMemo("goEdit", id)

    } else if (type == "goEdit") {

        btnSendMemo.id = id
        btnBlocAddMemo.id = id
        btnTextAddMemo.id = id
        inputTitle.value = tabMemo[id].title
        inputTextArea.value = tabMemo[id].data
        if (tabMemo[id].isLock == true) {
            inputLock.checked = true
        } else {
            inputLock.checked = false
        }
        filterMemo.style.visibility = "initial"
        formMemo.style.visibility = "initial"
        showFormMemo = true

    } else {

        if (showFormMemo) {
            filterMemoView.style.visibility = "collapse"
            viewMemo.style.visibility = "collapse"
            showFormMemo = false
        } else {
            filterMemoView.style.visibility = "initial"
            viewMemo.style.visibility = "initial"
            showFormMemo = true
        }

    }
    
}

//get memo local storage
function getMemoLocalStorage() {

    tabMemo = []
    for (var i = 0; i < localStorage.length; i++){

        tabMemo.push(JSON.parse(localStorage.getItem(localStorage.key(i))))

    }

}

//load darkmode open extension
function starDarkmode() {
    
    if (localStorage.getItem('darkMode')) {

        if (localStorage.getItem('darkMode') == "true") {

            darkModeSwitch()
    
        }

    }

}

//show memo
function addMemoOnHtml(tabMemo) {   

    while (memoContener.firstChild) { 

        memoContener.removeChild(memoContener.firstChild)
        
    }

    for (var i = 0; i < tabMemo.length; i++){

        if (tabMemo[i].title != undefined) {

            let divContener = document.createElement('div')
            let divContenerCenter = document.createElement('div')
            let divMemoStatut = document.createElement('div')
            let divMemoTitle = document.createElement('div')
            let divMemoParam = document.createElement('div')
            let divMemoText = document.createElement('div')


            divContener.className = "memo-container";
            divContener.id = i
            divContenerCenter.className = "container-center"
            divContenerCenter.id = i
            divMemoStatut.className = "memo-statut lock"
            divMemoStatut.id = i
            divMemoTitle.className = "memo-title"
            divMemoTitle.id = i
            divMemoParam.className = "memo-param"
            divMemoParam.id = i
            divMemoText.className = "memo-text-area"
            divMemoText.id = i

            let title = document.createTextNode(tabMemo[i].title)
            divMemoTitle.appendChild(title)
            let text = document.createTextNode(tabMemo[i].data)
            divMemoText.appendChild(text)

            divContenerCenter.appendChild(divMemoStatut)
            divContenerCenter.appendChild(divMemoTitle)
            divContenerCenter.appendChild(divMemoParam)

            divContener.appendChild(divContenerCenter, divMemoText)
            divContener.appendChild(divMemoText)

            memoContener.appendChild(divContener)

        }

    }
    
    if (tabMemo.length == 1) {

        let divNoMemo = document.createElement('div')
        divNoMemo.className = 'no-memo'
        let text = document.createTextNode("No memo")
        divNoMemo.appendChild(text)
        memoContener.appendChild(divNoMemo)

    }

}


function darkModeSwitch() {

    if (darkMode) {

        darkMode = false
        localStorage.removeItem("darkMode")
        localStorage.setItem("darkMode", false)

        darkModeBtn.innerHTML =
        '<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">'
        + '<path fill-rule="evenodd" clip-rule="evenodd" d="M18.299 15.581C17.4142 15.8534 16.4742 16 15.5 16C10.2533 16 6 11.7467 6 6.50002C6 4.043 6.93276 1.80383 8.4635 0.117311C3.67009 0.85649 0 4.99965 0 10C0 15.5228 4.47715 20 10 20C13.4562 20 16.5028 18.2467 18.299 15.581Z" fill="#9A9A9A"/>'
        + '</svg>'

        let styleToChange = {
            bg: '#FFFFFF',
            textColor: '#000000',
            bgMemo: '#E5E7FE',
            bgScroll: '#d9d9da',
            bottomFaide: 'linear-gradient(180deg, rgba(151, 186, 255, 0) 0%, rgba(137, 146, 255, 0.67) 100%)',
            imgColor: 'url(images/rice.png)',
            textColorForm: '#909090',
            bgFilter: 'rgba(132, 132, 132, 0.74)',
            imgEditColor: 'url(images/pencil.png)',
            imgRemoveColor: 'url(images/poubelle.png)',
            imgLockColor: 'url(images/lock.png)',
            imgUnLockColor: 'url(images/unlock.png)'
        }
        darkModeBtn.style.top = "29px"
        darkModeBtn.style.left = "25px"

        switchProperties(styleToChange)

    } else {

        darkMode = true
        localStorage.removeItem("darkMode")
        localStorage.setItem("darkMode", true)

        darkModeBtn.innerHTML =
        '<svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">'
        + '<path fill-rule="evenodd" clip-rule="evenodd" d="M20 8.50003C20 7.6716 20.6716 7.00003 21.5 7.00003C22.3284 7.00003 23 7.6716 23 8.50003V9.50003C23 10.3285 22.3284 11 21.5 11C20.6716 11 20 10.3285 20 9.50003V8.50003ZM29.6317 11.247C30.2175 10.6612 31.1673 10.6612 31.7531 11.247C32.3388 11.8327 32.3388 12.7825 31.7531 13.3683C31.1673 13.9541 30.2175 13.9541 29.6317 13.3683C29.0459 12.7825 29.0459 11.8327 29.6317 11.247ZM11.247 13.3683C10.6612 12.7825 10.6612 11.8327 11.247 11.247C11.8327 10.6612 12.7825 10.6612 13.3683 11.247C13.9541 11.8327 13.9541 12.7825 13.3683 13.3683C12.7825 13.9541 11.8327 13.9541 11.247 13.3683ZM14 21.5C14 17.3579 17.3579 14 21.5 14C25.6421 14 29 17.3579 29 21.5C29 25.6421 25.6421 29 21.5 29C17.3579 29 14 25.6421 14 21.5ZM28.9246 28.9246C28.3388 29.5104 28.3388 30.4602 28.9246 31.0459C29.5104 31.6317 30.4602 31.6317 31.0459 31.0459C31.6317 30.4602 31.6317 29.5104 31.0459 28.9246C30.4602 28.3388 29.5104 28.3388 28.9246 28.9246ZM14.0754 28.9246C13.4896 28.3388 12.5399 28.3388 11.9541 28.9246C11.3683 29.5104 11.3683 30.4602 11.9541 31.0459C12.5399 31.6317 13.4896 31.6317 14.0754 31.0459C14.6612 30.4602 14.6612 29.5104 14.0754 28.9246ZM8.5 23C7.67157 23 7 22.3285 7 21.5C7 20.6716 7.67157 20 8.5 20H9.5C10.3284 20 11 20.6716 11 21.5C11 22.3285 10.3284 23 9.5 23H8.5ZM32 21.5C32 22.3284 32.6716 23 33.5 23H34.5C35.3284 23 36 22.3284 36 21.5C36 20.6716 35.3284 20 34.5 20H33.5C32.6716 20 32 20.6716 32 21.5ZM21.5 32C20.6716 32 20 32.6716 20 33.5V34.5C20 35.3284 20.6716 36 21.5 36C22.3284 36 23 35.3284 23 34.5V33.5C23 32.6716 22.3284 32 21.5 32Z" fill="#9A9A9A"/>'
        + '</svg>'

        let styleToChange = {
            bg: '#222222',
            textColor: '#E5E7FE',
            bgMemo: '#2A2B31',
            bgScroll: '#565656',
            bottomFaide: 'linear-gradient(180deg, rgba(0, 13, 140, 0) 0%, rgba(7, 11, 51, 0.67) 100%)',
            imgColor: 'url(images/rice-white.png)',
            textColorForm: '#E5E7FE',
            bgFilter: 'rgba(0, 0, 0, 0.69)',
            imgEditColor: 'url(images/pencil-white.png)',
            imgRemoveColor: 'url(images/poubelle-white.png)',
            imgLockColor: 'url(images/lock-white.png)',
            imgUnLockColor: 'url(images/unlock-white.png)'
        }
        darkModeBtn.style.top = "15px"
        darkModeBtn.style.left = "20px"

        switchProperties(styleToChange)

    }

}












