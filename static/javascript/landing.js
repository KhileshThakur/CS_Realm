// document.getElementsByTagName("button")[0].addEventListener('click',function (){
//     document.getElementsByTagName("p")[0].style.visibility = "visible"
// });


// const readBtn = document.getElementsByTagName('button')[0]
// const block = document.getElementsByTagName('p')[0]
// readBtn.addEventListener('click', () => {
//     if (block.classList.contains('visible')) {
//         block.classList.remove('visible')
//     }
//     else {
//         block.classList.add('visible')
//     }
// })

const readBtn = document.getElementsByTagName('button')[0]
const block = document.getElementsByTagName('p')[0]
readBtn.addEventListener('click', () => {
    if (block.classList.contains('visible')) {
        block.classList.remove('visible')
        block.classList.add('invisible')
    }
    else {
        block.classList.add('visible')
        block.classList.remove('invisible')
    }
})
const abtbtn = document.getElementsByClassName('listitem2')[0]
abtbtn.addEventListener('click', () => {
    if (block.classList.contains('visible')) {
        block.classList.remove('visible')
        block.classList.add('invisible')
    }
    else {
        block.classList.add('visible')
        block.classList.remove('invisible')
    }
})