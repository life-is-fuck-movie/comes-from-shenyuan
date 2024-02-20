
import { writable } from 'svelte/store';

// 创建一个 writable store
const toast = writable({
    show_code: Math.random(),
    value: ""
});

export default toast;
