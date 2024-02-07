<main bind:this={self} class="main">
    <div class="child">
        {#if show_value}
            {now_value}
        {/if}
    </div>
    <div class="maxvalue">
        {#if show_value}
            {max_value}
        {/if}
    </div>
</main>



<script>
    import {onMount} from "svelte";

    let self;
    export let strip_width; // 条带的宽
    export let max_value; // 最大值
    export let now_value; // 当前的值
    export let back_color// 背景颜色
    export let front_color// 前景颜色
    export let show_value = false // 是否展示

    onMount(
        _ => {
            self.style.width = strip_width; // 设置宽度
            let rate = now_value / max_value
            let int_strip_width = strip_width.replace("px", "").replace("%", "")
            let child_dom = self.querySelector(".child")
            console.log(self.querySelector(".child"))
            int_strip_width = parseInt(int_strip_width)

            child_dom.style.width = (rate * 100) + "%"

            if (front_color !== undefined) {
                child_dom.width = (rate * 100) + "%"
                child_dom.style.background = front_color
            }
            if (back_color !== undefined) {
                self.style.background = back_color
            }
        }
    )
</script>


<style>
    .main {
        height: 20px;
        background: #282828;
    }

    .child {
        background: red;
        height: 100%;
        text-align: right;
        padding-right: 10px;
        box-sizing: border-box;
    }

    .maxvalue{
        float: right;
        position: relative;
        top: -20px;
        left: 30px;
        color: red;
    }
</style>