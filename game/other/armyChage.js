import to_character from "../../src/stores/toCharacter.js";
import BindBox from "../characters/BindBox.js";
import RefreshMapData from "../../src/stores/RefreshMapData.js";
import Notify from "../../src/stores/notify.js";

class ArmyChage {
    do(supplies) {
        let flag = true;

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
        let str = (`从${character_form.Name}的军队派出【${armyName}】${count}名给${character_to.Name}`)
        Notify.set({
            type:"info",
            value: str
        })
        let bindbox = new BindBox(character_form)
        // TODO 军队派遣
        if(character_form.Status.ranks[armyName] >= count){
            bindbox.playAudio("军队派遣")
            character_form.Status.ranks[armyName] -= count
            if (character_form.Status.ranks[armyName] === 0){
                delete character_form.Status.ranks[armyName] // 这个兵种就没有
            }
            if (character_to.Status.ranks[armyName] == null)
                character_to.Status.ranks[armyName] = count
            else
                character_to.Status.ranks[armyName] += count

        }else {
            bindbox.playAudio("军队派遣失败")
            return  false
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
        console.log(character_to.Status.ranks)
        RefreshMapData.set(Math.random())
        flag = true
        return flag
    }
}

export default ArmyChage