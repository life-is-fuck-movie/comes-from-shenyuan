<div>
    <h2 class="title">
        {character_from.Name} PK {character_to.Name}
    </h2>
    <div class="status">
        {#key character_from}
            <div class="info-status left-info-status">
                <div>{character_from.Name} {character_from.badge}</div>
                <Strip
                        max_value={character_from.Values.max_hp}
                        now_value={character_from.Values.now_hp}
                        strip_width="90%"

                        front_color="lightgreen"
                        show_value={true}
                />
                <div>攻击: {character_from.Values.attack}</div>
                <div>防御: {character_from.Values.defense}</div>
            </div>
        {/key}

        {#key character_to}
            <div class="info-status">
                <div>{character_to.Name} {character_to.badge}</div>
                <Strip
                        max_value={character_to.Values.max_hp}
                        now_value={character_to.Values.now_hp}
                        key="{character_from.Values.now_hp}"

                        strip_width="90%"
                        front_color="red"
                        show_value={true}
                />
                <div>攻击: {character_to.Values.attack}</div>
                <div>防御: {character_to.Values.defense}</div>
            </div>
        {/key}


    </div>
    <div class="policy">
        <div class="body">
            <div class="war-info">
                {character_from.Name} , {character_to.Name}开始战斗... <br>
                {@html war_info_html}
            </div>
            {#if (show_skill !== null)}
                <div class="skill-info">
                    <h1>{show_skill.event}</h1>
                    <h2>伤害: {show_skill.damage}</h2>
                    <h3 class="skill-description">
                        {show_skill.description}
                    </h3>
                    <Button value="释放" click={
                    ()=>{
                        trigger_skill()
                    }
                    }/>

                </div>
            {/if}
        </div>
        <div class="selector">
            {#each policies as a}
                <Button value="{a[0]}" click="{()=>{
                    render_policy(a[1])
                    policies = []
                    render_skill()
                }}"/>
            {/each}

            {#each player_skills as a}
                <Button click="{()=>{render_skill_description(a)}}" value="{a.event}"/>
            {/each}
        </div>
    </div>
</div>

<script>

    import {onMount} from "svelte";
    import Strip from "../../../functions/Strip.svelte";
    import Button from "../../../functions/Button.svelte";
    import warManager from "../../../../../game/actives/WarManager.js";
    import warEffectTigger from "../../../../../game/actives/WarEffectTigger.js";
    import Tags from "../../../functions/Tags.svelte";
    import skillDict from "../../../../../game/skills/SkillDict.js";

    export let native_data; // 原始数据

    let character_from = native_data.form_character;
    let character_to = native_data.to_character;

    let player_skills = [];

    // region 恢复原数据的记录
    let native_from = {
        hp: {
            now: character_from.Values.now_hp,
            max: character_from.Values.max_hp,
        },
        mp: {
            now: character_from.Values.now_mp,
            max: character_from.Values.max_mp,
        },
        attack: character_from.Values.attack,
        defense: character_from.Values.defense
    }
    let native_to = {
        hp: {
            now: character_to.Values.now_hp,
            max: character_to.Values.max_hp,
        },
        mp: {
            now: character_to.Values.now_mp,
            max: character_to.Values.max_mp,
        },
        attack: character_to.Values.attack,
        defense: character_to.Values.defense
    }
    // endregion

    let policies = [["", () => {
    }]]

    let war_info_html = ""
    let war_context = [] // 战斗的上下文
    let show_skill = null

    function render_policy(policy_event) {
        let {info, status, context} = policy_event();

        war_info_html += "<br>" + info;
        war_context.push(context)

        let characters = warEffectTigger.effectTrigger(status, character_from, character_to)
        character_from = characters[0]
        character_to = characters[1]
    }
    function render_color(value){
        value = value.replace("{render:self}", `<span class="self-character" style="color: #5eff00;padding: 0 10px;display: inline-block;">${character_from.Name}</span>`)
        value = "<br />" + value
        return value
    }
    function war_render(war_policy) {
        let effect_data = war_policy();

        let value = effect_data.info;
        value = render_color(value)
        war_info_html += value
        policies = effect_data.policies;


    }


    function render_skill_description(skill) {
        show_skill = skill
    }

    function render_skill() {
        player_skills = [
            character_from.SkillsName.SkillA,
            character_from.SkillsName.SkillB,
            character_from.SkillsName.SkillC,
            character_from.SkillsName.SkillD,
        ]
    }

    function trigger_skill(){
        let skill_name = show_skill.function_name;
        let array_characters = skillDict[skill_name](character_from, character_to);

        let value = array_characters.value
        value = render_color(value)
        war_info_html += value

        array_characters = array_characters.characters
        character_from = array_characters[0]
        character_to = array_characters[1]

        console.log(character_from.Values.attack)
    }

    onMount(
        _ => {
            war_render(warManager.policy_select)
        }
    )


</script>

<style lang="less">
  .left-info-status {
    border-right: 2px slategray solid;
    margin-right: 10px;
  }

  .info-status {
    width: 45%;
  }

  .body {
    display: flex;
    margin: 40px 0px;

    div {
      width: 50%;
    }
  }

  .title {
    font-style: italic;
    text-align: center;
  }

  .status {
    display: flex;
    justify-content: center;
  }

  .war-info {
    padding: 20px;
    box-sizing: border-box;
    line-height: 40px;
    overflow: auto;
    font-weight: normal;
    color: red;
    height: 40vh;
    max-height: 40vh;

  }

  .selector {
    display: flex;
    position: absolute;
    bottom: 10px;
    justify-content: center;
    align-items: center;
    width: 95%;
  }

  .selector :global(.my-button) {
    width: fit-content !important;
    padding: 0 20px;
    margin-left: 30px !important;
  }

  .skill-info {
    font-family: "华文中宋", "幼圆", serif;

    .skill-description {
      margin: 20px 0px;
      color: #1A262F;

    }

  }


</style>