

import { writable } from 'svelte/store';

const renderMap = writable({
    command: [], // 需要被渲染的单元格
    mode: null,
    data: null
});
export default renderMap
