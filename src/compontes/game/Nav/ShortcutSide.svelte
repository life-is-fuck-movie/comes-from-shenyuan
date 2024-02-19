<script>
    import ShowModals from "../../../stores/showModals.js";

    function show_my_general(){
        ShowModals.set({
            flag: true,
            type: "character_own",
            close: true
        })

    }
</script>
<main class="main">
  <div class="center">
      <div class="side-element">情报</div>
      <div class="side-element" on:click={show_my_general}>武将</div>
      <div class="side-element">城池</div>
      <div class="side-element">朝会</div>
      <div class="side-element">监狱</div>
      <div class="side-element">外交</div>
      <div class="side-element">国库</div>
      <div class="side-element">军队</div>
      <div class="side-element">战团</div>
  </div>
</main>

<style lang="less">
  @height: 100%;
  .main {
    position: fixed;
    z-index: 1982;
    right: 0;
    top: 0;
    height: @height;
    background: #DCC07E;
    color: #8E4A16;
    padding: 20px 0;
    box-sizing: border-box;
    max-width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .side-element{
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      background: #eda403;
    }
  }

</style>