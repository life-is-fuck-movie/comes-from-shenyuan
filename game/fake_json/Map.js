import save from "../other/tools/Save.js";
import HuTao from "../characters/Impl/HuTao.js";
import congYu from "../characters/Impl/Naxida.js";
import CongYu from "../characters/Impl/Naxida.js";
import Naxida from "../characters/Impl/Naxida.js";
import XingQiu from "../characters/Impl/XingQiu.js";
import LingLan from "../characters/Impl/LingLan.js";

function generateRandomNumbers(min, max, length, had) {
    if (length > (max - min + 1) || (had.length + length) > (max - min + 1)) {
        console.error("Invalid input. Cannot generate the requested number of unique random numbers.");
        return [];
    }

    const result = [];
    const allPossibleNumbers = Array.from({ length: max - min + 1 }, (_, index) => min + index);

    for (let i = 0; i < length; i++) {
        let randomNumber;

        do {
            randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (result.includes(randomNumber) || had.includes(randomNumber));

        result.push(randomNumber);
    }

    return result;
}
let stones = generateRandomNumbers(0, 1199, 200, [])
// 这个是初始化地图的数据 如果修改 请删除localStorage的map_data
let init_map_resource = {
    city: [
        {
            data: {
                name: "吃虎岩",
                belongs: "璃月",
                rich: "small",
            },
            site: 124
        },
        {
            data: {
                name: "玉京台",
                belongs: "璃月",
                rich: "small",
            },
            site: 164
        },
        {
            data: {
                name: "不卜庐",
                belongs: "璃月",
                rich: "small",
            },
            site: 212
        },{
            data: {
                name: "水泽荻原",
                belongs: "璃月",
                rich: "small",
            },
            site: 212
        },



        {
            data: {},
            site: 205
        },

    ],
    stone: stones,
    wood: generateRandomNumbers(0, 1199, 200, stones),
    army: [
        {
            data: {
                name: "胡桃",
                object: new HuTao()
            },
            site: 201
        },
        {
            data: {
                name: "铃兰",
                object: new LingLan()
            },
            site: 247
        },
        {
            data: {
                name: "纳西妲",
                object:  new Naxida()
            },
            site: 204
        },
        {
            data: {
                name: "行秋",
                object:  new XingQiu()
            },
            site: 202
        }
    ],
    power:{
        "璃月": {
            army: [{
                "万云商会情报员": 10,
                "万云商会镖师": 1
            }]
        }
    }
}

class Manager{
    init_save(){
        save.WriteSaveJSON("map_data", init_map_resource)
    }

    read_save(){
        return save.LoadSaveJson("map_data")
    }
}
export default new Manager()