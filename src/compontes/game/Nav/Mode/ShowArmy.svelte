<main bind:this={self}>
    <div class="image-army">
    </div>
    <br><br><br>
    <hr>
    <span class="general-info">{data.character.Name}</span>

    <input bind:value={data.character.Name}>
    <button on:click={()=>{
        console.log(bindBox.getName())
        bindBox.Save();
        do{
            let number = Math.random()
            RefreshMapData.set(number)
        }while (number !== 0)
    }}>修改名称</button>
</main>

<script>
    import BindBox from "../../../../../game/characters/BindBox.js";
    import {onMount} from "svelte";
    import RefreshMapData from "../../../../stores/RefreshMapData.js";

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