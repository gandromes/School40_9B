//swith topic
if(!localStorage.topic) localStorage.topic = 'light'
document.body.className = localStorage.topic

swithTopic.onclick = () => {
  document.body.classList.toggle('dark')
  localStorage.topic = document.body.className || 'light'
}

//SupportedCSS for background-attachment
function supportedCSS(value, element) {
  const style = getComputedStyle(element)
  const oldValue = style.backgroundAttachment;
  element.style.backgroundAttachmment = value
  const isSupported = style.backgroundAttachment === value
  element.style.backgroundAttachmment = oldValue
  return isSupported
}

let p = document.createElement('p')
p.innerText = supportedCSS('fixed', intro)
document.body.appendChild(p)

$(function () {
  let intro = $('#intro'),
    header = $('#header'),
    introH = intro.innerHeight(),
    scroll = $(window).scrollTop(),
    navToggle = $('#navToggle'),
    nav = $('#nav')

  scrollCheker(introH, scroll)

  //Fixed Header
  $(window).on('scroll resize', function () {
    introH = intro.innerHeight()
    scroll = $(this).scrollTop()

    scrollCheker(introH, scroll)
  })

  function scrollCheker(introH, scroll) {
    if (scroll > introH) {
      $(header).addClass('fixed')
    } else {
      $(header).removeClass('fixed')
    }
  }

  //Smooth Scroll

  $('[data-scroll]').on('click', function (event) {
    event.preventDefault()

    let blockId = $(this).data('scroll'),
      blockOffSet = $(blockId).offset().top

    nav.removeClass('active')

    $('html , body').animate(
      {
        scrollTop: blockOffSet - 150,
      },
      750
    )
  })

  //NavToggle
  navToggle.on('click', function (event) {
    event.preventDefault()

    nav.toggleClass('active')
  })

  //Slider https://kenwheeler.github.io/slick/

  $('[data-slider]').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 12000,
  })

  //Modal
  const modalCall = $('[data-modal]')
  const modalClose = $('[data-close]')

  modalCall.on('click', function (event) {
    event.preventDefault()

    let $this = $(this)
    let modalId = $this.data('modal')

    $(modalId).addClass('show')

    $('body').addClass('no-scroll')

    nav.removeClass('active')

    setTimeout(function () {
      $(modalId).find('.modal__dialog').css({
        transform: 'rotateX(0)',
      })
    }, 200)
  })

  modalClose.on('click', function (event) {
    event.preventDefault()

    let $this = $(this)
    let modalParent = $this.parents('.modal')

    modalParent.find('.modal__dialog').css({
      transform: 'rotateX(90deg)',
    })

    setTimeout(function () {
      modalParent.removeClass('show')
      $('body').removeClass('no-scroll')
    }, 200)
  })

  $('.modal').on('click', function () {
    let $this = $(this)

    $this.find('.modal__dialog').css({
      transform: 'rotateX(90deg)',
    })

    setTimeout(function () {
      $this.removeClass('show')
      $('body').removeClass('no-scroll')
    }, 200)
  })
  $('.modal__dialog').on('click', function (event) {
    event.stopPropagation()
  })
})
