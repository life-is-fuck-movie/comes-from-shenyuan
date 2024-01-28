
import { writable } from 'svelte/store';

// 创建一个 writable store
const allow_scroll = writable(true);

export default allow_scroll
