<main class="app-default-map {clazz}"  bind:this={self}>
    {map_resource.point_id}
</main>

<script >
    import {onMount} from "svelte";
    export let map_resource; // 地图资源对象

    let clazz = ""
    export {clazz}


    let self;
    let ground_style;

    onMount(()=>{
        // region 根据丰饶度设置颜色深度
        let rich_value = map_resource.rich_value
        const root = document.documentElement;
        ground_style = 200 + (rich_value / 2)
        ground_style = `rgb(173,${ground_style},4 )`
        self.style.background = ground_style
        // endregion


    })
</script>

<style lang="less" >
  @import "../../../style/global";
  .app-default-map{
      width: @size;
      height: @size;
        background: rebeccapurple;
    }

</style>