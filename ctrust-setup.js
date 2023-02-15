import CTrust, { addHost, allow, block, options } from './ctrust.min.js'

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
		script: () => {
            setTimeout(() => {
				allow()
				//allow("video")
				console.log('Extern Media loaded.')
			},100)
		},
		keys: '_none'
	}
)

CTrust(extendOptions)
block()
//block('video')
