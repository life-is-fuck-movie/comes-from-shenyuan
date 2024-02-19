import Save from "../other/tools/Save.js";

/**
 * 游戏角色描述器
 */
class CharactersDescriptor {
    /**
     * 获取同势力的所有角色
     * @param powerName
     * @returns {[]}
     */
    getPowerCharacter(powerName) {
        let map_data = Save.LoadSaveJson("map_data");
        let armies = map_data.army;
        let return_val = []
        for (let army of armies) {
            let character = army.data.object;
            if (character.Belongs === powerName) {
                return_val.push(army.data.object)
            }
        }
        return return_val
    }

    /**
     * 获取指定的角色在哪个位置
     */
    getCharacterWhere(character){
        let map_data = Save.LoadSaveJson("map_data");
        let armies = map_data.army;

        for (let army of armies) {
            let character_instance = army.data.object;
            if (character.ID === character_instance.ID){
                return army.site
            }
        }

    }

    /**
     * 获取用户当前势力的角色
     * @returns
     */
    getUserCharacter() {
        let power = localStorage.getItem("player-power");
        return this.getPowerCharacter(power);
    }
}

export default CharactersDescriptor