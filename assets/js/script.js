//swith topic
if (!localStorage.topic) localStorage.topic = 'light'
document.body.className = localStorage.topic

swithTopic.addEventListener(
  'click',
  () => {
    document.body.classList.toggle('dark')
    localStorage.topic = document.body.className || 'light'
  },
  { passive: true }
)

const lockPaddingValue =
  window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
const body = document.querySelector('body')

const intro = document.querySelector('#intro')
const header = document.querySelector('#header')
let headerH = header.offsetHeight + 10
let introH = intro.offsetHeight
let scroll = window.pageYOffset
const navToggle = document.querySelector('#navToggle')
const nav = document.querySelector('#nav')

//Fixed Header
window.onscroll = () => {
  scroll = window.pageYOffset
  introH = intro.offsetHeight
  headerH = header.offsetHeight
  scrollCheker(introH + headerH + 22, scroll - headerH)
}

//Smooth Scroll
nav.onclick = (e) => {
  const dataScroll = e.path[0].dataset.scroll
  if (dataScroll) {
    e.preventDefault()
    let blockOffSet = document.querySelector(dataScroll).offsetTop
    nav.classList.remove('active')

    if (dataScroll == '#begin') {
      window.scrollTo({
        top: blockOffSet - headerH,
        behavior: 'smooth',
      })
    } else {
      window.scrollTo({
        top: blockOffSet - headerH * 2,
        behavior: 'smooth',
      })
    }
  }
}

//NavToggle
navToggle.onclick = (event) => {
  event.preventDefault()
  nav.classList.toggle('active')
}

//Modal
const modalCall = document.querySelector('[data-modal]')
const modalClose = document.querySelector('[data-close]')
const modal = document.querySelector('.modal')

modalCall.addEventListener('click', (event) => {
  event.preventDefault()
  let modalId = document.querySelector(modalCall.dataset.modal)
  modalId.showModal()

  body.style.paddingRight = lockPaddingValue;
  header.className.includes('fixed') &&
    (header.style.paddingRight = lockPaddingValue)

  body.classList.add('no-scroll')
  nav.classList.remove('active')

  setTimeout(() => {
    modalId.childNodes[1].style.cssText = `transform: rotateX(0);`
  }, 200)
})

modalClose.addEventListener('click', (event) => {
  event.preventDefault()

  let modalParent = modalClose.parentElement
  modalParent.style.cssText = `transform: rotateX(90deg);`

  setTimeout(() => {
    body.style.paddingRight = '0px'
    header.className.includes('fixed') && (header.style.paddingRight = '0px')
    modalParent.parentElement.close()
    body.classList.remove('no-scroll')
  }, 200)
})

modal.onclick = (event) => {
  if (!(event.path[0] == modal)) return false

  const modalDialog = modal.firstElementChild
  modalDialog.style.cssText = `transform: rotateX(90deg)`

  setTimeout(() => {
    body.style.paddingRight = '0px'
    header.className.includes('fixed') && (header.style.paddingRight = '0px')
    modal.close()
    body.classList.remove('no-scroll')
  }, 200)
}

//Slider - swiper

new Swiper('.fullwe', {
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  autoHeight: true,
  watchOverflow: true,
  loop: true,
  autoplay: {
    delay: 25000,
    disableOnIteraction: true,
  },
  speed: 800,
  touchRatio: 0.8,
  touchAngle: 50,

  preloadImages: false,
  lazy: {
    loadOnTransitionStart: true,
    loadPrevNext: true,
  },

  a11y: {
    enabled: true,
    prevSlideMessage: 'Вернуться к прошлому слайду',
    nextSlideMessage: 'Показать следующий слайд',
    firstSlideMessage: 'Это первый слайд',
    lastSlideMessage: 'Это последний слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}',
    itemRoleDescriptionMessage: 'Следующие фото в слайдере',
  },

  //breakpoints: {
  //  300: {
  //  }
  //}
})


//////////////////////////////////////////

function scrollCheker(introH, scroll) {
  if (scroll > introH) {
    header.classList.add('fixed')
  } else {
    header.classList.remove('fixed')
  }
}