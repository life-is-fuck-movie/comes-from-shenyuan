<main>
    {#if character !== undefined}
        {#each Object.keys(character.Status.ranks) as armyname}
            <ArmyElement army={armyname} count={character.Status.ranks[armyname]} to_mode={to_mode}/>
        {/each}

        {#if Object.keys(character.Status.ranks).length === 0}
            <div class="none">光杆司令</div>
        {/if}
    {/if}
</main>

<script>
    import ArmyElement from "./ArmyElement.svelte";
    import to_character from "/src/stores/toCharacter.js";
    import {onMount} from "svelte";

    export let character;
    export let to_mode = false;


    // to_mode开启的时候
    to_character.subscribe(
        value => {
            if (to_mode === true) {
                console.log(value)
                if (value !== null)
                    character = value.to
            }
        }
    )

</script>

<style>
    .none{
        color: slategray;
        border: red 1px dashed;
        margin-top: 10px;
        text-align: center;
    }
</style>