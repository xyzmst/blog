if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js')
  })
}

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
