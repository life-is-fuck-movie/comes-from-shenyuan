<script>
    import Router from "svelte-spa-router"
    import routers from "./Router/main.js"
    import Side from "./compontes/game/Nav/Side.svelte";
    import Setting from "./compontes/game/Nav/Setting.svelte";
    import openSetting from "./stores/openSetting.js"
    import allow_scroll from "./stores/stores.js"
    import Notify from "./compontes/functions/Notify.svelte";
    import ActionPower from "./compontes/game/Nav/ActionPower.svelte";
    import ModalTemplates from "./compontes/modals/ModalTemplates.svelte";
    import NewGame from "./compontes/game/NewGame.svelte";
    import ShortcutSide from "./compontes/game/Nav/ShortcutSide.svelte";
    import {fade} from 'svelte/transition'
    import toast from "./stores/toast.js";
    import ResourceView from "./compontes/game/Nav/ResourceView.svelte";

    let setting_show

    openSetting.subscribe(value => {
        setting_show = value
    })

    let toast_listen;
    let show_flag = false;
    let toast_value;
    let an;
    let toast_callback = () => {
        console.log("默认毁掉")
        show_flag = false
    }
    toast.subscribe(
        v => {
            if (v.value !== "") {
                show_flag = true;
                toast_value = v.value
                if (v.callback) {
                    console.log("设置回调")
                    toast_callback = v.callback
                }
                if (v.flag && v.flag !== "Now") {

                } else if (v.flag === "Now") {
                    console.log("里客观")
                    show_flag = false
                } else {
                    try {
                        clearTimeout(an)
                    } catch {
                    } // 事件防抖
                    an = setTimeout(
                        () => {
                            show_flag = false
                        }, 2000
                    )
                }
            }
        }
    )

    // 创建一个全局对象来存储当前播放的音频
    var currentAudio = null;

    // 创建一个全局事件管理器
    var audioEventManager = {
        // 注册音频
        registerAudio: function (audio) {

            //TODO 这里可以加入多音频模式下的音频
            let async_play = []
            if ((currentAudio !== null && currentAudio !== audio) || async_play.includes(audio)) {
                currentAudio.pause();
            }
            // 更新当前播放的音频
            currentAudio = audio;
        }
    };

    // 监听音频播放事件
    document.addEventListener('play', function (e) {
        // 确保事件是音频元素的播放事件
        if (e.target.tagName.toLowerCase() === 'audio') {
            // 注册当前播放的音频
            audioEventManager.registerAudio(e.target);
        }
    }, true);

</script>
{#if show_flag}
    <div class="toast" type="success" on:click={()=>{
toast_callback()
    }}>
        <div class="toast-inner" transition:fade>{toast_value}</div>
    </div>
{/if}
<main on:mouseleave|stopPropagation={()=>{allow_scroll.set(false)}}
      on:mouseenter|stopPropagation={()=>{allow_scroll.set(true)}}>


    <NewGame/>

    <Side/>
    <Router routes={routers}/>
    {#if setting_show === true}
        <Setting clazz="setting"/>
    {/if}

    <Notify
            on:mouseleave={()=>{
                console.log("mouseleave")
                allow_scroll.set(false)
            }}
            on:mouseenter={()=>{
                allow_scroll.set(true)
                console.log("mouseleave")
            }}
    />


    <ShortcutSide/>

    <ModalTemplates></ModalTemplates>
    <ResourceView/>

</main>

<style lang="less">
  .toast {
    position: fixed;
    bottom: 0px;
    z-index: 999999999999999999999;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .toast-inner {
      padding-left: 20px;
      box-sizing: border-box;
      cursor: pointer;
      user-select: none;
      color: white;
      width: 100vw;
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 20px;
      font-family: "华文中宋", "幼圆", serif;
      background: #262626;
    }

    .toast-inner-show {
      width: 100vw;
      height: 300px;

    }
  }
</style>
