<main>
    {#if character !== undefined}
        {#each Object.keys(character.Status.ranks) as armyname}
            {#if character.Status.ranks[armyname] > 0}
                <ArmyElement manager="{manager}" army={armyname} count={character.Status.ranks[armyname]} to_mode={to_mode}/>

            {/if}
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

    let character;
    export let to_mode = false;
    export let manager = true


    // to_mode开启的时候
    to_character.subscribe(
        value => {
            if (to_mode === true) {
                if (value !== null)
                    character = value.to
            } else {
                if (value !== null) {
                    character = value.form
                }
            }
        }
    )

</script>

<style>
    .none {
        color: slategray;
        border: red 1px dashed;
        margin-top: 10px;
        text-align: center;
    }
</style>