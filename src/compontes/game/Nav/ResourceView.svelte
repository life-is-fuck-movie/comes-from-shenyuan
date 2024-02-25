<main class="main-resource">
    <div class="border"></div>
    <div class="main">
        资源
        <div class="inner">
            <img src="/src/game_resource/assets/image/wood.svg" alt="" class="icon">{res.wood}
        </div>
        <div class="inner">
            <img src="/src/game_resource/assets/image/stone.png" alt="" class="icon">{res.stone}
        </div>
        <div class="inner">
            行动力：{active_power}
        </div>
    </div>
</main>

<script>
    import return_value from "../../../stores/active-power-value.js";
    import resource from "../../../stores/resource.js";
    let activePowerValue = return_value.status
    let active_power;

    let res;

    resource.subscribe(
        v => {
            res = v
        }
    )

    activePowerValue.subscribe(
        v => {
            active_power = v
            localStorage["active-power"] = v
        }
    )

</script>

<style lang="less">
  @height: 30px;
  @back: #DCC07E;
  .main-resource {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 20%;

    color: black;
    height: @height;

    .main{
      background: @back;
      float: left;
      width: 300px;
      height: @height;
      display: flex;
      justify-content: center;
      align-items: center;

    }
    .border {
      width: 30px;
      background: @back;
      
      height: @height;
      float: left;
      border-radius: 0  0  0 100000px ;

    }
  }
  .icon{
    height: @height - 10px;
    margin-right: 10px;
  }
  .inner{
    margin-left: 20px;
  }
</style>
