## CTrust - Cookie Banner

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
}
```
