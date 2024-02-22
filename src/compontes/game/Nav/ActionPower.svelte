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
    top: 10px;
    z-index: 9000;
    right: 20px;

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




</script>