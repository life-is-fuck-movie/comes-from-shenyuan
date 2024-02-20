import './app.css'
import App from './App.svelte'
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';

const app = new App({
  target: document.getElementById('app'),
})

export default app
