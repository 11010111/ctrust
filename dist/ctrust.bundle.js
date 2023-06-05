(()=>{"use strict";var e=[],t=function(e){var t=document.createElement("div");t.className="ctrust-wrapper",t.addEventListener("click",(function(){var e=document.querySelector(".ctrust");e&&e.classList.add("ctrust-show")})),e.parentElement.replaceChild(t,e),t.appendChild(e)},n=function(t){var n=!1;return e.forEach((function(e){t.indexOf(e)>=0&&(n=!0)})),n};var i={intro:{en:["<h1>Cookies</h1>",'<p>We use cookies to provide you with the best service and to keep improving it. If you click on "Accept all", you agree to the use of all cookies. If you click on "Accept selection", you only agree to the use of cookies in the categories you have selected. For more information, please see our <a href="/privacy">privacy policy</a>.</p>'],de:["<h1>Cookies</h1>",'<p>Wir verwenden Cookies, um Ihnen einen optimalen Service anzubieten und diesen immer weiter zu verbessern. Wenn Sie auf „Alle akzeptieren“ klicken, stimmen Sie der Verwendung aller Cookies zu. Wenn Sie auf „Auswahl akzeptieren“ klicken, erklären Sie sich nur mit der Verwendung von Cookies in den von Ihnen ausgewählten Kategorien einverstanden. Weitere Informationen finden Sie in unserer <a href="/datenschutz">Datenschutzerklärung</a>.</p>']},cookies:[{title:{en:"Necessary Cookies",de:"Erforderliche Cookies"},description:{en:"These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.",de:"Diese Cookies sind zur Funktion der Website erforderlich und können in Ihren Systemen nicht deaktiviert werden. In der Regel werden diese Cookies nur als Reaktion auf von Ihnen getätigte Aktionen gesetzt, die einer Dienstanforderung entsprechen, wie etwa dem Festlegen Ihrer Datenschutzeinstellungen, dem Anmelden oder dem Ausfüllen von Formularen. Sie können Ihren Browser so einstellen, dass diese Cookies blockiert oder Sie über diese Cookies benachrichtigt werden. Einige Bereiche der Website funktionieren dann aber nicht. Diese Cookies speichern keine personenbezogenen Daten."},checked:!0,disabled:!0,script:null,keys:"_none"}],actions:{acceptAll:{en:"Accept all",de:"Alle akzeptieren"},acceptSelected:{en:"Accept selection",de:"Auswahl akzeptieren"}}};i.cookies.push({title:{en:"Extern Media",de:"Externe Medien"},description:{en:"This is my extern media description.",de:"Dies ist meine Externe Medien Beschreibung."},checked:!0,script:function(){setTimeout((function(){!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"iframe";document.querySelectorAll(".ctrust-wrapper").forEach((function(t){if("iframe"===e){var n=t.querySelector(e);n&&(n.src=n.getAttribute("data-src"),t.parentElement.replaceChild(n,t))}else if("video"===e||"audio"===e){var i=t.querySelector(e);i&&(i.querySelectorAll("source").forEach((function(e){e.src=e.getAttribute("data-src")})),t.parentElement.replaceChild(i,t))}}))}()}),100)},keys:"_none"}),function(e){var t,n;if(e){var i=document.createElement("div");i.className="ctrust";var r=document.querySelector("html"),o="en";if(r){var c=r.getAttribute("lang");c&&(o=c[0].toLowerCase()+c[1].toLowerCase())}var a=document.createElement("div");if(a.className="ctrust-banner",null!=e&&e.intro){var s=document.createElement("div");s.className="ctrust-intro",s.innerHTML=e.intro.hasOwnProperty(o)?e.intro[o].join(""):e.intro.en.join(""),a.appendChild(s)}if(null!=e&&e.cookies){var l=document.createElement("div");l.className="ctrust-elements-wrapper",e.cookies.forEach((function(e,t){var n=document.createElement("div");n.className="ctrust-element";var i=document.createElement("div");i.className="ctrust-head";var r=document.createElement("label");null!=e&&e.title&&(r.innerText=e.title.hasOwnProperty(o)?e.title[o]:e.title.en),r.htmlFor="ck"+t;var c=document.createElement("input");c.type="checkbox",c.id="ck"+t,null!=e&&e.disabled&&(c.disabled=!0===e.disabled);var a=window.localStorage.getItem("_ct"+t);if(a?c.checked="true"===a:null!=e&&e.checked&&(c.checked=e.checked,window.localStorage.setItem("_ct"+t,e.checked||"false")),c.addEventListener("change",(function(){c.checked?window.localStorage.setItem("_ct"+t,"true"):window.localStorage.setItem("_ct"+t,"false")})),i.appendChild(c),i.appendChild(r),n.appendChild(i),null!=e&&e.description){var s=document.createElement("div");s.className="ctrust-description",s.innerHTML=e.description.hasOwnProperty(o)?e.description[o]:e.description.en;var d=document.createElement("span");d.className="ctrust-info",d.innerHTML='<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg>',d.addEventListener("click",(function(){s.classList.toggle("ctrust-descr-show")})),i.appendChild(d),n.appendChild(s)}l.appendChild(n)})),a.appendChild(l)}var d=document.createElement("div");d.className="ctrust-actions";var u=document.createElement("button");u.className="ctrust-selected",null!=e&&e.actions&&null!=(t=e.actions)&&t.acceptSelected&&(u.innerText=e.actions.acceptSelected.hasOwnProperty(o)?e.actions.acceptSelected[o]:e.actions.acceptSelected.en),u.addEventListener("click",(function(){null!=e&&e.cookies&&e.cookies.forEach((function(e,t){"true"===window.localStorage.getItem("_ct"+t)?!i.getAttribute("data-ct"+t)&&null!=e&&e.script&&"function"==typeof e.script&&(i.setAttribute("data-ct"+t,!0),e.script()):i.getAttribute("data-ct"+t)&&(i.setAttribute("data-ct"+t,""),window.localStorage.setItem("_ctr",new Date),null!=e&&e.keys&&e.keys.split(",").forEach((function(e){!function(e,t,n){var i=new Date;if(i.setTime(Date.now()+-864e5),!n){var r=window.location.host.split(".");n=Number(r[r.length-1])?window.location.host:r[r.length-2]+"."+r[r.length-1]}document.cookie=e+"="+i.getTime()+"; expires="+i.toUTCString()+"; path=/; domain="+n+"; SameSite=Strict"}(e.trim())})))})),window.localStorage.setItem("_ctrust",new Date),i.classList.remove("ctrust-show"),window.localStorage.getItem("_ctr")&&(window.localStorage.removeItem("_ctr"),window.location.reload())}));var p=document.createElement("button");p.className="ctrust-all",null!=e&&e.actions&&null!=(n=e.actions)&&n.acceptAll&&(p.innerText=e.actions.acceptAll.hasOwnProperty(o)?e.actions.acceptAll[o]:e.actions.acceptAll.en),p.addEventListener("click",(function(){null!=e&&e.cookies&&e.cookies.forEach((function(e,t){var n=document.querySelector("#ck"+t);n&&(n.checked=!0,window.localStorage.setItem("_ct"+t,"true"),!i.getAttribute("data-ct"+t)&&null!=e&&e.script&&"function"==typeof e.script&&(i.setAttribute("data-ct"+t,!0),e.script()))})),window.localStorage.setItem("_ctrust",new Date),i.classList.remove("ctrust-show")})),d.appendChild(u),d.appendChild(p),a.appendChild(d),i.appendChild(a),document.body.appendChild(i),window.localStorage.getItem("_ctrust")?u.click():i.classList.add("ctrust-show");var h=document.createElement("span");h.className="ctrust-fingerprint",h.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g class="nc-icon-wrapper" fill="#ffffff"><g stroke-linecap="round" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linejoin="round"><path d="M8.17 21.056a11.941 11.941 0 0 1-2.168-6.877c0-3.314 2.685-6 5.997-6a5.998 5.998 0 0 1 5.997 6"/><path d="M18.321 20.163c-.108.006-.214.016-.323.016a5.998 5.998 0 0 1-5.997-6"/><path d="M13.247 21.821a8.994 8.994 0 0 1-4.245-7.642 3 3 0 1 1 5.998 0 3 3 0 1 0 5.998 0c0-4.971-4.028-9-8.996-9-4.968 0-8.996 4.029-8.996 9 0 1.108.124 2.187.352 3.227"/><path d="M20.373 5.973A11.125 11.125 0 0 0 12 2.179a11.125 11.125 0 0 0-8.373 3.794"/></g></g></svg>',h.addEventListener("click",(function(){i.classList.toggle("ctrust-show")})),document.body.appendChild(h)}}(i),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"iframe";document.querySelectorAll(e).forEach((function(i){if("iframe"!==e||n(i.src)){if("video"===e||"audio"===e){var r=i.querySelectorAll("source"),o=0;r.forEach((function(e){n(e.src)||(e.setAttribute("data-src",e.src),e.src="",o++)})),o===r.length&&t(i)}}else i.setAttribute("data-src",i.src),i.src="",t(i)}))}()})();