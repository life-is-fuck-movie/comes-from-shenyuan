class skillGroup{
    the_1(){
        // 胡桃的技能组
        return {
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
                description: "对其造成伤害，自身恢复敌方剩余的生命的10%",
                function_name: "asmf",

                damage: 15,
                needMp: 20,
                is_limit: false,
            }, SkillD:  {
                event: "蝶梦回香",
                function_name: "dmhx",

                description: "限定技，对敌方造成伤害后，如果自身血量百分比小于敌方，则恢复自身当前相同与敌方相同的百分比的血量，如果大于敌方血量百分比，并对其在进行一次技能伤害(敌方收到伤害后不再判断血量大小)。",
                damage: 50,
                needMp: 40,
                is_limit: true,
            }
        }
    }

    the_2() {
        // 行秋技能组
        return {
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
    }

    the_3() {
        // 纳西妲技能组

        return {

        }
    }
}

export default {
    skillGroup: new skillGroup()
}