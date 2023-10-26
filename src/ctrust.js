// CookieTrust

const hosts = []

const options = {
  intro: {
    en: [
      '<h1>Cookies</h1>',
      '<p>We use cookies to provide you with the best service and to keep improving it. If you click on "Accept all", you agree to the use of all cookies. If you click on "Accept selection", you only agree to the use of cookies in the categories you have selected. For more information, please see our <a href="/privacy">privacy policy</a>.</p>'
    ],
    de: [
      '<h1>Cookies</h1>',
      '<p>Wir verwenden Cookies, um Ihnen einen optimalen Service anzubieten und diesen immer weiter zu verbessern. Wenn Sie auf „Alle akzeptieren“ klicken, stimmen Sie der Verwendung aller Cookies zu. Wenn Sie auf „Auswahl akzeptieren“ klicken, erklären Sie sich nur mit der Verwendung von Cookies in den von Ihnen ausgewählten Kategorien einverstanden. Weitere Informationen finden Sie in unserer <a href="/datenschutz">Datenschutzerklärung</a>.</p>'
    ]
  },
  inputs: [
    {
      title: {
        en: 'Necessary Cookies',
        de: 'Erforderliche Cookies'
      },
      description: {
        en: 'These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.',
        de: 'Diese Cookies sind zur Funktion der Website erforderlich und können in Ihren Systemen nicht deaktiviert werden. In der Regel werden diese Cookies nur als Reaktion auf von Ihnen getätigte Aktionen gesetzt, die einer Dienstanforderung entsprechen, wie etwa dem Festlegen Ihrer Datenschutzeinstellungen, dem Anmelden oder dem Ausfüllen von Formularen. Sie können Ihren Browser so einstellen, dass diese Cookies blockiert oder Sie über diese Cookies benachrichtigt werden. Einige Bereiche der Website funktionieren dann aber nicht. Diese Cookies speichern keine personenbezogenen Daten.'
      },
      checked: true,
      disabled: true,
      script: null,
      cookies: '_none'
    }
  ],
  actions: {
    acceptAll: {
      en: 'Accept all',
      de: 'Alle akzeptieren'
    },
    acceptSelected: {
      en: 'Accept selection',
      de: 'Auswahl akzeptieren'
    }
  }
}

const setCookie = (name, days, domain) => {
  const date = new Date()

  if (days) {
    date.setTime((Date.now() + days * 24 * 60 * 60 * 1000))
  } else {
    date.setTime(1)
  }

  if (!domain) {
    const host = window.location.host.split('.')

    if (Number(host[host.length - 1])) {
      domain = window.location.host
    } else {
      domain = host[host.length - 2] + '.' + host[host.length - 1]
    }
  }

  if (days) {
    document.cookie = name + '=' + date.getTime() + '; expires=' + date.toUTCString() + '; path=/; domain=' + domain + '; SameSite=Strict'
  } else {
    document.cookie = name + '=' + date.getTime() + '; path=/; domain=' + domain + '; SameSite=Strict'
  }
}

const isCookieSet = (name) => {
  const cookies = document.cookie.split(';')

  cookies.forEach(cookie => {
    const cookieParts = cookie.split('=')

    if (name === cookieParts[0].trim()) {
      return true
    }
  })

  return false
}

const addHost = (host) => {
  hosts.push(host)
}

const wrap = (element) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'ctrust-wrapper'

  wrapper.addEventListener('click', () => {
    const ctrust = document.querySelector('.ctrust')
    if (ctrust) ctrust.classList.add('ctrust-show')
  })

  element.parentElement.replaceChild(wrapper, element)
  wrapper.appendChild(element)
}

const isAllowedHost = (src) => {
  let tmp = false

  hosts.forEach(host => {
    if (src.indexOf(host) >= 0) {
      tmp = true
    }
  })

  return tmp
}

const block = (key = 'iframe') => {
  const elements = document.querySelectorAll(key)

  elements.forEach(element => {
    if (key === 'iframe' && !isAllowedHost(element.src)) {
      element.setAttribute('data-src', element.src)
      element.src = ''

      wrap(element)
    } else if (key === 'video' || key === 'audio') {
      const sources = element.querySelectorAll('source')
      let count = 0

      sources.forEach(source => {
        if (!isAllowedHost(source.src)) {
          source.setAttribute('data-src', source.src)
          source.src = ''
          count++
        }
      })

      if (count === sources.length) {
        wrap(element)
      }
    }
  })
}

const allow = (key = 'iframe') => {
  const wrappers = document.querySelectorAll('.ctrust-wrapper')

  wrappers.forEach(wrapper => {
    if (key === 'iframe') {
      const element = wrapper.querySelector(key)

      if (element) {
        element.src = element.getAttribute('data-src')
        wrapper.parentElement.replaceChild(element, wrapper)
      }
    } else if (key === 'video' || key === 'audio') {
      const element = wrapper.querySelector(key)

      if (element) {
        const sources = element.querySelectorAll('source')

        sources.forEach(source => {
          source.src = source.getAttribute('data-src')
        })

        wrapper.parentElement.replaceChild(element, wrapper)
      }
    }
  })
}

const CTrust = (options) => {
  if (!options) {
    return
  }

  const container = document.createElement('div')
  container.className = 'ctrust'

  let lang = ['en']
  let isBot = false
  const { intro, inputs, actions: { acceptSelected, acceptAll } } = options
  const language = document.documentElement.lang
  const userAgents = [
    'googlebot',
    'googleother',
    'storebot',
    'bingbot',
    'linkedinbot',
    'yandex',
    'insights'
  ]

  if (language) {
    lang = language.split('-')
  }

  const banner = document.createElement('div')
  banner.className = 'ctrust-banner'

  if (intro) {
    const introField = document.createElement('div')
    introField.className = 'ctrust-intro'
    introField.innerHTML = intro[lang[0]].join('') ?? intro.en.join('')
    banner.appendChild(introField)
  }

  if (inputs) {
    const cookiesContainer = document.createElement('div')
    cookiesContainer.className = 'ctrust-elements-wrapper'

    inputs.forEach((input, index) => {
      const { title, disabled, checked, description } = input

      const element = document.createElement('div')
      element.className = 'ctrust-element'

      const head = document.createElement('div')
      head.className = 'ctrust-head'

      const label = document.createElement('label')

      if (title) {
        label.innerText = title[lang[0]] ?? title.en
      }

      label.htmlFor = 'ck' + index

      const check = document.createElement('input')
      check.type = 'checkbox'
      check.id = 'ck' + index

      if (disabled) {
        check.disabled = disabled === true ? true : false
      }

      const status = window.localStorage.getItem('_ct' + index)

      if (status) {
        check.checked = status === 'true'
      } else if (checked) {
        check.checked = checked === true
        window.localStorage.setItem('_ct' + index, checked || 'false')
      }

      check.addEventListener('change', () => {
        if (check.checked) {
          window.localStorage.setItem('_ct' + index, 'true')
        } else {
          window.localStorage.setItem('_ct' + index, 'false')
        }
      })

      head.appendChild(check)
      head.appendChild(label)
      element.appendChild(head)

      if (description) {
        const descriptionField = document.createElement('div')
        descriptionField.className = 'ctrust-description'
        descriptionField.innerHTML = description[lang[0]] ?? description.en

        const info = document.createElement('span')
        info.className = 'ctrust-info'
        info.innerHTML = '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg>'

        info.addEventListener('click', () => {
          descriptionField.classList.toggle('ctrust-descr-show')
        })

        head.appendChild(info)
        element.appendChild(descriptionField)
      }

      cookiesContainer.appendChild(element)
    })

    banner.appendChild(cookiesContainer)
  }

  const actionsWrapper = document.createElement('div')
  actionsWrapper.className = 'ctrust-actions'

  const saveAction = document.createElement('button')
  saveAction.className = 'ctrust-selected'

  if (acceptSelected) {
    saveAction.innerText = acceptSelected[lang[0]] ?? acceptSelected.en
  }

  saveAction.addEventListener('click', () => {
    if (inputs) {
      inputs.forEach((input, index) => {
        const { script, cookies } = input
        const status = window.localStorage.getItem('_ct' + index)

        if (status === 'true') {
          const loaded = container.getAttribute('data-ct' + index)

          if (!loaded && script && typeof script === 'function') {
            container.setAttribute('data-ct' + index, true)
            script()
          }
        } else {
          const loaded = container.getAttribute('data-ct' + index)

          if (loaded) {
            container.setAttribute('data-ct' + index, '')
            window.localStorage.setItem('_ctr', new Date())

            if (cookies) {
              const removeCookies = cookies.split(',')

              removeCookies.forEach(key => {
                setCookie(key.trim(), -1)
              })
            }
          }
        }
      })
    }

    window.localStorage.setItem('_ctrust', new Date())
    container.classList.remove('ctrust-show')

    if (window.localStorage.getItem('_ctr')) {
      window.localStorage.removeItem('_ctr')
      window.location.reload()
    }
  })

  const allAction = document.createElement('button')
  allAction.className = 'ctrust-all'

  if (acceptAll) {
    allAction.innerText = acceptAll[lang[0]] ?? acceptAll.en
  }

  allAction.addEventListener('click', () => {
    if (inputs) {
      inputs.forEach((input, index) => {
        const { script } = input
        const check = document.querySelector('#ck' + index)

        if (check) {
          check.checked = true
          window.localStorage.setItem('_ct' + index, 'true')

          const loaded = container.getAttribute('data-ct' + index)

          if (!loaded && script && typeof script === 'function') {
            container.setAttribute('data-ct' + index, true)
            script()
          }
        }
      })
    }

    window.localStorage.setItem('_ctrust', new Date())
    container.classList.remove('ctrust-show')
  })

  actionsWrapper.appendChild(saveAction)
  actionsWrapper.appendChild(allAction)
  banner.appendChild(actionsWrapper)
  container.appendChild(banner)

  userAgents.forEach(userAgent => {
    const lowerUserAgent = navigator.userAgent.toLowerCase()

    if (lowerUserAgent.indexOf(userAgent.toLowerCase()) >= 0) {
      isBot = true
    }
  })

  if (isBot) return

  document.body.appendChild(container)

  const visited = window.localStorage.getItem('_ctrust')

  if (!visited) {
    container.classList.add('ctrust-show')
  } else {
    saveAction.click()
  }

  const fingerprint = document.createElement('span')
  fingerprint.className = 'ctrust-fingerprint'
  fingerprint.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g class="nc-icon-wrapper" fill="#ffffff"><g stroke-linecap="round" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linejoin="round"><path d="M8.17 21.056a11.941 11.941 0 0 1-2.168-6.877c0-3.314 2.685-6 5.997-6a5.998 5.998 0 0 1 5.997 6"/><path d="M18.321 20.163c-.108.006-.214.016-.323.016a5.998 5.998 0 0 1-5.997-6"/><path d="M13.247 21.821a8.994 8.994 0 0 1-4.245-7.642 3 3 0 1 1 5.998 0 3 3 0 1 0 5.998 0c0-4.971-4.028-9-8.996-9-4.968 0-8.996 4.029-8.996 9 0 1.108.124 2.187.352 3.227"/><path d="M20.373 5.973A11.125 11.125 0 0 0 12 2.179a11.125 11.125 0 0 0-8.373 3.794"/></g></g></svg>'

  fingerprint.addEventListener('click', () => {
    container.classList.toggle('ctrust-show')
  })

  document.body.appendChild(fingerprint)
}

export default CTrust
export { setCookie, isCookieSet, block, allow, addHost, options }
