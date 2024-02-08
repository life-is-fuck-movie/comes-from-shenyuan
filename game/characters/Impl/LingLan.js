import CharacterTemplates from '../templates.js'
class LingLan extends CharacterTemplates{
    ID = "LingLan #01"

    Avatar = "Avatar.gif"
    Picture = "1000.webp"



    Name = "铃兰";
    Buffs = []; // 被动效果 、 回合效果等
    AliasName = "linglan" // 别名 用在文件系统上的

    Belongs = "罗德岛" // 所属类别"

    Values = {
        attack: 10, defense: 11,max_hp: 12, max_mp: 12, now_hp:11.3 , now_mp:10.3
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
            "小狐狸": 20,
        } //  当前角色所拥有的军队
    }
}
export default LingLan
