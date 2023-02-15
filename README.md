# CTrust - Cookie Banner

## Was ist CTrust?

CTrust ist ein ES6 modularer Cookie Banner und kann iFrames, Videos und Audios blocken. Zudem bietet CTrust die Möglichkeit Ausnahmen für Hosts zu konfigurieren, die vom Blocken der iFrames, Video, Audios ausgeschlossen werden sollen.

## Wie binde ich CTrust ein?

In der Datei ctrust-setup.js finden Sie eine Beispiel-Konfiguration mit einen selbst definierten Cookie. Die JavaScript Datei (in dem Fall ctrust-setup.js), muss im selben Verzeichnis wie die ctrust.min.js Library liegen und importiert alle notwendigen Module.

## Kann ich CTrust ein eigenes Styling geben?

Ja. Ctrust bietet Ihnen die Möglichkein unkomliziert die Farben durch CSS Variablen anzupassen. Hier ein Beispiel zu einigen CSS Variablen

```SCSS
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
## Welche Module gibt es in CTrust?

CTrust bietet Ihnen folgende Module:

```JAVASCRIPT
import CTrust, { options } from './ctrust.min.js'

// In der Module Varibale options finden Sie die notwendigen Konfigurationen wie das Intro, Checkboxen und Beschreibungen, Button Labels.
// Diese können Sie um eigene Optionen erweitern. Nutürlich steht Ihnen auch frei die Optionen zu überschreiben.
const extendOptions = options

// Hier ein Beispiel wie Sie CTrust um eine Option in Deutsch und Englisch erweitern.
// Englisch wird bei CTrust als Standard Sprache behandelt und muss immer gegeben sein. 
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
		script: 'window.ctrust.allow(); //window.ctrust.allow("video")', // Diese Script wird beim aktivieren des Cookie ausgeführt
		keys: '_none' // Cookies die nach dem Abwählen gelöscht werden sollen
	}
)

// Dies ist das Default-Modul um den Cookie Banner zu initialisieren.
// Hierfür müssen Sie die CTrust Optionen übergeben.
CTrust(extendOptions)
```

Um eine Ausnahme zum Blocken der iFrames, Videos und Audios für einen Host zu definieren, importieren Sie die Modul-Funktion addHost und geben den Host als Parameter an die Funktion weiter.

```JAVASCRIPT
import { addHost } from './ctrust.min.js'

// Somit werden alle Medien mit der URL nicht blockiert.
addHost('https://www.youtube-nocookie.com')
```

Das Funktions-Modul `block`, blockt ohne Parameterübergabe alle iFrames. Möchten Sie Videos der Audios blocken, so rufen Sie die Funktion `block` mit `video` oder `audio` als Paramater auf.

```JAVASCRIPT
import { block } from './ctrust.min.js'

block() // Default iframes
block('video') // Blockt Videos
block('audio') // Blockt Audios
```

Wenn der Besucher eine Checkbox aktiviert und seine Auswahl bestätigt, wird der Script-Teil der Cookie-Optionen (wie oben bei extendOptions gezeigt) ausgeführt. Damit die Funktion `allow` zum entblocken der Medien für diese Script erreichbar ist, binden wir diese an das vom Browser bereitgestellte `window` Objekt.

```JAVASCRIPT
import { allow } from './ctrust.min.js'

// Zur besseren Übersicht erstellen wir ein Array Namens ctrust was unsere Funktionen enthalten wird
window.ctrust = []
window.ctrust.allow = allow // Hier wird die Funktion allow im ctrust Array unter dem selben Namen allow weitergereicht. Jetzt ist die Funktion von überall aus erreichbar und kann aus dem Script-Teil mit 'window.ctrust.allow()' aufgerufen werden.
```

Um Cookies nach dem Deaktivieren der Checkboxen und der Bestätigung der Auswahl wieder zu löschen, stellt CTrust die Modul-Funktion `setCookie` zur Verfügung. Optional kann man mit `isCookieSet` vorher prüfen, ob ein Cookie gesetzt ist. Sie können diese Funktionen ebenso an das `window` Objekt binden und aus dem Script-Teil der Cookie Konfiguration aufrufen.

```JAVASCRIPT
import { setCookie, isCookieSet } from './ctrust.min.js'

// Zur besseren Übersicht erstellen wir ein Array Namens ctrust was unsere Funktionen enthalten wird
window.ctrust = []
window.ctrust.setCookie = setCookie
window.ctrust.isCookieSet = isCookieSet

// Zum Löschen eines Cookies, muss der zweite Parameter -1 sein
// Der dritte Parameter ist für die Domain reserviert und ist nur notwendig wenn Cookies mit Domain Spezifikation gesetzt wurden
window.ctrust.setCookie('_ga', -1)

// Um zu prüfen ob ein Cookie gesetzt ist, müssen Sie nur den Namen des Cookies als Parameter übergeben
window.ctrust.isCookieSet('_ga')
```