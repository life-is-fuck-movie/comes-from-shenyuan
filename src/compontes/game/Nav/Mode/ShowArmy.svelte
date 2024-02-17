<main bind:this={self}>
    <div class="image-army">
    </div>
    <br><br><br>
    <hr>
    <span class="general-info">{data.character.Name}</span>
    <div class="value-show">
        <div class="value-view attack-value">
            <img src="/src/game_resource/assets/image/icon/attack.png" alt="">
            {data.character.Values.attack}
        </div>
        <div class="value-view attack-value">
            <img src="/src/game_resource/assets/image/icon/shield.png" alt="">
            {data.character.Values.defense}
        </div>

        <div class="value-view attack-value">
            <img src="/src/game_resource/assets/image/icon/heart.gif" alt="">
            <div style="color: greenyellow">
                {data.character.Values.max_hp}
            </div>
            {data.character.Values.now_hp}
        </div>
    </div>

    <div class="actives">
        <!--   己方角色     -->
        {#if data.power_type === "self"}
            <Button value="我要让你去... (1)" click={()=>{
            }}></Button>
            <Button value="可以参观下你的军队吗..." click={()=>{
                let generalDetail = new GeneralDetail(data.character);
                generalDetail.show_modal()
            }}></Button>
            <Button value="我要你攻击... (1)" click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="对于军资我有以下的意见... (1)" click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="你都有哪些俘虏... (3)" click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="想对你说些知心话... (3)" click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="让我给你一些职务吧... (3)" click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="我们来较量一下吧... (3)" click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="你有兴趣组建军团吗... (...)" click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="我觉得有个这地方适合你去管理..." click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="可以跟着我么..." click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="你犯下了滔天大罪，我要将你明正典刑..." click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="我觉得监狱可能更适合你..." click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="我要立你为储君..." click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="我要让你离开我们国家..." click={()=>{
                console.log("行动")
            }}></Button>
            <Button value="我觉得有个这地方适合你去管理..." click={()=>{
                console.log("行动")
            }}></Button>
        {/if}

        <!--  region 友方角色     -->
        <Button value="我们要和贵国做些交易... (3)" click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="敝国赠送一些物资，还望贵国笑纳... (3)" click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="我国的这位人才贵国想要吗...." click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="我国的这位在贵国监狱，需要赎回来..." click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="这位人才我们也想要，你方便给我们吗 (3)" click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="贵国的军事实力如何，来一次演武吧(不撕毁盟约)" click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="看来我们友好的日子到头了(宣战)" click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="贵国可以攻打这里吗..." click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="贵国可以给敝国一些奴隶吗..." click={()=>{
            console.log("行动")
        }}></Button>
        <!--        endregion-->
        <!-- region 敌人角色 -->
        <Button value="给我立刻离开这里!" click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="我们可以停战吗?..." click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="派人看看这个军队..." click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="悄悄卧底..." click={()=>{
            console.log("行动")
        }}></Button>
        <!-- endregion -->

        <!--region 非己方角色 -->

        <Button value="我要采取政治联姻..." click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="把你们俘虏的他给我换回来..." click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="我想我们可以结交..." click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="我有些私人的话想对你们的主将谈谈..." click={()=>{
            console.log("行动")
        }}></Button>
        <Button value="我要对你们宣战..." click={()=>{
            console.log("行动")
        }}></Button>
        <!--        endregion -->
    </div>
    <audio src={bindBox.getAudio("询问")} autoplay/>

</main>

<script>
    import BindBox from "../../../../../game/characters/BindBox.js";
    import {onMount} from "svelte";
    import RefreshMapData from "../../../../stores/RefreshMapData.js";
    import Go2here from "/game/actives/go2here.js"
    import GeneralDetail from "/game/actives/GeneralDetail.js"
    import Button from "../../../functions/Button.svelte";

    export let data
    let self
    let bindBox = new BindBox(data.character);
    onMount(
        () => {
            self.querySelector(".image-army").style.backgroundImage = `url(${bindBox.getPicture()})`
        }
    )
</script>

<style lang="less">
  @width: 60px;
  .image-army {
    display: block;
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center;
  }

  .general-info {
    font-family: 楷体, serif;
    display: block;
    background: #696A6ACC;
    padding: 10px;
    color: white;
    font-size: 30px;
    font-weight: bold;

  }

  .value-show {
    display: flex;
    user-select: none;

    justify-content: center;
  }

  .value-view {
    width: @width;
    text-align: center;
    font-size: 20px;
    color: white;
    font-family: 幼圆, serif;

    img {
      display: block;
      width: @width;
      height: @width;
    }
  }

  .attack-value {
  }

</style>