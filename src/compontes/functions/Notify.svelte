<main class="notify" bind:this={self} on:click={()=>{read_info_value = ""}}>
    <div class="hidden" on:click={hidden}>{hidden_value}</div>
    <h2 class="readed">通知
        <span style="color: #5eff00">{read_info_value}</span>
    </h2>
    <div id="notify-body" >

    </div>
</main>

<script>
    import notify_value from "../../stores/notify.js";
    // import notify_value from ;
    import {onMount} from "svelte";

    let self
    let hidden_flag = false
    let hidden_value = "折叠通知"
    let read_info_value = "新通知~!! "

    function hidden(){
        if (!hidden_flag){
            self.style.height = "10px"
            self.style.overflow = "hidden"
            hidden_flag = true
            hidden_value = "展开通知"
        }else{
            self.style.height = "300px"
            hidden_flag = false
            hidden_value = "折叠通知"
        }
    }

    onMount(
        () => {
            notify_value.subscribe(
                v => {
                    let html = ""
                    if (v.type === undefined){
                        v.type = "default"
                    }
                    if (v.headimage === undefined){
                        v.headimage =   "/src/game_resource/assets/characters/旁白/pb.png"
                    }

                    html += `<div class="content-tip">&&image <p class="notify-tip ${v.type}"> ${v.value}</p></div>`
                    console.log("image"+v.headimage)
                    html = html.replace("&&image", `<img class="headimage-tip" src="${v.headimage}" />`)

                    console.log(html)

                    self.querySelector("#notify-body").innerHTML += html

                    read_info_value = "出现新通知"
                }
            )
        }
    )
</script>

<style lang="less">
    @height:50px;

    .notify {
        position: fixed;
        bottom: 20px;
        right: 35px;
        z-index: 998;
        background-image: url("../../game_resource/assets/image/paper background.png");
        border-radius: 10px;
        height: 300px;
        width: 400px;
        padding: 30px;
        font-family: 楷体;
        transition: .7s;
        box-shadow: 10px 10px 20px 20px rgba(0, 0, 0, 0.5);
    }

    .notify:active,.notify:focus{
      z-index: 1200;
    }

    #notify-body{
      overflow-y: scroll;
      height: 100%;
    }

    .hidden {
        position: absolute;
        right: 20px;
        cursor: pointer;

        &:hover {
            color: red;
        }
    }

    .notify-body {
        margin: 40px;
        overflow-y: auto;
    }
    :global(.content-tip){
        margin-top: 20px;
    }
    :global(.notify-tip){
        cursor: pointer;
        height: @height;
        position: relative;
        top: -(@height / 2) + 5;
        width: calc(100% - @height - 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }

    :global(.info){
        color: #282828;
        &:before{
            content: "提示: ";
        }
    }
    :global(.warning){
        background: #eda403;
        &:before{
            content: "警告: ";
        }
    }
    :global(.urgent){
        background: red;
        color: white;
        &:before{
            content: "注意: ";
        }
    }
    :global(.headimage-tip){
        width: @height;
        height: @height;

        vertical-align: center;
    }
</style>