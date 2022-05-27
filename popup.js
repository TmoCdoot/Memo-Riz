//input.onblur = test()

//initInputs()

//click btn
/*div.addEventListener('click', async () => {
    //await launchScript()
    console.log(title.value)
})*/
/*async function launchScript() {
    const titlevalue = title.value

    try {
        chrome.storage.local.set({
            thumbnailProperties: {
                title: titlevalue,
            }
        })

    } catch (e) {
        console.error('Error with the Youtube thumbnail extension : ' + e)
    }

    chrome.storage.local.get('thumbnailProperties', (result) => {
        console.log(storedThumbnail.title)
    })

}


function initInputs() {
    chrome.storage.local.get('thumbnailProperties', (result) => {
        var storedThumbnail = result.thumbnailProperties

        // If valid data is stored
        if (typeof (storedThumbnail) !== 'undefined') {
            
            title.value = storedThumbnail.title || null

        }
    })
}*/





const btnDarkMode = document.querySelector('.mr-dark-mode')
const darkModeBtn = document.querySelector('.mr-dark-mode')
const btnAddMemo = document.querySelector('.mr-btn')
const root = document.documentElement 
var darkMode = false

btnDarkMode.addEventListener('click', () => {
    if (darkMode) {
        darkMode = false

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
            imgColor: 'url(images/rice.png)'
        }
        darkModeBtn.style.top = "29px"
        darkModeBtn.style.left = "25px"

        switchProperties(styleToChange)
    } else {
        darkMode = true

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
            imgColor: 'url(images/rice-white.png)'
        }
        darkModeBtn.style.top = "15px"
        darkModeBtn.style.left = "20px"

        switchProperties(styleToChange)
    }
})

function switchProperties(properties) {
    for (let el in properties) {
        root.style.setProperty('--' + el, properties[el])
    }
}

btnAddMemo.addEventListener('click', () => {
    console.log("fe")
})










