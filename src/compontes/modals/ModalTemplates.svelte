
{#if show_modal}
    <main class="main">
        <div class="quit" on:click={ _ => {
            ShowModals.set({flag: false, type: "", data: void 0});
        }}></div>
        <div class="body">
            {#if modal_type === "character"}
                <div class="title">武将 & 部队</div>
                <GeneralDetail  character_instance={data}/>
            {/if}
        </div>
    </main>
{/if}
<script>

    import ShowModals from "/src/stores/showModals.js";
    import GeneralDetail from "./children/GeneralDetail.svelte";

    let show_modal = true
    let modal_type = null
    let data = void 0

    ShowModals.subscribe(
        v => {
            show_modal = v.flag
            modal_type = v.type
            data = v.data
        }
    )
</script>

<style lang="less">
  .main {
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
</style>

