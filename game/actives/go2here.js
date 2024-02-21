import ToastManager from "../other/ToastManager.js";
import SideSwitch from "../../src/stores/sideSwitch.js";
import RenderMap from "../../src/stores/renderMap.js";
import RenderMapManager from "../other/RenderMapManager.js";

class Go2here {
    site;
    character;

    constructor(site, character) {
        this.site = site;
        this.character = character
        this.render(this.get_can_run())
    }
    render(can_run_sheets){
        SideSwitch.set(this)
        ToastManager.sendToastNoDestroy("请选择你要前往的地点, 点击我取消操作") // 通知存在
        RenderMapManager.target_render(can_run_sheets)  // 渲染

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
}

export default Go2here;