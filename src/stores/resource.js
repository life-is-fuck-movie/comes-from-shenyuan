import {writable} from 'svelte/store';
import Save from "../../game/other/tools/Save.js";

function load(){
    let resource = Save.LoadSaveJson("resource");
    if (resource === void 0){
        Save.WriteSaveJSON("resource", {
            wood : 0,
            stone: 0
        })
        resource = Save.LoadSaveJson("resource");
    }
    return resource
}

const resource = writable(load());

export default resource
