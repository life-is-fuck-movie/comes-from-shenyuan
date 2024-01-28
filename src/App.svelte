<script>
import Router from "svelte-spa-router"
import routers from "./Router/main.js"
import Side from "./compontes/game/Nav/Side.svelte";
import Setting from "./compontes/game/Nav/Setting.svelte";
import  openSetting from "./stores/openSetting.js"
import  allow_scroll from "./stores/stores.js"
import Notify from "./compontes/functions/Notify.svelte";

let setting_show

openSetting.subscribe(value=>{
    setting_show = value
})

</script>

<main on:mouseleave|stopPropagation={()=>{allow_scroll.set(false)}} on:mouseenter|stopPropagation={()=>{allow_scroll.set(true)}}>
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

</main>

<style>
</style>
