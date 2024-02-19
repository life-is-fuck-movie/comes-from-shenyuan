<script>
    import CharactersDescriptor from "../../../../game/characters/CharactersDescriptor.js";
    import Armymananger from "../../armyManager/Armymananger.svelte";
    import to_character from "../../../stores/toCharacter.js";
    import {onMount} from "svelte";

    let characterDescriptor = new CharactersDescriptor();


    export let form_character



    onMount(
        () => {
            let default_character = characterDescriptor.getUserCharacter()
            default_character = default_character.filter(
                i => i.ID !== form_character.ID
            )
            to_character.set({
                form: form_character,
                to: default_character[0]
            })
        }
    )

</script>
<main class="main">
    <div class="character-army">
        这是 {form_character.Name} 的军队
        <Armymananger to_mode={false}></Armymananger>
    </div>
    <div class="mode">
        &lt;=&gt;
    </div>
    <div class="character-army">
        军队管理对象

        <select on:change={()=>{
            let character = characterDescriptor.loadCharacterByID(event.target.value);
            to_character.set({
                form: form_character,
                to: character
            })
        }}>
                {#each characterDescriptor.getUserCharacter() as character}
                    {#if character.ID !== form_character.ID}
                        <option value={character.ID}>{character.Name}</option>
                    {/if}
                {/each}
        </select>

        <Armymananger to_mode={true}></Armymananger>

    </div>
</main>


<style>
    .main {
        display: flex;
        width: 100%;
        height: 50vh;
        justify-content: space-around;
    }

    .mode {
        align-items: center !important;
        height: 50vh;
        display: flex;
        font-size: 40px;
    }
</style>