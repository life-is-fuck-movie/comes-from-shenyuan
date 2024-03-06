import {writable} from 'svelte/store';
import saveManager from "/game/other/tools/Save.js"

// 创建一个 writable store
const warTips = writable({
    "tips":"初始化战斗模块，接下来让我给你解说~",
    "code": 12
});

export default warTips