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

    clear_render() {
        renderMap.set({
            mode: "clear"
        })
    }



}

export default new RenderMapManager();