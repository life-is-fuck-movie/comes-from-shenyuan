<main>
    <button class="my-button" on:click={click} >{value}</button>
</main>

<script>
  export let value
  export let click

</script>

<style lang="less">
    .my-button{
      width: 80%;
      margin: 10px auto ;
      height: 50px;
      color: saddlebrown;
      font-size: 20px;
      background: #dcc07e;
      outline: none;
      border: none;
      display: block;
      cursor: pointer;
      font-family: 楷体,serif;
      &:hover{
        background: #dfb856;
      }
    }
</style>