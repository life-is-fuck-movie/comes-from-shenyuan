import {writable} from 'svelte/store';
import Save from "../../game/other/tools/Save.js";

const resource = writable(Save.LoadSaveJson("resource"));

export default resource
