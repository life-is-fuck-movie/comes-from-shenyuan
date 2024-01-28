<main class="app-default-map {clazz}" bind:this={self}>
    {map_resource.point_id}
    {#if map_config.has_city}
        <img class="center-icon" src="/src/game_resource/assets/image/towndown/church.gif"/>
        <br>
        <div class="city_name">{map_config.city_name}</div>
    {/if}
</main>

<script>
    import {onMount} from "svelte";
    import init_map_resource from "/src/fake_json/Map.js"

    export let map_resource; // 地图资源对象

    let clazz = ""
    export {clazz}


    let self;
    let ground_style;

    let map_config = {
        has_city: false,
        city_name: ""
    }

    onMount(() => {
        // region 根据丰饶度设置颜色深度
        let rich_value = map_resource.rich_value
        const root = document.documentElement;
        ground_style = 200 + (rich_value / 2)
        ground_style = `rgb(173,${ground_style},4 )`
        self.style.background = ground_style
        // endregion

        // region 渲染当前点的资源或者角色

        const my_id = map_resource.point_id

        let save_resource = init_map_resource.read_save()
        if (save_resource === void 0) {
            // 未被初始化过地图信息
            init_map_resource.init_save() // 先初始化一次
            save_resource = init_map_resource.read_save()
        }

        // region 城镇

        for (let city of save_resource.city) {
            if (city.site === my_id) {
                // 有城镇
                map_config.has_city = true
                map_config.city_name = city.data.name
            }
        }
        // endregion

        // endregion

    })
</script>

<style lang="less">
  @import "../../../style/global";

  .center-icon {
    height: 150px;
    margin: 0 auto;
    position: relative;
    top: 10%;
    display: block;
  }

  .city_name {
    text-align: center;
    margin-top: 10px;
    font-family: 楷体;
  }

  .app-default-map {
    width: @size;
    height: @size;
    background: rebeccapurple;
    transition: .3s;
    border: 1px seagreen solid;
    box-sizing: border-box;

    &:hover {
      background: aquamarine !important;
      cursor: pointer;
    }
  }


</style>