import ShowModals from "../../src/stores/showModals.js";
import Gloabs from "./Gloabs.js";

class warManager {
    start_default_war(form_character,to_character) {
        ShowModals.set({
            flag: true,
            type: "war-army",
            data: {
                form_character: form_character,
                to_character: to_character
            },
            close: false
        })
    }

    policy_select(){

        let to_select = Math.floor(Math.random() * 3);

        return {
            info: "首先{render:self}需要选着策略是",
            policies: [
                ["坚守不出(防御力提升)", ()=>{
                    let policy ="坚守不出"
                    let number = Gloabs.getRandomInt(2,4)
                    return {
                        context: [policy],
                        info:`我军选择坚守不出看来防御提升了${number}！`,
                        status:{
                            add_defense: number
                        }
                    }

                }],
                ["奇袭斩玉(攻击力提升)", ()=>{
                    let policy = "奇袭斩玉"
                    let number = Gloabs.getRandomInt(2,4)

                    return {
                        context: [policy],
                        info:`这是一个冒险的方法，主将似乎提升了攻击了${number}`,
                        status:{
                            add_attack: number
                        }
                    }
                }],
                ["步步为营(防御、攻击小幅提升)", ()=>{
                    let policy = "步步为营"

                    return {
                        context: [policy],
                        info:"我军选择步步为营，看来防御和攻击都提升了1点呢",
                        status:{
                            add_attack: 1,
                            add_defense: 1
                        }
                    }
                }],
            ]
        }
    }
}

export default new warManager();