import Save from "./tools/Save.js";

class SaveMapDataManager {
    loadSaveMapData() {
        return Save.LoadSaveJson("map_data")
    }


    removeResource(site) {
        let map_data = this.loadSaveMapData()

        if (map_data.wood.includes(site))
            map_data.wood.splice(map_data.wood.indexOf(site), 1)
        else if (map_data.stone.includes(site))
            map_data.stone.splice(map_data.stone.indexOf(site), 1)
        console.log(map_data.stone.length)
        console.log(map_data.wood.length)
        return map_data
    }

    saveMapData(map_data) {
        Save.WriteSaveJSON("map_data", map_data)
    }
}

export default new SaveMapDataManager();