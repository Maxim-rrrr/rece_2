const control1 = document.querySelector('.controll1')
const control2 = document.querySelector('.controll2')

document.querySelector('.edit').addEventListener('click', () => {
    control1.classList.add('dn')
    control2.classList.remove('dn')
})

document.querySelector('.back').addEventListener('click', () => {
    control2.classList.add('dn')
    control1.classList.remove('dn')
})