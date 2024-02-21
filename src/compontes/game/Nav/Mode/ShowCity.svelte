<main class="main-city">
    <div class="viewer" style="background: url(' {mapper_image[city_mode]}')">
        <span>{mapper_value[city_mode]}</span>
    </div>
    <hr>
    <h1 class="city_name">
        {map_name}
    </h1>
    <h4 class="belongs-to">
        {belongs}
    </h4>

    {#if data.with_run}
        <Button value="你可以在这里先住下吧..."/>
        <Button value="带领你的部下进攻此处..."/>
        <Button value="要不你就在这里要做点坏事情..."/>
        <Button value="" />
    {/if}
</main>

<script>

    import {onMount} from "svelte";
    import mapManager from "/game/fake_json/Map.js"
    import Button from "../../../functions/Button.svelte";


    export let data

    let map_name = data.city_name

    let belongs = "2"
    let city_mode = "nice"
    let mapper_image = {
        nice: "/src/game_resource/assets/image/towndown/nice.jpg",
        small: "/src/game_resource/assets/image/towndown/small_towndown.jpg",
        middle: "/src/game_resource/assets/image/towndown/middle_towndown.webp"
    }
    let mapper_value = {
        nice: "这个城市正在欣欣向荣...",
        small: "小规模城市，人们的脸上总是洋溢着幸福的笑容...",
        middle: "中等规模城市，人们的生活节奏逐渐加快..."
    }

    onMount(
        () => {
            let now_data = mapManager.read_save()
            for (let city of now_data.city){
                if (city.data.name === map_name){
                    belongs = city.data.belongs
                    city_mode = city.data.rich
                }
            }

        }
    )
</script>

<style lang="less">
  .main-city {
    color: white;
    font-family: 楷体;
  }

  .viewer {
    width: 100%;
    height: 200px;
    display: block;
    background-size: 100% 100% !important;
    margin: 20px 0px;
    font-weight: bold;
    font-style: italic;
    color: white;

    span {
      background: #696A6ACC;
      padding: 4px;
      display: block;
    }
  }

  .city_name {
    margin: 10px 0;
  }
  .belongs-to{
    margin: 10px;
  }
</style>


