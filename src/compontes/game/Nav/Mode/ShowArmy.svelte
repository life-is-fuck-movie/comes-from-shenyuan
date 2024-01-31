<main bind:this={self}>
    <div class="image-army">
    </div>
    <br><br><br>
    <hr>
    <span class="general-info">{data.character.Name}</span>

</main>

<script>
    import BindBox from "../../../../../game/characters/BindBox.js";
    import {onMount} from "svelte";

    export let data
    let self
    let bindBox = new BindBox(data.character);
    onMount(
        () => {
            self.querySelector(".image-army").style.backgroundImage = `url(${bindBox.getPicture()})`

        }
    )
</script>

<style lang="less">
  .image-army {
    display: block;
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center;
  }

  .general-info {
    font-family: 楷体,serif;
    display: block;
    background: #696A6ACC;
    padding: 10px;
    color: white;
    font-size: 30px;
    font-weight: bold;

  }

</style>