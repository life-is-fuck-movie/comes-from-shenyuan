import BindBox from "../characters/BindBox.js";
import Gloabs from "../actives/Gloabs.js";

class AISkillTirgger {
    policy() {
    }

    trigger(skill_group) {
        // AI触发技能组

        this.policy = this[skill_group]
    }

    pip_event(character, list_skills) {
        // 触发事件
        while (true) {
            for (let skill of list_skills) {
                let rate = Gloabs.randomEvent(80)
                let bind_box = new BindBox(character)
                if (rate && bind_box.can_use_skill(skill)) {
                    // 如果概率允许且支持释放
                    console.log("技能组", list_skills, skill);
                    return skill
                }

            }

        }
    }

    the_1(integration) {
        console.log("胡桃在使用技能", this)
        let self = integration.self
        let hos = integration.hos;

        let lose_hp_rate = parseInt((self.Values.max_hp - self.Values.now_hp) / (self.Values.max_hp) * 100);
        // 计算损失血量比例
        console.log(lose_hp_rate + "%")
        if (lose_hp_rate < 20) {
            return this.pip_event(self, ["dw", "xqmx", "asmf", "dmhx"]);
        } else if (50 > lose_hp_rate > 20) {
            if (self.Values.now_hp - (self.Values.max_hp - self.Values.now_hp) < 0) {
                return this.pip_event(["asmf", "dmhx"]);
            } else {
                return ["xqmx"]
            }
        } else {
            return this.pip_event(self, ["dmhx", "asmf"])
        }


    }

    the_2(integration) {
        let self = integration.self;
        let hos = integration.hos;
        let round_wheel = integration.round_wheel
        if (self.temp_value.first === void 0) {
            // 第一次出售默认阶段一
            self.temp_value.phase = '1';
        }
        // 先判断敌方的攻击是否需要立刻防止一个yi进行强制保命
        if (hos.Values.attack >= (self.Values.defense * 2) && self.temp_value.phase !== "3" && !self.skill_history.includes("ssyy")) {
            console.log("保命")
            return this.pip_event(self, ["ssyy"])
        }

        if(self.temp_value.phase === "1"){
            if (self.Values.now_hp < (self.Values.max_hp * 0.3)) {
                console.log("强回血")

                self.temp_value.phase = "2"
                return "ghjf"; // 强制回满血
            }
        }



        let non_yulian = self.badge.filter(v => v !== "雨帘").length // 非雨帘的个数
        // 当自己的血量低于30%的时候


        if(non_yulian >= 3){
            let skill = this.pip_event(self, ["wsjy","wsjy" ,"yjhl","ssyy"]);
            console.log("可选择转化", skill)

            return skill
        }

        console.log("常用")


        let skill = this.pip_event(self, [ "yjhl","ssyy",]);

        return skill

    }

    the_3(integration) {
        console.log("纳西妲在使用技能")
    }
}

export default new AISkillTirgger();