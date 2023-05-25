# CTrust - Cookie Banner

## Was ist CTrust?

CTrust ist ein ES6 modularer Cookie Banner und kann iFrames, Videos und Audios blocken. Zudem bietet CTrust die Möglichkeit Ausnahmen für Hosts zu konfigurieren, die vom Blocken der iFrames, Video, Audios ausgeschlossen werden sollen.

## CTrust Installation

In der Datei ctrust-setup.js finden Sie eine Beispiel-Konfiguration mit einen selbst definierten Cookie für Externe Medien. Die JavaScript Datei (in dem Fall `src/ctrust-setup.js`), muss im selben Verzeichnis wie die `src/ctrust.min.js` Library liegen und importiert alle notwendigen Module.

## CTrust Styling

Ctrust bietet Ihnen die Möglichkein unkomliziert CSS Eigenschaften durch vordefinierte CSS Variablen anzupassen. Hier ein Beispiel zu einigen verfügbaren Variablen:

```scss
:root {
    --ctrust-bg: rgba(40, 44, 50, 0.8);
    --ctrust-banner-bg: #282c32;
    --ctrust-banner-fg: #ffffff;
    --ctrust-check-bg: #ffffff;
    --ctrust-check-border: #60656c;
    --ctrust-check-checked: #43903a;
    --ctrust-check-disabled: #60656c;
    --ctrust-descr-bg: #323232;
    --ctrust-descr-fg: #9d9d9d;
    --ctrust-btn-selected-border: #323232;
    --ctrust-btn-selected-bg: #43903a;
    --ctrust-btn-selected-fg: #151515;
    --ctrust-btn-all-border: #323232;
    --ctrust-btn-all-bg: #ffffff;
    --ctrust-btn-all-fg: #000000;
    --ctrust-info-stroke: #ffffff;
    --ctrust-fingerprint-bg: #282c32;
    --ctrust-fingerprint-stroke: #ffffff;
    --ctrust-fingerprint-stroke-hover: #43903a;
    --ctrust-wrapper-bg: #000000;
    --ctrust-wrapper-fg: #ffffff;
    ...
}
```
## CTrust Konfiguration

Jede CTrust Instanz müssen Sie mit dem Default Modul `CTrust` und der Modul-Variable `options` initialisieren.

```javascript
import CTrust, { options } from './ctrust.min.js'

CTrust(options)
```

Möchten Sie das Modul um eigene Cookies erweitern, können Sie dies wie folgt tun.

```javascript
import CTrust, { options } from './ctrust.min.js'

const extendOptions = options
extendOptions.cookies.push(
    {
        title: { // Label des Cookies
            en: 'Extern Media',
            de: 'Externe Medien'
        },
        description: { // Beschreibung des Cookies
            en: 'This is my extern media description.',
            de: 'Dies ist meine Externe Medien Beschreibung.'
        },
        checked: true, // Aktiviert die Checkbox im initialen Zustand
        disabled: false, // Deaktiviert die Checkbox
        script: () => {
            console.log('Extern Media Loaded...')
        }, // Diese Script wird beim aktivieren des Cookie ausgeführt
        keys: '_none' // Cookies die nach dem Abwählen gelöscht werden sollen
    }
)

CTrust(extendOptions)
```

Beachten Sie die Struktur der `options` Modul-Variable, wenn Sie diese bei der Konfiguration überschreiben wollen.

```javascript
const options = {
    intro: {
        en: [
            '<h1>Cookies</h1>',
            '<p>We use cookies to provide ... .</p>'
        ],
        de: [
            '<h1>Cookies</h1>',
            '<p>Wir verwenden Cookies, ... .</p>'
        ]
    },
    cookies: [
        {
            title: {
                en: 'Necessary Cookies',
                de: 'Erforderliche Cookies'
            },
            description: {
                en: 'These cookies are necessary ... .',
                de: 'Diese Cookies sind zur Funktion ... .'
            },
            checked: true,
            disabled: true,
            script: () => {
                ...
            },
            keys: '_none1, _none2'
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
```

Die Lokalisierung von CTrust wird aus dem `lang` Attribut des HTML-Tag gelesen und automatisch gesetzt. Ist eine Sprache nicht verfügbar, so wird die Default Sprache `en` gesetzt. Die `en` Lokalisierung muss in jedem Fall in Ihrer `options` für Texte vorhanden sein, damit CTrust einwandfrei funktiniert.

```html
<html lang="en">
    ...
</html>
```

## CTrust Module

Um eine Ausnahme zum Blocken der iFrames, Videos und Audios für einen Host zu definieren, importieren Sie die Modul-Funktion addHost und geben den Host als Parameter an die Funktion weiter.

```javascript
import { addHost } from './ctrust.min.js'

// Somit werden alle Medien mit der URL nicht blockiert.
addHost('https://www.youtube-nocookie.com')
```

Das Funktions-Modul `block`, blockt ohne Parameterübergabe alle iFrames. Möchten Sie Videos oder Audios blocken, so rufen Sie die Funktion `block` mit `video` oder `audio` als Paramater auf.

```javascript
import { block } from './ctrust.min.js'

block() // Default iframes
block('video') // Blockt Videos
block('audio') // Blockt Audios
```

Wenn der Besucher eine Checkbox aktiviert und seine Auswahl bestätigt, wird der Script-Teil der Cookie-Optionen ausgeführt. Um zum Beispiel die Externen Medien nach dem Blocken zuladen, stellt Ihnen CTrust die Modul-Funktion `allow` bereit.

```javascript
import { allow } from './ctrust.min.js'

allow()
allow('video')
allow('audio')
```

CTrust stellt Ihnen auch die Modul-Funktion `setCookie` und `isCookieSet` bereit.

```javascript
import { setCookie, isCookieSet } from './ctrust.min.js'

// Schreiben eines Cookies für die aktuelle Domain
// Der Domain Parameter ist hier Optional
setCookie('_ga', 365, window.location.host)

// Zum Löschen eines Cookies, muss der zweite Parameter -1 sein
// Der dritte Parameter ist für die Domain reserviert und ist nur notwendig wenn Cookies mit Domain Spezifikation gesetzt wurden
setCookie('_ga', -1, window.location.host)

// Um zu prüfen ob ein Cookie gesetzt ist, müssen Sie nur den Namen des Cookies als Parameter übergeben
isCookieSet('_ga')
```
