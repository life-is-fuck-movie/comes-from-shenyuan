import SkillDict from "../skills/SkillDict.js";
import Save from "../other/tools/Save.js";
import BuffDispatch from "../Buffs/BuffDispatch.js";
import buffDispatch from "../Buffs/BuffDispatch.js";
import RefreshMapData from "../../src/stores/RefreshMapData.js";
import AISkillTirgger from "../skills/AISkillTirgger.js";

/**
 * 因为JSON不方便存储方法 所以存档在这里进行BindBox
 */

let nowPlay = null;

class BindBox {
    character;

    constructor(character) {
        this.character = character
    }

    getName() {
        return this.character.Name
    }

    can_use_skill(skill_function_name){
        try {
            this.limit_use(skill_function_name)
            this.active_enough()
        }catch (e) {
            throw e
        }
        return true
    }

    active_enough(){
        if(this.character.war_active <= 0)
            throw  Error(`【${this.character.Name}】行动力不足`)
    }

    limit_use(skill_function_name){

        for (let skill of Object.values(this.character.SkillsName)){
            if (skill.function_name === skill_function_name){
                let is_limit = skill.is_limit
                if(is_limit){
                    if (this.character.skill_history.includes(skill_function_name)){
                        throw new Error("限定技能不能多次使用");
                    } // 找到了就不能用
                }else{
                    return true // 不是限定就可以一致用
                }
            }
        }

    }

    AISkill(){
        if(this.character.war_active > 1){
            AISkillTirgger.trigger(this.character.SkillGroup)
            this.character.war_active --;
            return AISkillTirgger // 触发 指定技能组的 AI技能
        }else{
            return null// 返回 null 表示士兵冲锋
        }

    }

    // region 技能释放

    computedHint(hint_value=1, magnification = 1, hostile_character) {
        // magnification 是倍率
        let ret = parseInt((this.character.Values.attack * hint_value) / hostile_character.Values.defense )
        return ret;

    }

    // endregion

    getAvatar() {
        if (this.character.Avatar !== null) {
            return `/src/game_resource/assets/characters/${this.character.AliasName}/` + this.character.Avatar
        }
        return `/src/game_resource/assets/characters/${this.character.AliasName}/Avatar.png`
    }

    getPicture() {
        if (this.character.Picture !== null) {
            return `/src/game_resource/assets/characters/${this.character.AliasName}/` + this.character.Picture
        }
        return `/src/game_resource/assets/characters/${this.character.AliasName}/Picture.png`
    }

    getAudio(type) {
        return `/src/game_resource/assets/characters/${this.character.AliasName}/sound/${type}.wav`
    }

    playAudio(type) {
        try {
            let audio = new Audio(this.getAudio(type));

            if (nowPlay !== null) {
                nowPlay.pause()
            }
            nowPlay = audio
            audio.play();
        } catch {
            console.log("似乎没有音频?")
        }

    }

    getBuffTrigger(triggerEvent) {
        let buffs = this.character.Buffs;
        for (let buff of buffs) {
            // TODO 触发当前角色的 `buff`
            console.log("触发当前角色的 `buff`， 当前是", triggerEvent)
        }
    }

    Save() {
        // 存档到本地存档
        let save = Save.LoadSaveJson("map_data")
        for (let index = 0; index < save.army.length; index++) {
            if (save.army[index].data.object.ID === this.character.ID) {
                // 我们需要替换数据了
                console.log("FINDER")
                save.army[index].data.object = this.character
                break
            }
        }
        console.log("UPDATE ", save, this.character)
        Save.WriteSaveJSON("map_data", save)
    }

    SetNowHp(value) {
        if (value > 0) {
            this.character.Values.now_hp = parseInt(value)
            if ( value > this.character.Values.max_hp){
                this.character.Values.now_hp = parseInt(this.character.Values.max_hp)
            }
        } else {
            this.character.Values.now_hp = 0
            this.character.Status.is_die = true
            return false
        }
        return true
    }

    SetNowMp(value) {
        if (value > 0) {
            this.character.Values.now_mp = value
            return true
        } else {
            return false
        }
    }

    GetBuffsWithDescription() {
        let return_value = []
        for (let buff_name of this.character.Buffs) {
            let Buff = new buffDispatch[buff_name.name](this.character)
            let tmp = [buff_name.name, Buff.description]
            return_value.push(tmp)
        }
        return return_value
    }
}

export default BindBox