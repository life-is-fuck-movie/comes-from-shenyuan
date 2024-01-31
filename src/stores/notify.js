

import { writable } from 'svelte/store';
import saveManager from "/game/other/tools/Save.js"


// 创建一个 writable store
const notify_value = writable({
    type:"urgent",
    value: "游戏初始化完毕！",
    headimage: "/src/game_resource/assets/characters/丛雨/headimage.jpg"
});

export default notify_value
