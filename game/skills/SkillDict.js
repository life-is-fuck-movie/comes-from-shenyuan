import BindBox from "../characters/BindBox.js";
import bindBox from "../characters/BindBox.js";
import badgeAppend from "./badgeAppend.js";

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
            value: `{render:self} 使用了【雪霁梅香】临时提升了 【${fluctuation}】 点攻击，同时对敌人造成了【${damage}】 点伤害，但是自己也失去了【${fluctuation}】点生命`,
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

        let hint = this.make_hint_to_hostile(self_character,hostile_character,"yjhl");
        let bind_hos = new BindBox(hostile_character);
        bind_hos.SetNowHp(hostile_character.Values.now_hp-hint);
        return {
            characters: [self_character, hostile_character],
            value: `{render:self} 对敌方造成伤害${hint}`,
            data:{
                hint: hint
            }
        }
    }

}


export default new SkillMapA()