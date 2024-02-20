
<main>

    <div class="army-detail">
        {army}  {count}
        <span class="manager-btn" on:click={
            ()=>{
                showManagerFlag = !showManagerFlag
            }
            }>
            {showManagerFlag ? "收回"  : "管理"}
        </span>
        {#if showManagerFlag}
            <br>
            <input type="range" id="slider" name="slider" min="0" max={count} bind:value={count_give}>{count_give}
            <Button value="给对面!" click={chage}></Button>
        {/if}


    </div>
</main>

<script>
    import Button from "../functions/Button.svelte";
    import ArmyChage from "../../../game/other/armyChage.js";
    import toast from "/src/stores/toast.js";

    export let army = "";
    export let count = 0;

    export let to_mode = false;// 默认方是 form

    let showManagerFlag = false;

    let count_give = 0;

    let armyChange =new  ArmyChage()

    let success_handler = false;
    let error_handler = false

    function chage(){
        let argument = {
            armyName: army,
            count: count_give,
            mode: to_mode
        }
        let ret = armyChange.do(argument)
        if(ret){
            toast.set({
                show_code: Math.random(),
                value: "成功派遣!"
            })
        }else{
            toast.set({
                show_code: Math.random(),
                value: "派遣失败!"
            })
        }

    }


</script>

<style>
    .army-detail {
        margin-top: 10px;
        border: 1px rgba(101, 101, 101, .5) solid;
        width: 150%;
        text-align: center;
        color: navy;
    }
    .manager-btn{
        color: black;
        font-weight: normal;
        font-size: 18px;
        &:hover{
            font-weight: bolder;
        }
    }
</style>