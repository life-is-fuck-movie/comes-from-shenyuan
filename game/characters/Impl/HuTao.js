import CharacterTemplates from '../templates.js'
import AISkillModel from "../../skills/AISkillModel.js";
class HuTao extends CharacterTemplates{
    ID = "HUTAO #01"
    Name = "胡桃";
    Buffs = [{
        name: "巧言",
        continuous_round: 99999,
    }, {
        name: "受伤",
        continuous_round: 1,
    }]; // 被动效果 、 回合效果等
    AliasName = "hutao" // 别名 用在文件系统上的

    Belongs = "璃月" // 所属类别"

    Values = {
        attack: 20, defense: 5 ,max_hp: 120, max_mp: 50, now_hp:120 , now_mp:50
    }

    SkillsName = AISkillModel.skillGroup.the_1() // 使用技能组
    SkillGroup = "the_1"

    Status = {
        is_die: false, // 是否死亡
        in_jail: null, // 所在监狱的地图名称
        now_job: [], // 当前所在的职位
        overloads: [], // 所携带的物品
        ranks: {
            "往生堂员工": 20,
        } //  当前角色所拥有的军队
    }
}
export default HuTao
