import badgeAppend from "../skills/badgeAppend.js";
import Gloabs from "../actives/Gloabs.js";
import to_character from "../../src/stores/toCharacter.js";
import BindBox from "../characters/BindBox.js";

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
    render_color;
    war_info_html;

    win_random;
    loser_random;
    init(render_color, war_info_html){
        this.render_color = render_color
        this.war_info_html = war_info_html
    }
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

            this.loser_random = from_random
            this.win_random = to_random
            winner = character_to
            loser =  character_from
        } else {
            winner = character_from
            loser =  character_to
            this.loser_random = to_random
            this.win_random =  from_random
        }
        this.war_summary_army(winner, loser)

        return {
            characters: {
                winner,
                loser
            },
            value: `【${winner.Name}】 获得士兵战斗的胜利`
        }
    }

    war_summary_army(winner, loser){
        let keys = Object.keys(loser.Status.ranks);

        if (keys.length > 0){
            loser.Status.ranks[keys[0]] -= 1;

             if(loser.Status.ranks[keys[0]] < 0){
                 delete loser.Status.ranks[keys[0]];
             }
        }else{
            if(!loser.God){
                let da = this.win_random
                let bindbox = new BindBox(loser)
                let lose_hp = parseInt(this.win_random / 10)
                bindbox.SetNowHp(loser.Values.now_hp - lose_hp)
                this.war_info_html += this.render_color(`由于【${loser.Name}】没有士兵，则失去了【${lose_hp}】`)
            }else{
                this.war_info_html += this.render_color(`【${loser.Name}】作为神明，丝毫不在意这些喽啰在干什么。`)
            }
        }
    }

    use_army(_from, _to) {
        // 获取自己的士兵
        let army_to = Object.keys(_from.Status.ranks)
        if (army_to.length !== 0) {
            // 还有士兵
            army_to = army_to[0] // 那就派出在前面的士兵
            console.log(`还剩下${_from.Status.ranks[army_to]}个`)
            if (_from.Status.ranks[army_to] <= 0){
                this.war_info_html +=  this.render_color(`${_from.Name} 士兵不够了，所以只是恢复一点体力`)
                delete _from.Status.ranks[army_to]
                return
            }
        } else {
            console.log("没有士兵了")
            this.war_info_html +=  this.render_color(`${_from.Name} 士兵不够了，所以只是恢复一点体力`)
            army_to = null // 出击方没有士兵
            this.summary_army(_from, _to) // 对其进行正常总结
            return
        }
        let army_from = Object.keys(_to.Status.ranks) // 敌方的士兵获取
        army_from = army_from > 0 ? army_from[0] : null
        let {value, characters} = this.pk(_from, _to, army_from, army_to) // 进行战斗\
        this.war_info_html += this.render_color(value)
        this.summary_army(_from, _to)
    }

    summary_army(_from, _to, ) {
        _from.war_active += 1;
        this.render_color(`【${_from.Name}】 获得一点体力`)
    }


}

export default new trigger();