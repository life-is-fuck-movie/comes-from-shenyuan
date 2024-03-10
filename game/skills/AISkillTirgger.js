import BindBox from "../characters/BindBox.js";
import Gloabs from "../actives/Gloabs.js";

class AISkillTirgger{
    policy(){}
    trigger(skill_group){
        // AI触发技能组

        this.policy =  this[skill_group]
    }

    pip_event(character,list_skills){
        // 触发事件
        while (true){
            for (let skill of list_skills){
                let rate = Gloabs.randomEvent(80)
                let bind_box = new BindBox(character)
                if (rate && bind_box.can_use_skill(skill)){
                    // 如果概率允许且支持释放
                    console.log("技能组",list_skills, skill);
                    return skill
                }

            }

        }
    }
    the_1(integration){
        console.log("胡桃在使用技能", this)
        let self = integration.self
        let hos = integration.hos;

        let lose_hp_rate =  parseInt((self.Values.max_hp - self.Values.now_hp) / (self.Values.max_hp) * 100);
        // 计算损失血量比例
        console.log(lose_hp_rate + "%")
        if (lose_hp_rate < 20){
            return  this.pip_event(self, ["dw", "xqmx", "asmf", "dmhx"]);
        }else if(50 > lose_hp_rate > 20){
            if (self.Values.now_hp - (self.Values.max_hp - self.Values.now_hp) < 0){
                return this.pip_event(["asmf","dmhx"]);
            }else {
                return ["xqmx"]
            }
        }else{
            return this.pip_event(self, ["dmhx", "asmf"])
        }


    }

    the_2(integration){

    }

    the_3(integration){
        console.log("纳西妲在使用技能")
    }
}

export default new AISkillTirgger();