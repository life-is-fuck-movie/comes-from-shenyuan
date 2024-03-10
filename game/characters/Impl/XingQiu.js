import CharacterTemplates from '../templates.js'
import AISkillModel from "../../skills/AISkillModel.js";
class XingQiu extends CharacterTemplates{
    ID = "XingQiu #01"
    Name = "行秋";
    Buffs = [{
        name: "受伤",
        continuous_round: 1,
    }]; // 被动效果 、 回合效果等
    AliasName = "XingQiu" // 别名 用在文件系统上的

    Belongs = "璃月" // 所属类别"

    Values = {
        attack: 15, defense: 30,max_hp: 180, max_mp: 50, now_hp: 120 , now_mp:50, speed: 10
    }

    skill_history = [] // 释放的技能历史

    SkillsName = AISkillModel.skillGroup.the_2()
    SkillGroup = "the_2"

    Status = {
        is_die: false, // 是否死亡
        in_jail: null, // 所在监狱的地图名称
        now_job: [], // 当前所在的职位
        overloads: [], // 所携带的物品
        ranks: {
            "万云商会员工": 20,
        } //  当前角色所拥有的军队
    }
}
export default XingQiu
