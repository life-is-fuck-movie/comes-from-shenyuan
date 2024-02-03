import SkillDict from "../skills/SkillDict.js";


/**
 * 不推荐使用 CharacterTemplates 直接修改变量 否则无法正确的保存到存档中
 * 而是封装给BindBox让他来抉择
 */
class CharacterTemplates {
    Name = "匿名角色";
    Buffs = []; // 被动效果 、 回合效果等
    AliasName = "" // 别名 用在文件系统上的

    Values = {
        attack: 10, defense: 10, max_hp: 10, max_mp: 10, now_hp:10 , now_mp:10
    }

    SkillsName = {
        SkillA: "attack", SkillB: "attack", SkillC: "attack", SkillD: "attack"
    }

    Status = {
        is_die: false, // 是否死亡
        in_jail: null, // 所在监狱的地图名称
        now_job: [], // 当前所在的职位
        overloads: [], // 所携带的物品
        ranks: {
            "炮兵": 20,
            "步兵": 30
        } //  当前角色所拥有的军队
    }
}

export default CharacterTemplates
