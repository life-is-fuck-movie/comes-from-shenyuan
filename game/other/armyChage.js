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
        // TODO 军队派遣
        if(character_form.Status.ranks[armyName] >= count){
            bindbox.playAudio("军队派遣")
            character_form.Status.ranks[armyName] -= count
            if (character_to.Status.ranks[armyName] == null)
                character_to.Status.ranks[armyName] = count
            else
                character_to.Status.ranks[armyName] += count
        }else {
            bindbox.playAudio("军队派遣失败")
        }


        if (mode === true){
            let temp = character_to
            character_to = character_form
            character_form = temp
        }
        to_character.set({
            form: character_form,
            to: character_to
        })
        console.log(character_form.Name, character_to.Name)
        new BindBox(character_form).Save()
        new BindBox(character_to).Save()
    }
}

export default ArmyChage