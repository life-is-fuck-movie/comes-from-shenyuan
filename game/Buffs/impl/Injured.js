import returnData from "../BuffTemplate.js"
import BindBox from "../../characters/BindBox.js";
import notify_value from "../../../src/stores/notify.js";
/**
 * Buff： 受伤
 * 效果： 该角色目前已经受伤, 角色每回合失去1-3点生命
 * 触发： BuffType.Round
 */
class Injured extends (returnData.BuffTemplate){
    constructor(character) {
        super(character);
    }

    description = "该角色目前已经受伤, 角色每回合失去1-3点生命"
    buffType = returnData.BuffType.Round;
    Effect(..._) {
        let chara_bindBox = new BindBox(this.character)
        let random_hint = Math.floor(Math.random()*3 + 1)
        chara_bindBox.SetNowHp(this.character.Values.now_hp - random_hint)
        notify_value.set({
            type:"warning",
            value: `${this.character.Name} 因为受伤失去 ${random_hint} 点生命`
        });
        return true
    }
}

export default Injured