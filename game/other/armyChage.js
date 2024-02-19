import to_character from "../../src/stores/toCharacter.js";
import BindBox from "../characters/BindBox.js";

class ArmyChage {
    do(supplies) {
        let character_form;
        let character_to;

        to_character.subscribe(
            value => {
                character_to = value.to
                character_form = value.form
            }
        )


        let {armyName, count, mode} = supplies
        if (mode === true){ // 可以考虑交换位置
            let temp = character_to
            character_to = character_form
            character_form = temp
        }
        console.log(`从${character_form.Name}的军队拿出${armyName}${count}名给${character_to.Name}`)
        let bindbox = new BindBox(character_form)
        bindbox.playAudio("军队派遣")
    }
}

export default ArmyChage