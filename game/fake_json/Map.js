import save from "../other/tools/Save.js";
import HuTao from "../characters/Impl/HuTao.js";

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
                name: "摩尔叶卡",
                belongs: "青兰",
                rich: "nice",
            },
            site: 124
        },
        {
            data: {
                name: "群山塔",
                belongs: "青兰",
                rich: "small",
            },
            site: 164
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
                name: "胡桃",
                object:  function(){
                    let hutao_clone = new HuTao()
                    hutao_clone.ID = "HUTAO #02"
                    return hutao_clone
                }()
            },
            site: 204
        }
    ]
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