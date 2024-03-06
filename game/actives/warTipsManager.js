import warTips from "../../src/stores/war_tips.js";

export default {
    send_tip(war_tips){
        warTips.set({
            tips: war_tips,
            code : Math.random()
        })
    }
}