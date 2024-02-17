<main class="setting-ui {clazz}" on:mouseenter={()=>{allow_scroll.set(false)}}
      on:mouseleave={()=>{allow_scroll.set(true)}}>
    <div class="quit" on:click={()=>{
        openSetting.set(false)
        allow_scroll.set(true)
    }}></div>
    <div class="title">
        <h2>设置</h2>
    </div>
    <div class="setting-main">
        边缘移动速度： ({setting_config.move})
        <input type="range" id="slider" name="slider" min="0" max="5" bind:value={setting_config.move}>
        <br>
        <Button
                click={
                    ()=>{
                        //LOGO 重置游戏
                        localStorage.removeItem("map_data")
                        localStorage.removeItem("player-power")
                        window.location.reload()
                    }
                }
                value="新的一轮"
        />
        <Button
                click={
                    ()=>{
                        //LOGO 重置游戏
                        localStorage.removeItem("map_data")
                        window.location = "/"
                    }
                }
                value="加载存档"
        />
        <Button
                click={
                    ()=>{
                        //LOGO 重置游戏
                        localStorage.removeItem("map_data")
                        window.location = "/"
                    }
                }
                value="保存存档"
        />

        <button class="save" on:click={
            ()=>{
                saveSetting()
                openSetting.set(false)
            }
        }>保存、退出
        </button>
    </div>
</main>
<style lang="less">
  @w: 512px;
  @h: 70vh;
  .setting {
    background-image: url("../../../game_resource/assets/image/paper background.png");
    border-radius: 10px;
    width: @w;
    height: @h;
    top: calc((100vh - @h) / 2);
    left: calc((100vw - @w) / 2);
    z-index: 1000;
    padding: 20px;
  }

  .quit {
    background-image: url("../../../game_resource/assets/image/Sprites/shadedDark/shadedDark47.png");
    height: 40px;
    width: 40px;
    background-size: 100% 100%;
    float: right;

    &:hover {
      background-image: url("../../../game_resource/assets/image/Sprites/shadedLight/shadedLight47.png");
    }
  }

  .title {
    user-select: none;
  }

  .setting-main {
    margin: 40px;
    font-family: 楷体;
    font-size: 20px;
    position: relative;
    font-weight: bold;
    height: calc(100% - 60px);

    .save {
      position: absolute;
      bottom: 2px;
      outline: none;
      border: 0;
      width: 120px;
      height: 40px;
      color: #696A6A;
      background: #e5bd5e;

      &:hover {
        background: #9b7f3e;
        color: #fff;


      }


    }
  }

</style>
<script>
    import allow_scroll from "../../../stores/stores.js";
    import openSetting from "../../../stores/openSetting.js";
    import saveManager from "/game/other/tools/Save.js"
    import {onMount} from "svelte";
    import settingConfig from "../../../stores/globalSettingConfiger.js";
    import notify_value from "../../../stores/notify.js";
    import Button from "../../functions/Button.svelte";

    let setting_config

    settingConfig.subscribe(
        v => {
            setting_config = v
        }
    )

    function saveSetting() {
        saveManager.WriteSaveJSON("setting", setting_config) // 读写到本地
        loadSetting() // 重新加载
        notify_value.set({
            type: "info",
            value: "保存设置成功"
        })
    }

    function loadSetting() {
        settingConfig.set(saveManager.LoadSaveJson('setting')) // 加载到全局store中
    }

    onMount(
        () => {
            loadSetting()
        }
    )
    export let clazz;
</script>