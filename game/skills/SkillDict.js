import BindBox from "../characters/BindBox.js";
import bindBox from "../characters/BindBox.js";
import badgeAppend from "./badgeAppend.js";
import Gloabs from "../actives/Gloabs.js";
import warTipsManager from "../actives/warTipsManager.js";

class SkillMapA {
    get_skill_detail(self_character, skill_name) {
        for (let skill of Object.values(self_character.SkillsName)) {
            if (skill.function_name === skill_name) {
                return skill
            }
        }
    }

    make_hint_to_hostile(self, hos, skill) {
        // 对敌方造成基础伤害
        let bind_hos = new BindBox(hos)
        let bind_self = new BindBox(self)
        let value = bind_self.computedHint(self.Values.attack, 1, hos);
        bind_hos.SetNowHp(hos.Values.now_hp - value);
        return value
    }

    xqmx(self_character, hostile_character, data = null) {
        let fluctuation = Math.abs(self_character.Values.max_hp - self_character.Values.now_hp)

        let bindCharacter = new BindBox(self_character)
        let damage = this.get_skill_detail(self_character, "xqmx").damage + fluctuation // 提升伤害
        let hint = bindCharacter.computedHint(damage, 1, hostile_character)
        let bindHostile = new BindBox(hostile_character)
        bindHostile.SetNowHp(hostile_character.Values.now_hp - hint)
        bindCharacter.SetNowHp(self_character.Values.now_hp - fluctuation);

        return {
            characters: [self_character, hostile_character],
            value: `{render:self} 使用了【雪霁梅香】临时提升了 【${fluctuation}】 点攻击，同时对敌人造成了【${hint}】 点伤害，但是自己也失去了【${fluctuation}】点生命`,
            data: {
                hint: damage,
                add_hp: -fluctuation
            }
        }
    }

    dw(self_character, hostile_character, data = null) {
        let bindCharacter = new BindBox(self_character)
        let life = bindCharacter.SetNowHp(self_character.Values.now_hp - 3);
        let now_attack = self_character.Values.attack * 1.1
        self_character.Values.attack = parseInt(now_attack)
        return {
            characters: [self_character, hostile_character],
            value: `{render:self} 使用了【蝶舞】提升到了 【${now_attack}】 点攻击但是自己也失去了[3]点生命`,
            data: {
                add_hp: -now_attack,
                add_attack: now_attack
            }
        }
    }

    asmf(self_character, hostile_character, data = null) {
        // 对其造成伤害，自身恢复敌方剩余的生命的10%
        let bind_character = new BindBox(self_character);
        let bind_hostile = new BindBox(hostile_character);

        let hint_value = this.make_hint_to_hostile(self_character, hostile_character, "asmf")
        let add_hp = parseInt(hostile_character.Values.now_hp * 0.1);
        bind_character.SetNowHp(self_character.Values.now_hp + add_hp);
        return {
            characters: [self_character, hostile_character],
            value: `{render:self} 使用了【安神秘法】提升了 【${add_hp}】 点生命且敌方生命失去了【${hint_value}】`,
            data: {
                add_hp: add_hp,
                hint: hint_value
            }
        }

    }

    dmhx(self_character, hostile_character, data = null) {
        //限定技，对敌方造成伤害后，如果自身血量百分比小于敌方，则恢复自身当前相同与敌方相同的百分比的血量，如果大于敌方血量百分比，并对其在进行一次技能伤害(敌方收到伤害后不再判断血量大小)。
        let value = this.make_hint_to_hostile(self_character, hostile_character, "dmhx") // 造成伤害
        let self_hp = self_character.Values.now_hp;
        let hostile_hp = hostile_character.Values.now_hp;
        let bigger = (self_hp > hostile_hp);
        if (!bigger) {
            // 则恢复到敌方同百分比的血量
            let rate = hostile_character.Values.now_hp / hostile_character.Values.max_hp;
            let now_hp = self_character.Values.max_hp * rate;
            let bind_self = new BindBox(self_character);
            bind_self.SetNowHp(parseInt(self_character.Values.now_hp + now_hp));
            return {
                characters: [self_character, hostile_character],
                value: `{render:self} 使用了【蝶梦回香】提升了 【${now_hp}】 点生命且敌方生命失去了【${value}】`,
                data: {
                    add_hp: now_hp,
                    hint: value
                }
            }
        } else {
            // 并对其在进行一次技能伤害
            value += this.make_hint_to_hostile(self_character, hostile_character, "dmhx") // 造成伤害
            return {
                characters: [self_character, hostile_character],
                value: `{render:self} 使用了【蝶梦回香】对敌方造成了两次伤害，总计:【${value}】`,
                data: {
                    hint: value
                }
            }
        }


    }


    yjhl(self_character, hostile_character, data = null) {
        /**
         * 对敌军造成伤害前，获得一个`雨帘`的标记，然后对敌军造成伤害，
         * `雨帘`标记可以记录3次行秋造成的伤害，记录结束后行秋恢复3回合的平均值的生命。如果`雨帘`处于叠加态则恢复的生命为当前恢复生命*`雨帘`的数量
         */
        badgeAppend.append_yulian(self_character, data.round_wheel)

        let hint = this.make_hint_to_hostile(self_character, hostile_character, "yjhl");
        let bind_hos = new BindBox(hostile_character);
        bind_hos.SetNowHp(hostile_character.Values.now_hp - hint);
        return {
            characters: [self_character, hostile_character],
            value: `{render:self} 获取雨帘标签后，对敌方造成伤害${hint}`,
            data: {
                hint: hint
            }
        }
    }

    ssyy(self_character, hostile_character, data = null) {
        badgeAppend.append_yi(self_character, data.round_wheel)
        return {
            characters: [self_character, hostile_character],
            value: `【${self_character.Name}】为自己加载了一个【义】标签`,
            data: {}
        }
    }

    wsjy(self_character, hostile_character, data) {
        const only_yulian = self_character.badge.filter(badge => badge === "雨帘")
        let non_yulian = self_character.badge.filter(badge => badge !== "雨帘")
        let non_yulian_count = non_yulian.length; // 获取非雨帘的数量
        let convert = parseInt(non_yulian_count / 3)
        let has = non_yulian_count % 3
        const has_badge = non_yulian.slice(0, has) // 截取剩下的
        console.log(non_yulian, has_badge)
        self_character.badge = [...has_badge, ...only_yulian]
        for (let convert_count = 0; convert_count < convert; convert_count++) {
            badgeAppend.append_yulian(self_character, data.round_wheel)
        }

        return {
            characters: [self_character, hostile_character],
            value: `{render:self} 转化了 ${convert}个新的【雨帘】`,
            data: {}
        }
    }

    ghjf(self_character, hostile_character, data = null) {
        // 限定技，恢复到满血，攻击力翻倍，防御力翻倍，每回合固定失去10点生命上限提升4点防御，4点攻击
        let self_bind = new BindBox(self_character);
        self_bind.SetNowHp(parseInt(self_character.Values.max_hp))
        self_character.Values.attack *= 2
        self_character.Values.defense *= 2
        let round = data?.round_wheel;
        round.register_task(
            () => {
                self_bind.SetNowHp(parseInt(self_character.Values.now_hp - 10)); // 每回合失去10生命

                self_character.Values.attack += 4
                self_character.Values.defense += 4
            }, round.TYPE.BEFORE, round.RoundMakePolicy.long()
        )

        return {
            characters: [self_character, hostile_character],
            value: `{render:self}恢复了满血并在每回合失去10点生命`,
            data: {}
        }
    }

    hy(self_character, hostile_character, data = null) {

        //为敌方叠加一个`花`的标记; 进行叠加`花`的时候，如果敌方原有的`花`超过2个，会有20%`花`标记全部清空，且自身收到  `暴种`的惩罚失去20点生命
        let self_bind = new BindBox(self_character);
        hostile_character.badge.push("花") // 叠加花标记

        let flag_baozhong = false
        if (hostile_character.badge.length > 2) {
            let rate = Gloabs.randomEvent(20)
            if (rate) {
                // 清空hostile_character.badge的花标记
                hostile_character.badge = hostile_character.badge.filter(item => item !== "花") // 清空花的标记
                //  受到暴种惩罚
                self_bind.SetNowHp(parseInt(self_character.Values.now_hp - 20)); // 每回合失去20点生命
                // 爆种了
                flag_baozhong = true
            } else {
                // 没爆种
                flag_baozhong = false
            }
        }

        return {
            characters: [self_character, hostile_character],
            value: `{render:self} 使用了【花园】, ${flag_baozhong ? "因为概率原因爆种了，导致所有的花消失了" : "给敌方施加了【花】的标记一个"}`,
            data: {}
        }
    }

    ml(self_character, hostile_character, data = null) {
        // 为敌方叠加1个`花`的标记，每一个花标记对敌方造成80%的伤害, 技能结束后敌方的`花`被回收
        hostile_character.badge.push("花")
        // 对敌方的`花`标记进行计数
        let count_hua = hostile_character.badge
            .filter(item => item === "花").length
        //   计算伤害
        let hint_value = this.make_hint_to_hostile(self_character, hostile_character, "ml")
        // 每一个花标记对敌方造成80%的伤害
        let damage = parseInt(hint_value * 0.8 * count_hua)
        let bindHos = new BindBox(hostile_character)
        bindHos.SetNowHp(parseInt(hostile_character.Values.now_hp - damage))
        // 回收所有的花
        hostile_character.badge = hostile_character.badge.filter(item => item !== "花")
        return {
            characters: [self_character, hostile_character],
            value: `{render:self} 使用了【密林】, 回收了【${count_hua}】个花标记，造成了【${damage}】点伤害`,
            data: {
                hint: damage
            }
        }
    }

    cmjx(self_character, hostile_character, data = null) {
        // 立刻为自己叠加`1~2`个`花`的标记，如果叠加后自身`花`的数量大于3个以上，
        // 可以和敌方互换`花`标记，敌方在交换前后的花标记数量之差的绝对值将会提升到自己的攻击力本身。
        let count_hua = Gloabs.getRandomInt(2, 4)

        // 给自己加入 count_hua 个花
        self_character.badge.push(...Array(count_hua).fill("花"))

        // 获取自己的花的个数
        let length_hua = self_character.badge.filter(e => e === "花").length;
        let power = 0;
        let rate = Gloabs.randomEvent(50)
        let change_flag = false
        if (length_hua > 3) {


            if (rate) {
                change_flag = true
                // 获取敌方的花标记个数
                let length_hua_hostile = hostile_character.badge.filter(e => e === "花").length;
                // 获取自己的花标记个数
                let length_hua_self = self_character.badge.filter(e => e === "花").length;
                // 删除敌方的所有的花标记
                hostile_character.badge = hostile_character.badge.filter(e => e !== "花");
                // 删除自己的所有花标记
                self_character.badge = self_character.badge.filter(e => e !== "花");
                // 给敌方添加和自己的花标记个数相等的个数的花标记
                hostile_character.badge.push(...Array(length_hua_self).fill("花"))
                // 给自己添加和敌方的花标记个数相等的个数的花标记
                self_character.badge.push(...Array(length_hua_hostile).fill("花"))

                // 提升攻击力
                power = Math.abs(length_hua_hostile - length_hua_self)
                self_character.Values.attack += power

            }


        }
        return {
            characters: [self_character, hostile_character],
            value: `{render:self} 获取了${length_hua}个【花】。${change_flag ? `顺便互换【花】了, 提升了${power}点攻击了。` : ""}`,
            data: {}
        }

    }

    myxj(self_character, hostile_character, data = null) {
        //限定技，神是无私地，所以自愿的转交给敌方20%的生命；神也是自私的，所以在之后的每回合自身恢复10点血，敌方失去转交给其生命的50%。


        let bind_character = new BindBox(self_character);
        let bind_hos = new BindBox(hostile_character);
        // 转交 20% 的生命

        let lose_hp = parseInt(self_character.Values.now_hp * .2)

        bind_character.SetNowHp(self_character.Values.now_hp - lose_hp)
        bind_hos.SetNowHp(hostile_character.Values.now_hp + lose_hp)

        let round_wheel = data.round_wheel;
        let tasks;

        tasks = round_wheel.register_task(
            _ => {
                console.log("你好")
                bind_character.SetNowHp(self_character.Values.now_hp + 10)
                bind_hos.SetNowHp(hostile_character.Values.now_hp - parseInt(lose_hp / 2))
                warTipsManager.send_tip(`${self_character.Name}恢复【10】点生命，${hostile_character.Name}
                失去了${parseInt(lose_hp / 2)}点生命`)
            }, round_wheel.TYPE.BEFORE, round_wheel.RoundMakePolicy.long()
        )

        return {
            characters: [self_character, hostile_character],
            value: `{render:self}失去了${lose_hp}点生命，敌方提升了${lose_hp}的生命`,
            data: {}
        }


    }

    lks(self_character, hostile_character, data = null) {
        let bind_character = new BindBox(self_character);
        bind_character.SetNowHp(parseInt(self_character.Values.now_hp - 4000)) // 血量恢复
        return {
            characters: [self_character, hostile_character],
            value: `立刻死`,
            data: {}
        }
    }


}


export default new SkillMapA()