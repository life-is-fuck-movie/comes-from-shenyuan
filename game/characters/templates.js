import SkillDict from "../skills/SkillDict.js";

class BindBox {
    character;

    constructor(character) {
        this.character = character
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

class CharacterTemplates {
    Name = "匿名角色";
    Buffs = []; // 被动效果 、 回合效果等
    AliasName = "" // 别名 用在文件系统上的

    Values = {
        attack: 10, defense: 10
    }

    SkillsName = {
        SkillA: "attack", SkillB: "attack", SkillC: "attack", SkillD: "attack"
    }

    Status = {
        is_die: false, // 是否死亡
        in_jail: null, // 所在监狱的地图名称
        now_job: [], // 当前所在的职位
        overloads: [], // 所携带的物品
    }

    Init() {
        return new BindBox(this);
    }
}
