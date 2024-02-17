<script>
import Router from "svelte-spa-router"
import routers from "./Router/main.js"
import Side from "./compontes/game/Nav/Side.svelte";
import Setting from "./compontes/game/Nav/Setting.svelte";
import  openSetting from "./stores/openSetting.js"
import  allow_scroll from "./stores/stores.js"
import Notify from "./compontes/functions/Notify.svelte";
import ActionPower from "./compontes/game/Nav/ActionPower.svelte";
import ModalTemplates from "./compontes/modals/ModalTemplates.svelte";
import NewGame from "./compontes/game/NewGame.svelte";
import ShortcutSide from "./compontes/game/Nav/ShortcutSide.svelte";

let setting_show

openSetting.subscribe(value=>{
    setting_show = value
})

// 创建一个全局对象来存储当前播放的音频
var currentAudio = null;

// 创建一个全局事件管理器
var audioEventManager = {
    // 注册音频
    registerAudio: function(audio) {

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
document.addEventListener('play', function(e){
    // 确保事件是音频元素的播放事件
    if (e.target.tagName.toLowerCase() === 'audio') {
        // 注册当前播放的音频
        audioEventManager.registerAudio(e.target);
    }
}, true);

</script>

<main on:mouseleave|stopPropagation={()=>{allow_scroll.set(false)}} on:mouseenter|stopPropagation={()=>{allow_scroll.set(true)}}>
    <NewGame />

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

    <ActionPower></ActionPower>

    <ShortcutSide />

    <ModalTemplates></ModalTemplates>


</main>

<style>
</style>
