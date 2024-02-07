<main bind:this={self} class="main">
    {#if error.no_character}
        <h1> 错误! 没有对应的角色信息!</h1>
    {/if}

    <div class="general_image"></div>
    <div class="general_value">
        <h2 class="general_name">
            {character_instance.Name}
        </h2>
        {#if character_bind_box}
            <audio src={character_bind_box.getAudio("军队详情")}  autoplay/>
        {/if}
        <div class="value-show">
            <div class="value-show-item">
                <span class="value-show-item-name">生命值</span>
                <Strip
                        max_value={character_instance.Values.max_hp}
                        now_value={character_instance.Values.now_hp}
                        strip_width="90%"
                        front_color="lightgreen"
                        show_value={true}
                />
            </div>
            <br><br>
            <div class="value-show-item">
                <span class="value-show-item-name">技能点</span>
                <Strip
                        max_value={character_instance.Values.max_mp}
                        now_value={character_instance.Values.now_mp}
                        strip_width="90%"
                        front_color="lightblue"
                        show_value={true}
                />
            </div>

            {#if buffs}
                {#each buffs as a}
                    <Tags tag_name={a[0]} tag_description={a[1]}></Tags>
                {/each}
            {/if}


        </div>

    </div>
    <div class="army_manager">
        <ManagerArmy character={character_instance}/>
    </div>
</main>

<script>
    import {onMount} from "svelte";
    import BindBox from "../../../../game/characters/BindBox.js";
    import Strip from "../../functions/Strip.svelte";
    import Tags from "../../functions/Tags.svelte";
    import ModalTemplates from "../ModalTemplates.svelte";
    import ManagerArmy from "../../modals_elements/ManagerArmy.svelte";

    let error = {
        "no_character": false
    }

    export let character_instance;

    let self;
    let character_bind_box;
    let buffs;

    function RenderCharacter() {
        let image_dom = self.querySelector(".general_image")
        character_bind_box = new BindBox(character_instance);
        buffs = character_bind_box.GetBuffsWithDescription()
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
    width: 20%;
    height: 300px;
    background-size: cover;
    background-position: center;
    margin: 20px;
    float: left;
  }

  .general_value {
    float: left;
    width: 30%;
    margin: 20px;
  }

  .army_manager {
    float: left;
    width: 30%;
    height: 100%;
    overflow: auto;
  }

  .general_say {
    margin-top: 20px;
    font-weight: normal;
    background: rgba(187, 166, 114, 0.71);
    padding: 30px;
    border: 1px saddlebrown solid;
    font-style: italic;
    font-size: 25px;
  }

  .general_image {
    height: 100%;
  }

  .value-show {
    margin-top: 60px;

  }

  .main {
    height: calc(70vh - 100px);
  }

  @media screen and (max-width: 1300px) {
    .general_value {
      width: 40%
    }

    .general_image {
      display: none;
    }

    .army_manager {
      float: left;
      width: 50%;
    }
  }

</style>

