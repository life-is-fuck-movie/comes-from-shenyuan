<style lang="less">
  @import "../../../../style/global";
    .map{
        width:( @size * @c_count  ) ;
        white-space: normal;
        overflow-x: auto;
        position: relative;
        left: 50px;
    }
    :global(.small_map) {
        float: left;
    }
    clear{
        display: block;
        clear: both;
    }
</style>

<main bind:this={self}>
    <div class="map">
        {#each Array.from({ length: 1200 }, (_, i) => i) as id }
            {#if id % 40 === 0}
                <clear></clear>
            {/if}
            <DefaultMap map_resource="{random(id)}" clazz="small_map" />
        {/each}
    </div>

</main>

<script>

import DefaultMap from "../../../../compontes/game/map/DefaultMap.svelte";
import mapResource from "../../../../fake_json/mapResource.js";
import allow_scroll from "../../../../stores/stores.js"
import settingConfig from "../../../../stores/globalSettingConfiger.js";

let demo_rich_value = mapResource.rich
let demo_rich_value_poor = mapResource.poor
let random = mapResource.random_rich
import { onMount } from 'svelte';
let self;
onMount(() => {
    const myElement = self;
    let X
    let Y
    let allow;
    let setting_config;
    settingConfig.subscribe(
        v => {
            setting_config = v
        }
    )

    allow_scroll.subscribe(
        value => {
            allow = value
        }
    )


    function distance_mode() {
       if (allow){
           const edgeMargin = 200; // 定义鼠标到达边缘的距离
           const scrollSpeed = setting_config.move; // 定义滚动速度

           // 计算鼠标距离页面边缘的距离
           const distanceToTop = Y;
           const distanceToBottom = window.innerHeight - Y;
           const distanceToLeft = X;
           const distanceToRight = window.innerWidth - X;

           // 检测是否靠近页面边缘，并相应地滚动
           if (distanceToTop < edgeMargin) {
               window.scrollBy(0, -scrollSpeed);
           } else if (distanceToBottom < edgeMargin) {
               window.scrollBy(0, scrollSpeed);
           }

           if (distanceToLeft < edgeMargin) {
               window.scrollBy(-scrollSpeed, 0);
           } else if (distanceToRight < edgeMargin) {
               window.scrollBy(scrollSpeed, 0);
           }
       }
    }

    setInterval(distance_mode, 10)

    document.addEventListener('mousemove', (event) => {
        X = event.clientX
        Y = event.clientY
    });



    });
</script>