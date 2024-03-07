import bindBox from "../characters/BindBox.js";
import war_tips from "../../src/stores/war_tips.js";
import warTipsManager from "../actives/warTipsManager.js";
import roundWheel from "../roundWheel.js";
import BindBox from "../characters/BindBox.js";

export default {
    /**
     * 行秋被动 雨帘添加
     * @param character 角色
     * @param round_wheel 回合轮
     */
    append_yulian(character, round_wheel){
        character.badge.push('雨帘'); // 给自己的一个buff
        let round = round_wheel;

        // region 雨帘效果注册
        let roundCode;
        roundCode = round.register_task((hint_value)=>{
            if(character.badge.includes("雨帘")){
                // 当只有存在雨帘的时候才进行记录
                console.log("加入", hint_value)
                if (character.temp_value.hint_sum === undefined){

                    character.temp_value.hint_sum = hint_value // 第一次那么久
                }else{
                    character.temp_value.hint_sum += hint_value; // 累计伤害
                }
                console.log(character.temp_value.hint_sum)
                warTipsManager.send_tip(`${character.Name}【雨帘】记录伤害【${character.temp_value.hint_sum}】`)
            }else {
                console.log("该死的对面把我的雨帘整哪里去了呢？")
                warTipsManager.send_tip(`【雨帘记录消失】`)

                character.temp_value.hint_sum = 0 // 累计伤害失去
                round.cancel_task(roundCode); // 注销这个没用的东西
            }
        }, round.TYPE.ME_HINT, round.RoundMakePolicy.sustain(3)); // 持续3回合的攻击记录
        // endregion

        // region 回收雨帘注册
        let cancel_code;
        cancel_code = round.register_task(
            ()=>{
                if(character.badge.includes("雨帘")){

                    character.badge.splice(character.badge.indexOf("雨帘"), 1);// 删除雨帘一个

                    if (character.temp_value.used_yi !== true){
                        // 记载血量恢复血量
                        let add = parseInt(character.temp_value.hint_sum / 3);
                        let bind_box = new bindBox(character);
                        warTipsManager.send_tip(`${character.Name}【雨帘】到期，其恢复了${add}点血量`)

                        console.log(",", character.temp_value, character.Values.now_hp) // 当前血量

                        bind_box.SetNowHp(character.Values.now_hp + add) // 恢复血量
                    }
                    else
                        warTipsManager.send_tip(`${character.Name}因为使用了义无法雨帘效果无效啦~`)
                }
            }, round.TYPE.AFTER, round.RoundMakePolicy.specify([round.round + 3])
        )
        // endregion
    },

    append_yi(character, round_wheel){
        character.badge.push('义'); // 给自己的一个buff
        let token = `re_life${character.ID}`;
        round_wheel.tasks_signal.push(token); // 添加一个不死的
        let  cancel_code = round_wheel.register_task(
            ()=>{
                character.badge.splice(character.badge.indexOf("义"), 1); // 删除一个义
                character.is_die = false; // 复活了
                let bind_character = new BindBox(character);
                bind_character.SetNowHp(parseInt(character.Values.max_hp / 2)) // 血量恢复
                warTipsManager.send_tip(`${character.Name}受到致命一击但是使用【义】复活了`)
                character.temp_value.used_yi = true
                round_wheel.cancel_task(cancel_code)


            }, token, round_wheel.RoundMakePolicy.long()
        )

    }
}