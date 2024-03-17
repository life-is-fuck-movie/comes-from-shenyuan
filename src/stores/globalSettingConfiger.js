import {writable} from 'svelte/store';
import saveManager from "/game/other/tools/Save.js"


function settingLoad(){
    let setting = saveManager.LoadSaveJson("setting")
    if (setting === void 0){
        let default_value = {move: 1}
        saveManager.WriteSaveJSON("setting", default_value)
        setting = default_value

    }
    return setting
}
// 创建一个 writable store
const settingConfig = writable(
settingLoad()
);

export default settingConfig
