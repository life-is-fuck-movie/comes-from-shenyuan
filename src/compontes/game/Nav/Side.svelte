<main class="main" bind:this={self}>
    <div>
        {#if (open && !side_switch)}
            <img src="src/game_resource/assets/image/Sprites/transparentDark/transparentDark33.png"
                 on:click={
                     ()=>{
                         close_side()
                         setTimeout(
                             ()=>{
                                 sideSwitch.set(true)
                                 show_mode.set({type: "default"})
                             }, 100
                         )
                 }} class="cancle" alt="">

        {/if}
        {#if open}
            <div class="setting">
                <img src="src/game_resource/assets/image/Sprites/transparentDark/transparentDark31.png"
                     on:click={settings}
                >
            </div>


            {#if showMode.type === "city"}
                <ShowCity data={showMode.data}/>
            {/if}

            {#if showMode.type === "army"}
                <ShowArmy data={showMode.data}/>
            {/if}

            {#if showMode.type === "store"}
                <div class="resource">这里有丰富的石头资源</div>
            {/if}

            {#if showMode.type === "wood"}
                <div class="resource">这里有丰富的木头资源</div>
            {/if}
        {/if}
    </div>

</main>

<script>
    import allow_scroll from "../../../stores/stores.js";
    import open_setting from "../../../stores/openSetting.js";
    import {onMount} from "svelte";
    import Setting from "./Setting.svelte";
    import show_mode from "../../../stores/showMode.js";
    import ShowCity from "./Mode/ShowCity.svelte";
    import sideSwitch from "../../../stores/sideSwitch.js";
    import ShowArmy from "./Mode/ShowArmy.svelte";
    // store 变量-------
    let setting_show
    let showMode
    let side_switch


    show_mode.subscribe(
        v => {
            showMode = v
        }
    )

    open_setting.subscribe(value => {
        setting_show = value
    })


    // ------

    let self;

    let open = false


    function open_side() {
        allow_scroll.set(false)
        self.style.width = "300px"
        open = true
    }

    function close_side() {
        allow_scroll.set(true)
        self.style.width = "50px"
        open = false
    }

    function settings() {
        open_setting.set(true)
    }

    onMount(
        () => {
            sideSwitch.subscribe(
                value => {
                    side_switch = value
                    if (!side_switch) {
                        close_side()// 刷新界面
                        setTimeout(open_side, 1)
                    } else {
                        close_side()
                    }
                }
            )

            self.addEventListener('mouseenter', (event) => {
                if (side_switch) {
                    open_side()
                }
            });

            self.addEventListener('mouseleave', (event) => {
                if (side_switch) {
                    close_side()
                }
            });

        }
    )


</script>

<style lang="less">
  :global(.setting-ui) {
    position: fixed;
    top: 400px;
  }

  .main {
    z-index: 999;
    position: fixed;
    overflow-y: auto;
    top: 0;
    left: 0;
    height: 100vh;
    width: 50px;
    background: #696A6A;
    transition: .6s;
  }

  .setting {
    text-align: right;
    margin: 20px;

    img {
      cursor: pointer;
    }
  }

  .cancle {
    float: left;
    margin-left: 20px;
    cursor: pointer;
  }
  .aram-header{
    width: 30px ;
  }
  .resource{
    color: white;
    font-size: 20px;
  }
</style>