import CharacterTemplates from '../templates.js'
import AISkillModel from "../../skills/AISkillModel.js";
class Naxida extends CharacterTemplates{
    ID = "Naxida #01"
    Name = "纳西妲";
    Buffs = []; // 被动效果 、 回合效果等
    AliasName = "naxida" // 别名 用在文件系统上的


    Values = {
        attack: 10, defense: 15,max_hp: 4500, max_mp: 10, now_hp:4500 , now_mp:10
    }

    SkillsName = AISkillModel.skillGroup.the_3()
    SkillGroup = "the_3"


    Belongs = "须弥"

    Status = {
        is_die: false, // 是否死亡
        in_jail: null, // 所在监狱的地图名称
        now_job: [], // 当前所在的职位
        overloads: [], // 所携带的物品
        ranks: {
            "教令院学者": 2
        } //  当前角色所拥有的军队
    }

    God = true // 默认是神明

    ReloadId = Math.random() // 用于刷新角色状态的ID
}
export default Naxida
