
{#if !allow_close && show_modal}
    <div class="barrier"></div>
{/if}
{#if show_modal}
    <main class="main">
        {#if allow_close}
            <div class="quit" on:click={ _ => {
                ShowModals.set({flag: false, type: "", data: void 0});
            }}></div>
        {/if}


        <div class="body">
            {#if modal_type === "character"}
                <div class="title">武将 & 部队</div>
                <GeneralDetail character_instance={data}/>
            {/if}

            {#if modal_type === "new_game"}
                <div class="title">新建游戏</div>
                <NewGameModal/>
            {/if}

            {#if modal_type === "character_own"}
                <div class="title">我的武将</div>s
                <MyGaneral/>
            {/if}

            {#if modal_type === "army_edit"}
                <div class="title">军队编辑</div>
                <AramEdit form_character="{data.form}" manager="{data.manager}"/>
            {/if}

            {#if modal_type === "war-army"}
                <WarArmy native_data="{data}"/>
            {/if}
        </div>
    </main>
{/if}
<script>

    import ShowModals from "/src/stores/showModals.js";
    import GeneralDetail from "./children/GeneralDetail.svelte";
    import NewGameModal from "./children/NewGameModal.svelte";
    import MyGaneral from "./children/MyGaneral.svelte";
    import AramEdit from "./children/AramEdit.svelte";
    import WarArmy from "./children/Wars/WarArmy.svelte";


    let show_modal = true
    let modal_type = null
    let data = void 0
    let allow_close = true

    ShowModals.subscribe(
        v => {
            show_modal = v.flag
            modal_type = v.type
            allow_close = v.close
            data = v.data
        }
    )
</script>

<style lang="less">
  .main {
    user-select: none;
    overflow: auto;
    width: 80%;
    z-index: 999;
    position: fixed;
    top: 10%;
    height: 70%;
    background: url("../../game_resource/assets/image/paper background.png");
    background-size: cover;
    padding: 30px;
    left: 10%;
  }

  .quit {
    background-image: url("../../game_resource/assets/image/Sprites/shadedDark/shadedDark47.png");
    height: 40px;
    width: 40px;
    background-size: 100% 100%;
    float: right;

    &:hover {
      background-image: url("../../game_resource/assets/image/Sprites/shadedLight/shadedLight47.png");
    }


  }

  .body {
    margin-top: 40px;
    font-family: 楷体, serif;
    font-size: 20px;
    color: #282828;
    font-weight: bolder;
  }

  .barrier {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: #ffffff33;
    z-index:998;
  }


</style>

