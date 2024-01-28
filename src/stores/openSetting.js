
import { writable } from 'svelte/store';

// 创建一个 writable store
const openSetting = writable(false);

export default openSetting
