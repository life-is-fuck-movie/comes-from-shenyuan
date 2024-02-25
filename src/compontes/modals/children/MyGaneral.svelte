<main>
    <ul class="my-general-list">
        {#each characters as character, index}
            <li class="my-general" on:click={()=>{detail_general()}} index="{index}">
                {character.Name} | HP : {character.Values.now_hp} / {character.Values.max_hp} | 所在位置: {characterDescriptor.getCharacterWhere(character)}<br>
            </li>
        {/each}
    </ul>
</main>

<script>

    import CharactersDescriptor from "../../../../game/characters/CharactersDescriptor.js";
    import ShowModals from "../../../stores/showModals.js";

    let characterDescriptor = new CharactersDescriptor();
    let characters = characterDescriptor.getUserCharacter()

    function detail_general(){
        ShowModals.set({flag: false})
        let index = event.target.getAttribute("index")
        let chara = characters[index]
        let where = characterDescriptor.getCharacterWhere(chara)
        document.getElementsByClassName(`default-map-${where}`)[0].click()
    }
</script>

<style>
    .my-general {
        list-style: none;
        color: #5C5F5F;
        margin-left: 20px;
        margin-top: 5px;
        cursor: pointer;
        user-select: none;

        &:hover {
            color: #5eff00;
        }
    }

    .my-general-list {
        overflow: auto;
        width: 70%;
        margin:  10px auto;
        height: 50vh;
        box-sizing: border-box;
        background: rgba(15,15,30,.1);
        padding: 10px;
    }
</style>