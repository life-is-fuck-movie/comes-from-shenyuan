import SkillDict from "../skills/SkillDict.js";

/**
 * 因为JSON不方便存储方法 所以存档在这里进行BindBox
 */
class BindBox {
    character;

    constructor(character) {
        this.character = character
    }

    update(character){
        // 更新数据
    }

    // region 技能释放
    release(skill_type) {
        this.getBuffTrigger("BeforeReleaseSkill")

        let skill_name = this.character.SkillsName[skill_type]
        if (skill_name !== null) {
            let skill = SkillDict[skill_name]
            if (skill !== null) {
                return skill
            }
        }
        this.getBuffTrigger("AfterReleaseSkill")
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

    getAvatar(){
        return `/src/game_resource/assets/characters/${this.character.AliasName}/Avatar.png`
    }

    getPicture(){
        return `/src/game_resource/assets/characters/${this.character.AliasName}/Picture.png`
    }

    getBuffTrigger(triggerEvent){
        let buffs = this.character.Buffs;
        for (let buff of buffs){
            // TODO 触发当前角色的 `buff`
            console.log("触发当前角色的 `buff`， 当前是", triggerEvent)

        }
    }
}
export default BindBox