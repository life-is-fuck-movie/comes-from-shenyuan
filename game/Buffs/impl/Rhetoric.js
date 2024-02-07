import returnData from "../BuffTemplate.js"
import BindBox from "../../characters/BindBox.js";
import notify_value from "../../../src/stores/notify.js";

/**
 * Buff： 巧言
 * 效果： 该角色言语能力出众，可以降低交易金额;提高劝降的成功率等
 * 触发： BuffType.Civil
 */
class Rhetoric extends (returnData.BuffTemplate){
    constructor(character) {
        super(character);
    }

    description = "该角色言语能力出众，可以降低交易金额;提高劝降的成功率等"
    buffType = returnData.BuffType.Civil;
    Effect(...args) {
        return true
    }
}

export default Rhetoric