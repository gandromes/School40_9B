//Toggle topic(theme)
localStorage.topic || (localStorage.topic = 'light')
document.body.className = localStorage.topic
swithTopic.addEventListener(
  'click',
  () => {
    document.body.classList.toggle('dark'),
      (localStorage.topic = document.body.className || 'light')
  },
  { passive: true }
)

const lockPaddingValue =
  window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px',
  body = document.querySelector('body'),
  intro = document.querySelector('#intro'),
  header = document.querySelector('#header'),
  navToggle = document.querySelector('#navToggle'),
  nav = document.querySelector('#nav')
let headerH = header.offsetHeight + 10,
  introH = intro.offsetHeight,
  scroll = window.pageYOffset

//Helpers -> start
const scrollCheker = (e, t) =>
  t > e ? header.classList.add('fixed') : header.classList.remove('fixed')
const isEventTargetNotEqual = (event, target) =>
  event.target != target ? true : false
  //end

  //Update data
  ; (window.onscroll = () => {
    ; (scroll = window.pageYOffset),
      (introH = intro.offsetHeight),
      (headerH = header.offsetHeight),
      scrollCheker(introH + headerH + 22, scroll - headerH)
  }),
    //Fixed Header
    (window.onscroll = () => {
      scroll = window.pageYOffset
      introH = intro.offsetHeight
      headerH = header.offsetHeight
      scrollCheker(introH + headerH + 22, scroll - headerH)
    })(
      //Smooth ScrollTo
      (nav.onclick = (e) => {
        const t = e.target.dataset.scroll
        if (t) {
          e.preventDefault()
          let o = document.querySelector(t).offsetTop
          nav.classList.remove('active'),
            '#begin' == t
              ? window.scrollTo({ top: o - headerH, behavior: 'smooth' })
              : window.scrollTo({ top: o - 2 * headerH, behavior: 'smooth' })
        }
      })
    ),
    //Toggle nav menu
    (navToggle.onclick = (e) => {
      e.preventDefault(), nav.classList.toggle('active')
    })

//Modal:

//Modal values
const modalCall = document.querySelector('[data-modal]'),
  modalClose = document.querySelector('[data-close]'),
  modal = document.querySelector('.modal')

//Modal open
modalCall.addEventListener('click', (event) => {
  event.preventDefault()
  let modalId = document.querySelector(modalCall.dataset.modal)
  modalId.showModal()

  body.style.paddingRight = lockPaddingValue
  header.className.includes('fixed') &&
    (header.style.paddingRight = lockPaddingValue)

  body.classList.add('no-scroll')
  nav.classList.remove('active')

  setTimeout(() => {
    modalId.childNodes[1].style.cssText = `transform: rotateX(0);`
  }, 200)
})

//Modal close
modal.onclick = (event) => {

  if (isEventTargetNotEqual(event, modal)) return false || !isEventTargetNotEqual(event, firstSitelink)

  modal.firstElementChild.style.cssText = `transform: rotateX(90deg)`
  setTimeout(() => {
    body.style.paddingRight = '0px'
    header.className.includes('fixed') && (header.style.paddingRight = '0px')
    modal.close()
    body.classList.remove('no-scroll')
  }, 200)
}

//Modal close with button
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

//SliderSwiper settings
new Swiper('.fullwe', {
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  keyboard: { enabled: true, onlyInViewport: true },
  autoHeight: true,
  watchOverflow: true,
  loop: true,
  autoplay: { delay: 27e3, disableOnIteraction: true },
  speed: 8e2,
  touchRatio: 0.8,
  touchAngle: 50,
  preloadImages: false,
  lazy: { loadOnTransitionStart: true, loadPrevNext: true },
  a11y: {
    enabled: true,
    prevSlideMessage: 'Вернуться к прошлому слайду',
    nextSlideMessage: 'Показать следующий слайд',
    firstSlideMessage: 'Это первый слайд',
    lastSlideMessage: 'Это последний слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}',
    itemRoleDescriptionMessage: 'Следующие фото в слайдере',
  },
})
