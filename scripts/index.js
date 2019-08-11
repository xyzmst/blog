if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

// theme
const body = document.body
const toggle = document.getElementById('toggle')
const isDarkTheme = localStorage.getItem('isDarkTheme')

if (isDarkTheme === 'true') {
  if (toggle) {
    toggle.checked = true
  }
  body.classList.add('dark')
}

if (toggle) {
  toggle.addEventListener('change', event => {
    const target = event.target

    if (target.checked) {
      body.classList.add('dark')
      localStorage.setItem('isDarkTheme', true)
    } else {
      body.classList.remove('dark')
      localStorage.setItem('isDarkTheme', false)
    }
  })
}

// comment
const loader = document.getElementById('loader')
const utteranc = document.getElementById('utteranc')

if (utteranc) {
  const uscript = document.createElement('script')

  uscript.async = true
  uscript.crossOrigin = 'anonymous'
  uscript.src = 'https://utteranc.es/client.js'
  uscript.setAttribute('repo', 'xrr2016/blog')
  uscript.setAttribute('issue-term', 'pathname')

  if (isDarkTheme === 'true') {
    uscript.setAttribute('theme', 'github-dark')
  } else {
    uscript.setAttribute('theme', 'github-light')
  }

  utteranc.appendChild(uscript)

  const timeout = setTimeout(function() {
    loader.remove()
    clearTimeout(timeout)
  }, 3000)
}

// nav
const path = location.pathname
const navs = ['/', '/projects/', '/tags/', '/archives/', '/about/']
const navLinkList = document.querySelectorAll('.nav-link')

navs.forEach(function(nav, index) {
  if (nav === path) {
    navLinkList[index].classList.add('active')
  }
})
