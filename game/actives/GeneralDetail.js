import ShowModals from "../../src/stores/showModals.js";

class GeneralDetail{
    Character
    constructor(character) {
        this.Character = character
    }

    show_modal(){
        let character = this.Character

        ShowModals.set({
            type: "character",
            flag: true,
            data: character,
            close: true
        })
    }
}
export default GeneralDetail