import Save from "./tools/Save.js";

class Rendetor{
    default_map;


    /**
     * 渲染
     */
    target_render_event(map_config, runhere, map_resource, v){
        for (let i of v.command) {
            if (i === map_resource.point_id){
                if (map_config.has_army) {
                    if (map_config.character.Belongs === Save.LoadSave("player-power")) {
                        runhere = "self-runhere" // 友军
                        break
                    } else {
                        runhere = "bad-runhere" // 友军
                        break
                    }
                } else if (map_config.has_wood || map_config.has_store) {
                    runhere = "resource-runhere" // 资源
                    break
                } else if (map_config.has_city) {
                    runhere = "city-runhere" // 城市
                    break
                } else {
                    runhere = "runhere"
                    break
                }
            }
            else{
                runhere = "display-runhere"
            }
        }
        return runhere

    }
}

export default Rendetor;