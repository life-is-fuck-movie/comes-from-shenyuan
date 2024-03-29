import renderMap from "../../src/stores/renderMap.js";

class RenderMapManager {
    target_render(character, array) {
        renderMap.set({
            mode: "target",
            command: array,
            data: {
                character: character,
            }
        })
    }

    /**
     * 清空移动目标渲染的格子回复默认状态
     */
    clear_render() {
        renderMap.set({
            mode: "clear"
        })
    }



}

export default new RenderMapManager();