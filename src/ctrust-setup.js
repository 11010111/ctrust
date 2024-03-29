import CTrust, { allow, block, options } from './ctrust.min.js'
import './ctrust.scss'

const extendOptions = options
extendOptions.inputs.push(
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
      }, 100)
    },
    cookies: '_none'
  }
)

CTrust(extendOptions)
block()
