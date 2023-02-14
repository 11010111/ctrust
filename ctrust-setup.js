import CTrust, { setCookie, addHost, allow, block, options } from './ctrust.min.js'

window.ctrust = []
window.ctrust.allow = allow
window.ctrust.setCookie = setCookie

//addHost('https://www.youtube-nocookie.com')

const extendOptions = options
extendOptions.cookies.push(
	{
		title: {
			en: 'Extern Media',
			de: 'Externe Medien'
		},
		description: {
			en: 'This is my extern media description.',
			de: 'Dies ist meine Externe Medien Beschreibung.'
		},
		checked: true,
		script: 'window.ctrust.allow(); //window.ctrust.allow("video")',
		keys: '_none'
	}
)

CTrust(extendOptions)
block()
//block('video')
