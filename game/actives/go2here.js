import ToastManager from "../other/ToastManager.js";
import SideSwitch from "../../src/stores/sideSwitch.js";
import RenderMap from "../../src/stores/renderMap.js";
import RenderMapManager from "../other/RenderMapManager.js";
import renderMapManager from "../other/RenderMapManager.js";
import Save from "../other/tools/Save.js";
import RefreshMapData from "../../src/stores/RefreshMapData.js";
import sideSwitch from "../../src/stores/sideSwitch.js";
import activePowerValue from "../../src/stores/active-power-value.js";
import ResourceManager from "../other/resourceManager.js";
import SaveMapDataManager from "../other/saveMapDataManager.js";
import saveMapDataManager from "../other/saveMapDataManager.js";
import CharactersDescriptor from "../characters/CharactersDescriptor.js";

class Go2here {
    site;
    character;
    continuous_flag;

    constructor(site = null, character = null, continuous_flag = false) {
        if (site === null || character === null) {

        } else {
            this.continuous_flag = continuous_flag
            this.site = site;
            this.character = character
            location["go2hereCharacterID"] = this.character.ID
            this.render(this.get_can_run())
        }
    }

    render(can_run_sheets) {
        SideSwitch.set(true)
        ToastManager.sendToastNoDestroy("【cost: 一点行动力】请选择你要前往的地点, 点击我取消操作", () => {
            this.stop_target()
        }) // 通知存在
        RenderMapManager.target_render(this.character, can_run_sheets)  // 渲染

    }

    get_can_run() {
        let can_run_sheets = []
        let site = this.site

        // 左右位置
        let left = (site % 40 === 0);
        let right = ((site + 1) % 40 === 0)
        if (!(left || right)) {
            can_run_sheets.push(site + 1, site - 1)
        } else if (left) {
            can_run_sheets.push(site + 1)
        } else if (right) {
            can_run_sheets.push(site - 1)
        }

        // 上下位置
        let top = (parseInt(site / 40) === 0)
        let bottom = (parseInt(site / 40) === 29) //FIXME 如果行数被修改这里要进行设置
        if (!(top || bottom)) {
            can_run_sheets.push(site + 40, site - 40)
        } else if (top) {
            can_run_sheets.push(site + 40)
        } else if (bottom) {
            can_run_sheets.push(site - 40)
        }


        return can_run_sheets
    }

    stop_target() {
        ToastManager.closeToast(() => RenderMapManager.clear_render())

        sideSwitch.set(true)
    }

    moveCharacter2Resource(map_config, character, site) {

        if (this.moveCharacter(character, site, false) === false) {
            return false;
            // 角色移动失败
        }

        let res_name;

        if (map_config.has_store) {
            // 有石头
            res_name = "石头"
            ResourceManager.addStone(1)

        } else if (map_config.has_wood) {
            res_name = "木头"
            ResourceManager.addWood(1)
        }

        saveMapDataManager.saveMapData(saveMapDataManager.removeResource(site))
        // 删除之后进行保存map_data
        ToastManager.sendToast(`获取${res_name}一个`)

        this.finishMove()



    }

    /**
     * 移动角色
     * @param character
     * @param site 角色移动后所在的位置
     * @param render_flag 是否渲染
     * @returns boolean 是否移动成功
     */
    moveCharacter(character, site, render_flag = true) {
        let save = Save.LoadSaveJson("map_data")

        if (!activePowerValue.expend(1)) {
            this.stop_target()
            ToastManager.sendToast("体力不足! 请在补充体力在继续!!!")
            this.move_after = false // 移动结束
            return false
        }

        let armies = save.army
        for (let index = 0; index < armies.length; index++) {
            let army = armies[index]
            let id = army.data.object.ID;
            if (id === character.ID) {
                armies[index].site = site
                break
            }
        }
        save.army = armies
        console.log(save)
        Save.WriteSaveJSON("map_data", save)
        this.stop_target()
        this.move_after = site // 角色移动到的位置

        if (render_flag)
            this.finishMove()
        return true
    }

    finishMove() {
        RefreshMapData.set(Math.random())
        if (this.continuous_flag || this.move_after !== false) {
            this.characterID = location["go2hereCharacterID"]
            delete location["go2hereCharacterID"]

            return new Go2here(this.move_after, new CharactersDescriptor().loadCharacterByID(this.characterID) , true) // 给我继续移动
        }
    }
}

export default Go2here;