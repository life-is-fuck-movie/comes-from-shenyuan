const BuffType = {
    BeforeCharacterInit:"BeforeCharacterInit",
    AfterCharacterInit:"AfterCharacterInit",
    BeforeReleaseSkill:"BeforeReleaseSkill",
    AfterReleaseSkill:"AfterReleaseSkill",
    BeforeMove:"BeforeMove",
    AfterMove:"AfterMove",
    BeforeDie:"BeforeDie",
    AfterDie:"AfterDie",
    BeforeWar:"BeforeWar",
    AfterWar:"AfterWar",
    AfterWin:"AfterWin",
    BeforeWin:"BeforeWin",
    AfterLose:"AfterLose",
    BeforeLose:"BeforeLose",
    Round: "Round",
    EndRound: "EndRound",
    Civil:"Civil",
    ALL:"ALL"
}
export class BuffTemplate{
    buffType = BuffType.ALL;
    description = "这是一个Buff的模板"
    character = void 0;
    constructor(character) {
        this.character =  character
    }

    Effect(...Object){
        console.log("这个Buff被触发了");
    }
}

const returnData = {
    "BuffType" : BuffType,
    "BuffTemplate" : BuffTemplate,
}

export default returnData