
import { writable } from 'svelte/store';

// 创建一个 writable store
const showModals = writable(
    {
        type: "character",
        flag: false,
        data: void 0
    }
);

export default showModals