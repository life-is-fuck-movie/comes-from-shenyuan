
import { writable } from 'svelte/store';

// 创建一个 writable store
const showModals = writable(
    {
        type: "character",
        flag: false,
        data: void 0,
        close: false // 是否允许关闭
    }
);

export default showModals