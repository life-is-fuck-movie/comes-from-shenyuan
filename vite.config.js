import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import {less} from 'svelte-preprocess-less';

export default defineConfig({
  plugins: [svelte({
    preprocess:{
      style:less(),
    },

  })],
})