<main class="app-default-map {runhere !== false ? runhere :'' } {clazz}" bind:this={self} on:click={clickEvent}>
    {map_resource.point_id}
    {#if map_config.has_city}
        <img class="center-icon" src="/src/game_resource/assets/image/towndown/church.gif"/>
        <br>
        <div class="city_name">{map_config.city_name}</div>
    {/if}

    {#if map_config.has_army}
        <img src="{new BindBox(map_config.character).getAvatar()}" class="aram-header"/>
        <div class={get_icon()}>
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
    import renderMap from "../../../stores/renderMap.js";
    import Save from "../../../../game/other/tools/Save.js";
    import Rendetor from "../../../../game/other/Rendetor.js";
    import go2here from "../../../../game/actives/go2here.js";

    export let map_resource; // 地图资源对象

    let clazz = ""
    export {clazz}

    let self;
    let ground_style;

    let runhere = false;
    let render_data;


    let map_config = {
        has_city: false,
        city_name: "",
        has_army: false,
        army_data: null,
        character: null,
        has_wood: false,
        has_store: false,
        character_power_type: null,
        with_run: false
    }

    function clickEvent() {
        let Go2here = new go2here()
        if (runhere) {
            if (runhere === "city-runhere") {
                show_mode.set({
                    type: "city",
                    data: {
                        city_name: map_config.city_name,
                        with_run: true
                    }
                })
                sideSwitch.set(false)
            } else if (runhere === "self-runhere") {
                show_mode.set({
                    type: "army",
                    data: {
                        army_data: map_config.army_datal,
                        character: map_config.character,
                        power_type: map_config.character_power_type,
                        site: parseInt(map_resource.point_id),
                        with_run: true
                    }
                })
                sideSwitch.set(false)
            } else if (runhere === "display-runhere") {
                Go2here.stop_target()
            } else if (runhere === "runhere") {
                Go2here.moveCharacter(render_data.character, map_resource.point_id);
            } else if (runhere === "resource-runhere") {
                Go2here.moveCharacter2Resource(map_config, render_data.character, map_resource.point_id);
            }
            //TODO 不同的RUNHERE在这里
        } else {
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
                        power_type: map_config.character_power_type,
                        site: parseInt(map_resource.point_id)
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
    }

    function get_icon() {
        if (map_config.character_power_type === "self") {
            return "self-aram-name"
        } else if (map_config.character_power_type === "enemy") {
            return "enemy-aram-name"
        } else {
            return "aram-name"
        }
    }

    function render_map() {

        // region 颜色深度
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
                if (player_power === character.Belongs) {
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
            return;
        } else if (stones.includes(my_id)) {
            map_config.has_store = true
            return;
        }

        // endregion

        // endregion

        // region 渲染普通的地图
        map_config = {
            has_city: false,
            city_name: "",
            has_army: false,
            army_data: null,
            character: null,
            has_wood: false,
            has_store: false,
            character_power_type: null,
            with_run: false
        }
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
        renderMap.subscribe(
            //TODO 这里渲染地图信息
            v => {
                let render = new Rendetor();

                if (v.data !== null) {
                    render_data = v.data
                }

                if (v.mode === "target") { // 目标
                    runhere = render.target_render_event(map_config, runhere, map_resource, v)

                } else if (v.mode === "clear") {
                    runhere = false
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
    font-family: 楷体, serif;
  }

  .app-default-map {
    width: @size;
    height: @size;
    background: rebeccapurple;
    transition: .3s;
    border: 1px seagreen solid;
    box-sizing: border-box;
    cursor: none;

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

  .self-aram-name {
    text-align: center;
    font-family: 楷体, serif;
    font-weight: bold;
    font-size: 25px;
    width: fit-content;
    margin: auto;
    padding: 4px 15px;
    background: green;
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

  @layer {
    .runhere {
      position: relative !important;

      &:after {
        position: absolute;
        background: #08E7EACC !important;

        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        content: "前进";
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bolder;
        font-family: 楷体, serif;

      }
    }

    .self-runhere {
      position: relative !important;

      &:after {
        position: absolute;
        background: #08E7EACC !important;

        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        content: "本国将军";
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bolder;
        font-family: 楷体, serif;

      }
    }

    .bad-runhere {
      position: relative !important;

      &:after {
        position: absolute;
        background: rgba(255, 82, 238, .80) !important;
        color: white;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        content: "他国将军";
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bolder;
        font-family: 楷体, serif;

      }

    }

    .resource-runhere {
      position: relative !important;

      &:after {
        position: absolute;
        background: #08E7EACC !important;

        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        content: "移动并采取资源";
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bolder;
        font-family: 楷体, serif;

      }
    }

    .city-runhere {
      position: relative !important;

      &:after {
        position: absolute;
        background: #08E7EACC !important;

        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        content: "城市管理";
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bolder;
        font-family: 楷体, serif;

      }
    }

    .display-runhere {
      position: relative !important;

      &:after {
        position: absolute;
        background: rgba(164, 24, 86, 0.8) !important;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        content: "取消移动";
        display: flex;
        color: cornsilk;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bolder;
        font-family: 楷体, serif;
      }
    }

  }


</style>