<style lang="less">
  @import "../../../../style/global";
    .map{
        width:( @size * @c_count  ) ;
        white-space: normal;
        overflow-x: auto;
    }
    :global(.small_map) {
        float: left;
    }
    clear{
        display: block;
        clear: both;
    }
</style>

<main>
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

let demo_rich_value = mapResource.rich
let demo_rich_value_poor = mapResource.poor
let random = mapResource.random_rich

</script>