<main class="active-power">
    <div>行动力</div>
    <div class="active-power-value">{active_power}</div>
</main>

<style lang="less">
  @size: 100px;
  .active-power {
    cursor: pointer;
    user-select: none;

    position: fixed;
    top: calc(100vh - 230px);
    z-index: 1000;
    right: 60px;

    width: @size;
    height: @size;
    background: #eda403;
    border-radius: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .active-power-value {
      font-size: 20px;
      font-weight: bold;
      margin-top: 5px;

    }
  }
</style>

<script>
    import return_value from "../../../stores/active-power-value.js";
    let activePowerValue = return_value.status
    let active_power;

    activePowerValue.subscribe(
        v => {
            active_power = v
            localStorage["active-power"] = v
        }
    )



</script>