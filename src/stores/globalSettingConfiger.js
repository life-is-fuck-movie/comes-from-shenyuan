

import { writable } from 'svelte/store';
import saveManager from "/src/tools/Save.js"

// 创建一个 writable store
const settingConfig = writable(
    saveManager.LoadSaveJson("setting")
);

export default settingConfig
