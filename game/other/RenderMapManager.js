import renderMap from "../../src/stores/renderMap.js";

class RenderMapManager {
    target_render(array) {
        renderMap.set({
            mode: "target",
            command: array
        })
    }

}

export default new RenderMapManager();