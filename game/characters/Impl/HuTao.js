import CharacterTemplates from '../templates.js'
class HuTao extends CharacterTemplates{
    Name = "胡桃";
    Buffs = []; // 被动效果 、 回合效果等
    AliasName = "hutao" // 别名 用在文件系统上的

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
        ranks: {
        } //  当前角色所拥有的军队
    }
}
export default HuTao
