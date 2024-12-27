import './style.css'
import { setupCounter } from './counter.js'
import index from `./index.html`

document.querySelector('#app').innerHTML = `

`

setupCounter(document.querySelector('#counter'))
