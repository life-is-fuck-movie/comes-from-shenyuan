import {writable} from 'svelte/store';
import saveManager from "/game/other/tools/Save.js"

let saveValue = saveManager.LoadSave("active-power"); // 读取存档
if (saveValue === null) { // 无存档
    saveManager.WriteSaveBasic("active-power", "0");
    saveValue = "0";
}
saveValue = parseInt(saveValue);

// 创建一个 writable store
const activePowerValue = writable(saveValue);

function expend(value) {
    let flag;
    activePowerValue.update(value1 => {
            let ret = value1 - value;
            flag = ret >= 0;
            if (flag){return ret}
    }) // 修改
    return flag
}
const return_value = {
    "status":activePowerValue,
    "expend":expend
}
export default return_value