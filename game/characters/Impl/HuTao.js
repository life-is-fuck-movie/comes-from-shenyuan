import CharacterTemplates from '../templates.js'
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

    SkillsName = {
        SkillA: {
            event: "雪霁梅香",
            function_name: "xqmx",
            description: "攻击提升相当于当前血量距离血量上限的值，并在技能结束后失去伤害等量的生命, 结束后伤害恢复技能释放前",
            damage: 10,
            needMp: 15,
            is_limit: false,
        }, SkillB: {
            event: "蝶舞",
            function_name: "dw",

            description: "失去3点生命后获得攻击提升10%",
            damage: 20,
            needMp: 12,
            is_limit: false,
        }, SkillC:  {
            event: "安神秘法",
            description: "对其造成伤害，自身恢复敌方剩余的生命的30%",
            function_name: "asmf",

            damage: 15,
            needMp: 20,
            is_limit: false,
        }, SkillD:  {
            event: "蝶梦回香",
            function_name: "dmhx",

            description: "限定技，对敌方造成伤害后，如果自身血量百分比小于敌方，则恢复到敌方同百分比的血量，如果大于敌方血量百分比，并对其在进行一次技能伤害(敌方收到伤害后不再判断血量大小)。",
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
            "往生堂员工": 20,
        } //  当前角色所拥有的军队
    }
}
export default HuTao
