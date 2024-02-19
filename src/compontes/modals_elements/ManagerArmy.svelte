<main>
    <h3>军队</h3>
    {#if ranks}
        {#each Object.keys(ranks) as key}
            <div class="army-element">
                {key} : 共 {ranks[key]} 个
            </div>
        {/each}
        <div class="army-element resource" on:click={
            ()=>{
                showModals.set({
                    flag: true,
                    type: "army_edit",
                    data: {
                        form: character
                    },
                    close: true
                })
            }
        }>军队编辑
        </div>
    {/if}
</main>

<script>
    import {onMount} from "svelte";
    import showModals from "../../stores/showModals.js";

    export let character;

    let ranks
    onMount(
        _ => {
            ranks = character.Status.ranks;
        }
    )
</script>

<style lang="less">
  .army-element {
    margin: 20px;
    color: #5c5f5f;

    &:hover {
      color: greenyellow;
    }
  }

  .resource {
    margin-left: 0;
    color: black;
    cursor: pointer;

    &:hover {
      color: saddlebrown;
    }
  }
</style>