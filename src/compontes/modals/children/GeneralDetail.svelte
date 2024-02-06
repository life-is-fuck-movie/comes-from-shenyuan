<main bind:this={self}>
    {#if error.no_character}
        <h1> 错误! 没有对应的角色信息!</h1>
    {/if}

    <div class="general_image"></div>
    <div class="general_value">
        <h2 class="general_name">
            {character_instance.Name}
        </h2>
        <h4 class="general_say">
            这是我在说话...
        </h4>

        <div class="value-show">
                    <div class="value-show-item">
                <span class="value-show-item-name">生命值</span>
                <span class="value-show-item-value">{character_instance.Values.max_hp}</span>
            </div>
            <div class="value-show-item">
                <span class="value-show-item-name">攻击力</span>
                <span class="value-show-item-value">{character_instance.Values.max_mp}</span>
            </div>
        </div>
    </div>
</main>

<script>
    import {onMount} from "svelte";
    import BindBox from "../../../../game/characters/BindBox.js";

    let error = {
        "no_character": false
    }

    export let character_instance;

    let self;
    let character_bind_box;

    function RenderCharacter() {
        let image_dom = self.querySelector(".general_image")
        character_bind_box = new BindBox(character_instance);
        console.log(image_dom, character_bind_box.getPicture())
        image_dom.style.backgroundImage = `url(${character_bind_box.getPicture()})`
    }

    onMount(
        _ => {
            error.no_character = (character_instance === void 0)
            if (!error.no_character) {
                // 有角色数据
                RenderCharacter();
            }
        }
    )
</script>

<style lang="less">
  .general_image {
    width: 300px;
    height: 500px;
    background-size: cover;
    margin: 20px;
    float: left;
  }
  .general_value{
    float: left;
    width: calc(100% - 400px);
    margin: 20px;
  }

  .general_say{
    margin-top: 20px;
    font-weight: normal;
    background: rgba(187, 166, 114, 0.71);
    padding: 30px;
    border: 1px saddlebrown solid;
    font-style: italic;
    font-size: 25px;
  }
</style>

