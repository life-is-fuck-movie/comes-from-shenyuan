import BindBox from "../characters/BindBox.js";

class SkillMapA {
    get_skill_detail(self_character, skill_name) {
        for (let skill of Object.values(self_character.SkillsName)) {
            if (skill.function_name === skill_name) {
                return skill
            }
        }
    }

    xqmx(self_character, hostile_character, data = null) {
        let fluctuation = Math.abs(self_character.Values.max_hp - self_character.Values.now_hp)
        self_character.Values.attack += fluctuation; // 提升攻击

        let bindCharacter = new BindBox(self_character)
        let damage = this.get_skill_detail(self_character,"xqmx").damage
        let hint = bindCharacter.computedHint(damage, 1, hostile_character)
        let bindHostile = new BindBox(hostile_character)
        bindHostile.SetNowHp(hostile_character.Values.now_hp - damage)
        self_character.Values.attack -= fluctuation
        bindCharacter.SetNowHp(self_character.Values.now_hp - fluctuation);

        return {
            characters:[self_character, hostile_character],
            value:`{render:self} 使用了【雪霁梅香】临时提升了 【${fluctuation}】 点攻击，同时对敌人造成了【${damage}】 点伤害，但是自己也失去了【${fluctuation}】点生命`
        }
    }

    dw(self_character, hostile_character, data = null) {
        let bindCharacter = new BindBox(self_character)
        let life = bindCharacter.SetNowHp(self_character.Values.now_hp - 3);
        let now_attack = self_character.Values.attack * 1.1
        self_character.Values.attack = parseInt(now_attack)
        return {
            characters:[self_character, hostile_character],
            value:`{render:self} 使用了【蝶舞】提升了 【${now_attack}】 点攻击但是自己也失去了[3]点生命`
        }
    }

    asmf(self_character, hostile_character, data = null) {
        console.log("安神秘法")
        return [self_character, hostile_character]
    }

    dmhx(self_character, hostile_character, data = null) {
        console.log("蝶梦回香")
        return [self_character, hostile_character]
    }
}

export default new SkillMapA()