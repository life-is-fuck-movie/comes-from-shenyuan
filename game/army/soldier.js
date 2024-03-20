import badgeAppend from "../skills/badgeAppend.js";
import Gloabs from "../actives/Gloabs.js";
import to_character from "../../src/stores/toCharacter.js";

const TYPE = {
    Attack: "Attack", Continuous: "Continuous", Buff: "Buff", Restore: "Restore"
}

let armies = {
    "template": {
        value: {
            get_buff(data) {
            }, get_damage(data) {
            }, get_random_value(data) {
            }, get_final_value(data) {
            },
        }
    }, "教令院学者": {
        mode: TYPE.Buff, description: "可以增加将军3点防御", value: {
            get_buff(data) {
                let character = data.character;
                character.Values.defense += 3
            }
        }
    }, "万云商会员工": {
        mode: TYPE.Restore, value: {
            get_damage(data) {
                return 2; // 对两个单位造成伤害
            }
        }
    }
}

class trigger {
    get_armies() {
        return armies
    }

    pk(character_from, character_to, army_from, army_to) {
        // 随机数的获取
        let only_gen = army_to === null; // 没有任何的士兵

        let to_random = Gloabs.getRandomInt(1, 100);

        let army = this.get_armies()
        if(!only_gen && army[army_to]?.get_random_value !== undefined){
            to_random = army[army_to].get_random_value()
        }

        if (only_gen) {
            let is_god = character_to.God;
            if (is_god) return {
                value: `神明【${character_to.Name}】免疫了士兵的伤害`,
            }// 只有将军且将军为神明时，免疫对决
            to_random = Gloabs.getRandomInt(60, 120); // 将军独有的随机数字
        }



        let  from_random = Gloabs.getRandomInt(1, 100);

        if(army[army_from]?.get_random_value !== undefined){
            from_random = army[army].get_random_value()
        }

        if(army[army_from]?.get_final_value !== undefined){
            from_random = army[army_from].get_final_value({value: from_random}) // 对最终值进行的处理
        }

        // 大小的比较
        let winner;
        let loser;
        if (to_random >= from_random) {
            winner = character_to
            loser =  character_from
        } else {
            winner = character_from
            loser =  character_to
        }

        return {
            characters: {
                winner,
                loser
            },
            value: `【${winner.Name}】 获得士兵战斗的胜利`
        }
    }

}

export default new trigger();