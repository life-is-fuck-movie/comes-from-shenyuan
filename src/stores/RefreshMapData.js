
import { writable } from 'svelte/store';

// 创建一个 writable store
const RefreshMapData = writable(false);

export default RefreshMapData
