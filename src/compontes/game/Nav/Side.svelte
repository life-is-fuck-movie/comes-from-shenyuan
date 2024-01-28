
<main  class="main" bind:this={self}>
    <div>
        {#if open}
            <div class="setting">
                <img src="src/game_resource/assets/image/Sprites/transparentDark/transparentDark31.png" on:click={settings}>
            </div>
        {/if}
    </div>

</main>

<script>
    import allow_scroll from "../../../stores/stores.js";
    import open_setting from "../../../stores/openSetting.js";
    import {onMount} from "svelte";

    import Setting from "./Setting.svelte";
    let self;
    let open = false
    let setting_show

    console.log(setting_show)
    open_setting.subscribe(value => {
        console.log("被修改")
        setting_show = value
    })




    onMount(
        ()=>{
            self.addEventListener('mouseenter', (event) => {
                allow_scroll.set(false)
                self.style.width = "300px"
                open = true
            });

            self.addEventListener('mouseleave', (event) => {
                allow_scroll.set(true)
                self.style.width = "50px"
                open = false
            });
        }
    )
    function settings(){
        open_setting.set(true)
    }
</script>

<style lang="less">
  :global(.setting-ui){
    position: fixed;
    top: 400px;
  }
    .main{
        z-index: 999;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 50px;
        background: #696A6A;
        transition: .6s;
    }
    .setting{
        text-align: right;
        margin: 20px;
        img{
          cursor: pointer;
        }
    }
</style>