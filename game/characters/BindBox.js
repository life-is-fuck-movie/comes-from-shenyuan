import SkillDict from "../skills/SkillDict.js";
import Save from "../other/tools/Save.js";
import BuffDispatch from "../Buffs/BuffDispatch.js";
import buffDispatch from "../Buffs/BuffDispatch.js";
import RefreshMapData from "../../src/stores/RefreshMapData.js";

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

    // region 技能释放
    release(skill_type) {
        this.getBuffTrigger("BeforeReleaseSkill")

        let skill_name = this.character.SkillsName[skill_type]
        if (skill_name !== null) {
            skill_name = skill_name.event

            console.log(SkillDict)
            let skill = SkillDict[skill_name]
            if (skill !== null) {
                return skill
            }
        }
        this.getBuffTrigger("AfterReleaseSkill")
    }

    computedHint(hint_value=1, magnification = 1, hostile_character) {
        // magnification 是倍率
        let ret = parseInt((this.character.Values.attack * hint_value) / hostile_character.Values.defense)
        return ret;


    }

    releaseSkillA() {
        return this.skill_type("SkillA")
    }

    releaseSkillB() {
        return this.skill_type("SkillB")
    }

    releaseSkillC() {
        return this.skill_type("SkillC")
    }

    releaseSkillD() {
        return this.skill_type("SkillD")
    }

    // endregion

    getStatusData(key) {
        return this.character.Status[key]
    }

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
            console.log(save.army[index].data.object.ID, this.character.ID)
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