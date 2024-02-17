<main class="app-default-map {clazz}" bind:this={self} on:click={clickEvent}>
    {map_resource.point_id}
    {#if map_config.has_city}
        <img class="center-icon" src="/src/game_resource/assets/image/towndown/church.gif"/>
        <br>
        <div class="city_name">{map_config.city_name}</div>
    {/if}

    {#if map_config.has_army}
        <img src="{new BindBox(map_config.character).getAvatar()}" class="aram-header"/>
        <div class="aram-name">
            {#if map_config.character_power_type === "self"}
                <span class="self-logo">我</span>
            {/if}
            {map_config.character.Name}
        </div>


    {/if}

    {#if map_config.has_wood}
        <img src="/src/game_resource/assets/image/wood.svg" class="aram-header">
    {/if}

    {#if map_config.has_store}
        <img src="/src/game_resource/assets/image/stone.png" class="aram-header">
    {/if}


</main>

<script>
    import {onMount} from "svelte";
    import init_map_resource from "/game/fake_json/Map.js"
    import show_mode from "../../../stores/showMode.js";
    import sideSwitch from "../../../stores/sideSwitch.js";
    import BindBox from "../../../../game/characters/BindBox.js";
    import RefreshMapData from "../../../stores/RefreshMapData.js";

    export let map_resource; // 地图资源对象

    let clazz = ""
    export {clazz}


    let self;
    let ground_style;


    let map_config = {
        has_city: false,
        city_name: "",
        has_army: false,
        army_data: null,
        character: null,
        has_wood: false,
        has_store: false,
        character_power_type: null
    }

    function clickEvent() {
        if (map_config.has_city) {
            // 点击的是城市

            sideSwitch.set(true)

            show_mode.set({
                type: "city",
                data: {
                    city_name: map_config.city_name
                }
            })

            sideSwitch.set(false)

        } else if (map_config.has_army) {
            sideSwitch.set(true)

            show_mode.set({
                type: "army",
                data: {
                    army_data: map_config.army_datal,
                    character: map_config.character,
                    power_type: map_config.character_power_type
                }
            })

            sideSwitch.set(false)
        } else if (map_config.has_wood) {
            sideSwitch.set(true)

            show_mode.set({
                type: "wood"
            })

            sideSwitch.set(false)
        } else if (map_config.has_store) {
            sideSwitch.set(true)

            show_mode.set({
                type: "store"
            })

            sideSwitch.set(false)
        } else // TODO 不同单元格的点击事件
        {
            // 无单位格子
            sideSwitch.set(true)
            show_mode.set({
                type: "default"
            })
        }
    }

    function render_map() {

        // region 根据??置颜色深度
        ground_style = `rgb(173, 255, 4)`
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
                return // 不继续渲染了
            }
        }
        // endregion

        // region 军队&角色渲染
        for (let army of save_resource.army) {
            if (army.site === my_id) {
                // 有军队
                map_config.has_army = true
                map_config.army_data = army.data
                map_config.character = map_config.army_data.object

                //LOGO 角色类型判断
                let character = map_config.character
                let player_power = localStorage.getItem("player-power")
                console.log(player_power)
                if (player_power === character.Belongs) {
                    console.log("找到了")
                    map_config.character_power_type = "self"
                }
                return //  不继续渲染了
            }
        }
        // endregion

        // region 木头石头渲染
        let woods = save_resource.wood
        let stones = save_resource.stone

        if (woods.includes(my_id)) {
            map_config.has_wood = true
        } else if (stones.includes(my_id)) {
            map_config.has_store = true
        }

        // endregion

        // endregion
    }

    onMount(() => {
        RefreshMapData.subscribe(
            v => {
                if (v !== false) {
                    render_map()
                }
            }
        )
        render_map()
    })
</script>

<style lang="less">
  @import "../../../style/global";

  .center-icon {
    height: 40%;
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

  .aram-header {
    width: 50%;
    height: 50%;
    margin: 10px auto 4px;
    border-radius: 50%;
    display: block;

  }

  .aram-name {
    text-align: center;
    font-family: 楷体, serif;
    font-weight: bold;
    font-size: 25px;
    width: fit-content;
    margin: auto;
    padding: 4px 15px;
    background: #9b7f3e;
    color: white;
  }

  .self-logo {
    font-size: 14px;
    position: relative;
    top: -3px;
    width: 10px;
    height: 10px;
    background: #5eff00;
    color: #000;
  }
</style>