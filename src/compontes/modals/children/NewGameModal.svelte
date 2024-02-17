<script>
    import Button from "../../functions/Button.svelte";
    import showModals from "../../../stores/showModals.js";
    import Notify from "../../../stores/notify.js";
    import RefreshMapData from "../../../stores/RefreshMapData.js";

    let select_power = null

    function f(v) {
        select_power = v
    }

    function start_game(){
        if (select_power !== null)
            localStorage.setItem("player-power", select_power)
        showModals.set({
            flag: false
        })
        Notify.set({
            type:"info",
            value: "玩家选择了" + select_power + "势力!",
            headimage: "/src/game_resource/assets/characters/congyu/headimage.jpg"
        })
        RefreshMapData.set(true)
    }
</script>

<main>
    <div class="title">选择你的势力</div>
    <Button value="璃月" click={_=>{f("璃月")}}/>
    <Button value="须弥" click={_=>{f("须弥")}}/>
    <Button value="罗德岛" click={_=>{f("罗德岛")}}/>
    {#if select_power !== null}
        你选择了: {select_power}
        <Button value="开始游戏!" click={start_game}/>
    {/if}
</main>

<style lang="less">
  .title {
    text-align: center;
    font-size: 40px;
    margin: 20px 0;
  }
</style>