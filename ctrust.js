// CookieTrust

const options = {
    intro: {
        en: [
            '<h1>Cookies</h1>',
            '<p>We use cookies to provide you with the best service and to keep improving it. If you click on "Accept all", you agree to the use of all cookies. If you click on "Accept selection", you only agree to the use of cookies in the categories you have selected. For more information, please see our <a href="/privacy>privacy policy</a>.".</p>'
        ],
        de: [
            '<h1>Cookies</h1>',
            '<p>Wir verwenden Cookies, um Ihnen einen optimalen Service anzubieten und diesen immer weiter zu verbessern. Wenn Sie auf „Alle akzeptieren“ klicken, stimmen Sie der Verwendung aller Cookies zu. Wenn Sie auf „Auswahl akzeptieren“ klicken, erklären Sie sich nur mit der Verwendung von Cookies in den von Ihnen ausgewählten Kategorien einverstanden. Weitere Informationen finden Sie in unserer <a href="/datenschutz">Datenschutzerklärung</a>.</p>'
        ]
    },
    cookies: [
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
            script: 'console.log("Necessary function loaded.")',
            keys: '_none'
        }
    ],
    actions: {
        acceptAll: {
            en: 'Accept all',
            de: 'Alle akzeptieren',
        },
        acceptSelected: {
            en: 'Accept selection',
            de: 'Auswahl akzeptieren',
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
    let cookies = document.cookie.split(';')

    cookies.forEach(cookie => {
        const cookieParts = cookie.split('=')

        if (name === cookieParts[0].trim()) {
            return true
        }
    })

    return false
}

const addHost = (host) => {
    if (window.ctrust !== undefined) {
        if (window.ctrust.hosts !== undefined) {
            window.ctrust.hosts.push(host)
        } else {
            window.ctrust.hosts = []
            window.ctrust.hosts.push(host)
        }
    }
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

    if (window.ctrust !== undefined && window.ctrust.hosts !== undefined) {
        window.ctrust.hosts.forEach(host => {
            if (src.indexOf(host) >= 0) {
                tmp = true
            }
        })
    }

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

    const style = document.createElement('style')
    style.id = 'ctrust-css'
    style.innerHTML = '.ctrust{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background-color:var(--ctrust-bg, rgba(40, 44, 50, 0.8));z-index:9999}.ctrust .ctrust-banner{position:fixed;bottom:1.125rem;right:1.125rem;display:grid;row-gap:2.25rem;background-color:var(--ctrust-banner-bg, #282c32);color:var(--ctrust-banner-fg, #ffffff);width:calc(100% - 2.25rem);max-width:33.75rem;max-height:calc(100% - 2.25rem);padding:1.6875rem 2.25rem;border-radius:0.1875rem;overflow-y:auto}.ctrust .ctrust-banner .ctrust-intro h1,.ctrust .ctrust-banner .ctrust-intro h2,.ctrust .ctrust-banner .ctrust-intro h3,.ctrust .ctrust-banner .ctrust-intro h4,.ctrust .ctrust-banner .ctrust-intro h5,.ctrust .ctrust-banner .ctrust-intro h6{margin:0 0 1.125rem}.ctrust .ctrust-banner .ctrust-intro p{margin:0 0 1.125rem}.ctrust .ctrust-banner .ctrust-intro p:last-of-type{margin:0}.ctrust .ctrust-banner .ctrust-elements-wrapper{display:grid;row-gap:0.5625rem}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element{display:grid;row-gap:0.5625rem}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element .ctrust-head{display:grid;grid-template-columns:1.125rem 1fr 1.125rem;align-items:center;column-gap:1.125rem}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element .ctrust-head input{appearance:none;display:grid;place-content:center;margin:0;padding:0;background-color:var(--ctrust-check-bg, #ffffff);border:0.125rem solid var(--ctrust-check-border, #60656c);border-radius:0.125rem;width:1.6875rem;height:1.6875rem;cursor:pointer}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element .ctrust-head input::after{content:"";width:0.9375rem;height:0.9375rem;transform:scale(0);transition:.12s transform ease-in-out;background-color:var(--ctrust-check-checked, #43903a)}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element .ctrust-head input:checked::after{transform:scale(1)}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element .ctrust-head input:disabled{border:0.125rem solid var(--ctrust-check-border, #60656c);cursor:unset}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element .ctrust-head input:disabled::after{background-color:var(--ctrust-check-disabled, #60656c)}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element .ctrust-head .ctrust-info{position:relative;width:1.375rem;height:1.375rem;cursor:pointer}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element .ctrust-head .ctrust-info svg{width:1.375rem;height:1.375rem}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element .ctrust-head .ctrust-info svg path{stroke:var(--ctrust-info-stroke, #ffffff)}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element .ctrust-description{display:none;background-color:var(--ctrust-descr-bg, #323232);color:var(--ctrust-descr-fg, #9d9d9d);padding:0.9375rem;font-size:0.9375rem;border-radius:0.125rem}.ctrust .ctrust-banner .ctrust-elements-wrapper .ctrust-element .ctrust-descr-show{display:block}.ctrust .ctrust-banner .ctrust-actions{display:flex;justify-content:flex-end;align-items:center;flex-wrap:wrap;column-gap:0.5625rem;row-gap:0.5625rem}.ctrust .ctrust-banner .ctrust-actions .ctrust-selected{border-radius:0.1875rem;border:0.0625rem solid var(--ctrust-selectedbtn-border, #323232);padding:0.5625rem 1.125rem;background-color:var(--ctrust-selectedbtn-bg, #43903a);color:var(--ctrust-selectedbtn-fg, #151515);cursor:pointer}@media not screen and (min-width: 768px){.ctrust .ctrust-banner .ctrust-actions .ctrust-selected{width:100%;text-align:center}}.ctrust .ctrust-banner .ctrust-actions .ctrust-all{border-radius:0.1875rem;border:0.0625rem solid var(--ctrust-allbtn-border, #323232);background-color:var(--ctrust-allbtn-bg, #ffffff);color:var(--ctrust-allbtn-fg, #000000);padding:0.5625rem 1.125rem;cursor:pointer}@media not screen and (min-width: 768px){.ctrust .ctrust-banner .ctrust-actions .ctrust-all{width:100%;text-align:center}}.ctrust-show{display:block}.ctrust-fingerprint{position:fixed;left:0;bottom:1.125rem;display:flex;justify-content:center;align-items:center;padding:0.375rem 0.5625rem 0.375rem 1.125rem;background-color:var(--ctrust-fingerprint-bg, #282c32);border-top-right-radius:0.1875rem;border-bottom-right-radius:0.1875rem;cursor:pointer;transition:padding .125s ease-in-out;z-index:9998}.ctrust-fingerprint:hover{padding:0.375rem 0.5625rem 0.375rem 1.6875rem}.ctrust-fingerprint:hover svg path{stroke:var(----ctrust-fingerprint-stroke-hover, #43903a)}.ctrust-fingerprint svg{width:1.5rem;height:1.5rem}.ctrust-fingerprint svg path{stroke:var(--ctrust-fingerprint-stroke, #ffffff)}.ctrust-wrapper{display:flex;position:relative;background-color:rgba(0,0,0,0);cursor:pointer}.ctrust-wrapper iframe,.ctrust-wrapper img,.ctrust-wrapper video,.ctrust-wrapper audio{position:relative;z-index:-1}.ctrust-wrapper::after{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex;justify-content:center;align-items:center;width:calc(100% - 2.25rem);height:calc(100% - 2.25rem);background-color:var(--ctrust-wrapper-bg, #000000);color:var(--ctrust-wrapper-fg, #ffffff);padding:1.125rem;z-index:-1}.ctrust-wrapper:lang(en)::after{content:"External media has been blocked."}.ctrust-wrapper:lang(de)::after{content:"Externe Medien wurden blockiert."}'
    document.head.appendChild(style)

    const container = document.createElement('div')
    container.className = 'ctrust'
    const html = document.querySelector('html')
    let lang = 'en';

    if (html) {
        const language = html.getAttribute('lang')
        
        if (language) {
            lang = language.split('-')[0]
        }
    }
    
    const banner = document.createElement('div')
    banner.className = 'ctrust-banner'

    if (options.intro) {
        const intro = document.createElement('div')
        intro.className = 'ctrust-intro'
        intro.innerHTML = options.intro.hasOwnProperty(lang) ? options.intro[lang].join('') : options.intro['en'].join('')
        banner.appendChild(intro)
    }

    if (options.cookies) {
        const cookiesContainer = document.createElement('div')
        cookiesContainer.className = 'ctrust-elements-wrapper'

        options.cookies.forEach((cookie, index) => {
            const element = document.createElement('div')
            element.className = 'ctrust-element'

            const head = document.createElement('div')
            head.className = 'ctrust-head'

            const label = document.createElement('label')
            label.innerText = cookie.title.hasOwnProperty(lang) ? cookie.title[lang] : cookie.title['en']
            label.htmlFor = 'ck' + index

            const check = document.createElement('input')
            check.type = 'checkbox'
            check.id = 'ck' + index
            check.disabled = cookie.disabled ? true : false

            const status = window.localStorage.getItem('_ct' + index)

            if (status) {
                check.checked =  status === 'true' ? true : false
            } else {
                check.checked =  cookie.checked
                window.localStorage.setItem('_ct' + index, cookie.checked || 'false')
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

            if (cookie.description) {
                const description = document.createElement('div')
                description.className = 'ctrust-description'
                description.innerHTML = cookie.description.hasOwnProperty(lang) ? cookie.description[lang] : cookie.description['en']

                const info = document.createElement('span')
                info.className = 'ctrust-info'
                info.innerHTML = '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg>'

                info.addEventListener('click', () => {
                    description.classList.toggle('ctrust-descr-show')
                })

                head.appendChild(info)
                element.appendChild(description)
            }
            
            cookiesContainer.appendChild(element)
        })

        banner.appendChild(cookiesContainer)
    }

    const actions = document.createElement('div')
    actions.className = 'ctrust-actions'

    const saveAction = document.createElement('button')
    saveAction.className = 'ctrust-selected'
    saveAction.innerText = options.actions.acceptSelected.hasOwnProperty(lang) ? options.actions.acceptSelected[lang] : options.actions.acceptSelected['en']

    saveAction.addEventListener('click', () => {
        if (options.cookies) {
            options.cookies.forEach((cookie, index) => {
                const status = window.localStorage.getItem('_ct' + index)
    
                if (status === 'true') {
                    const script = document.querySelector('#ct' + index)
    
                    if (!script) {
                        const script = document.createElement('script')
                        script.id = 'ct' + index
                        script.type = 'module'
                        script.innerHTML = cookie.script
                        document.body.appendChild(script)
                    }
                } else {
                    const script = document.querySelector('#ct' + index)
    
                    if (script) {
                        script.remove()
                        window.localStorage.setItem('_ctr', new Date())

                        if (cookie.keys) {
                            const keys = cookie.keys.split(',')

                            keys.forEach(key => {
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
    allAction.innerText = options.actions.acceptAll.hasOwnProperty(lang) ? options.actions.acceptAll[lang] : options.actions.acceptAll['en']

    allAction.addEventListener('click', () => {
        if (options.cookies) {
            options.cookies.forEach((cookie, index) => {
                const check = document.querySelector('#ck' + index)
    
                if (check) {
                    check.checked = true
                    window.localStorage.setItem('_ct' + index, 'true')
    
                    const script = document.querySelector('#ct' + index)
    
                    if (!script) {
                        const script = document.createElement('script')
                        script.id = 'ct' + index
                        script.type = 'module'
                        script.innerHTML = cookie.script
                        document.body.appendChild(script)
                    }
                }
            })
        }

        window.localStorage.setItem('_ctrust', new Date())
        container.classList.remove('ctrust-show')
    })

    actions.appendChild(saveAction)
    actions.appendChild(allAction)
    banner.appendChild(actions)
    container.appendChild(banner)
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
