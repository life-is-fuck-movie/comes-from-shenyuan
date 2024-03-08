import CharacterTemplates from '../templates.js'
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

    SkillsName = {
        SkillA: {
            event: "雨剑化帘",
            function_name: "yjhl",
            description: "对敌军造成伤害前，获得一个`雨帘`的标记，`雨帘`标记可以记录3次行秋造成的伤害，记录结束后行秋提升3次伤害的平均值的生命。`雨帘`效果可以叠加，效果结束后回收雨帘，施加雨帘后，若在3回合内失去雨帘那么累计失效。",
            damage: 20,
            needMp: 15,
            is_limit: false,
        }, SkillB: {
            event: "诗书与义",
            function_name: "ssyy",
            description: "限定技，添加一个`义`的标记给自己，如果受到致命伤可以用`义`进行抵消，抵消后恢复到血量上限的一半。使用`义`之后`雨帘`的效果对自己无效。",
            damage: 0,
            needMp: 12,
            is_limit: true,
        }, SkillC: {
            event: "闻识见意",
            description: "将自身非`雨帘`的标记全部清除, 且如果清除的标记大于3个则每清除3个可以转化为一个`雨帘`。",
            function_name: "bwqz",
            damage: 15,
            needMp: 20,
            is_limit: false,
        }, SkillD: {
            event: "古华剑法",
            function_name: "ghjf",

            description: "限定技，恢复到满血，攻击力翻倍，防御力翻倍，每回合固定失去10点生命上限提升4点防御，4点攻击。",
            damage: 50,
            needMp: 40,
            is_limit: true,
        }
    }

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
