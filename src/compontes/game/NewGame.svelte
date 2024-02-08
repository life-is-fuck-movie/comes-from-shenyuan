<script>
    import {onMount} from "svelte";
    import ShowModals from "../../stores/showModals.js";

    onMount(
        _ => {
            let power = localStorage.getItem("player-power")
            if (power === null){
                // 没有新建游戏!
                ShowModals.set({
                    flag: true,
                    type: "new_game",
                    close: false
                })
            }
        }
    )
</script>