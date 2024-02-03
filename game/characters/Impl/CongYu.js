import CharacterTemplates from '../templates.js'
class CongYu extends CharacterTemplates{
    ID = "CONGYU #01"
    Name = "朝吾丛雨";
    Buffs = []; // 被动效果 、 回合效果等
    AliasName = "congyu" // 别名 用在文件系统上的


    Values = {
        attack: 10, defense: 10,max_hp: 10, max_mp: 10, now_hp:10 , now_mp:10
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

    For = "穂织"
}
export default CongYu
