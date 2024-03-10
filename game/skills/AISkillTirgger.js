class AISkillTirgger{
    trigger(self_character, hos_chara, skill_group){
        // AI触发技能组
        return this[skill_group]
    }
    the_1(integration){
        console.log("胡桃在使用技能")

    }

    the_2(integration){

    }

    the_3(integration){
        console.log("纳西妲在使用技能")
    }
}

export default new AISkillTirgger();