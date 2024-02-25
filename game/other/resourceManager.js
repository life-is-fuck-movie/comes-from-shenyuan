import resource from "../../src/stores/resource.js";
import Save from "./tools/Save.js";

let sub_res;
resource.subscribe(
    v => {
        sub_res = v
    }
)

class ResourceManager {
    addStone(value) {
        sub_res.stone = sub_res.stone + value;
        if (this.hasStone(value)) {
            resource.set(sub_res)
            Save.WriteSaveJSON("resource", sub_res) // 存档
            return true
        }
        return false
    }

    addWood(value) {
        sub_res.wood = sub_res.wood + value;
        if (this.hasWood(value)) {
            resource.set(sub_res)
            Save.WriteSaveJSON("resource", sub_res) // 存档
            return true
        }
        return false
    }

    hasWood(value) {
        return (sub_res.wood - value >= 0)
    }

    hasStone(value) {
        return (sub_res.stone - value >= 0)
    }
}

export default new ResourceManager();