class SaveManager{
    /**
     * 加载存档
     * @param saveName
     * @returns {string}
     * @constructor
     */
    LoadSave(saveName){
        return localStorage.getItem(saveName)
    }

    /**
     * 加载JSON存档
     */
    LoadSaveJson(saveName){
        let val =  localStorage.getItem(saveName)
        if (val === null){
            return void 0
        }
        return JSON.parse(val)
    }
    /**
     * JSON 存档
     * @param saveName
     * @param value
     * @constructor
     */
    WriteSaveJSON(saveName, value){
        let string_value = JSON.stringify(value)
        localStorage.setItem(saveName, string_value)
    }

    /**
     * 普通变量存档
     * @param saveName
     * @param value
     * @constructor
     */
    WriteSaveBasic(saveName, value){
        localStorage.setItem(saveName, value)
    }
}
export default new SaveManager();