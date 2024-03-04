class warEffectTigger {
    has_attr(value) {
        return value !== void 0;
    }

    effectTrigger(status, from_character, to_character) {

        if (this.has_attr(status.hint))
            to_character.Values.now_hp -= status.hint


        if (this.has_attr(status.injure))
            from_character.Values.now_hp -= status.injure

        if(this.has_attr(status.add_defense))
            from_character.Values.defense += status.add_defense

        if(this.has_attr(status.add_attack))
            from_character.Values.attack += status.add_attack

        return [from_character, to_character]
    }
}

export default new warEffectTigger()