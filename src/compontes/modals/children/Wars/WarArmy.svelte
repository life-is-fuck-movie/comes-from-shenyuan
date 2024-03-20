<div>
    <h2 class="title">
        {#key round_wheel.round}
            {character_from.Name} PK {character_to.Name} 第 {round + 1} 回合
        {/key}
    </h2>

    <div class="status">

        {#key character_from}
            <div class="info-status left-info-status">
                <div>
                    <div>【体力: {character_from.war_active}】</div>{character_from.Name} {character_from.badge}</div>
                <div>
                    兵力:<span class="show_army"
                               on:click={_=>detail_from_army_show = !detail_from_army_show}>查看</span>
                    {character_from.Status.ranks[army_from[0]]}

                    {#if detail_from_army_show}
                        {#key character_from.ReloadId}
                            <div class="detail_from" transition:fade>
                                {#each army_from as army}
                                    <li>
                                        {army}: {character_from.Status.ranks[army]}
                                    </li>
                                {/each}
                            </div>
                        {/key}
                    {/if}

                </div>
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
                <div>
                    <div>【体力: {character_to.war_active}】</div>{character_to.Name} {character_to.badge}</div>
                <div>
                    兵力: <span class="show_army" on:click={_=>detail_to_army_show = !detail_to_army_show}>查看</span>
                    {#if detail_to_army_show }

                        <div class="detail_to" transition:fade>
                            {#each Object.keys(character_to.Status.ranks) as army}
                                <li>
                                    {army}: {character_to.Status.ranks[army]}
                                </li>
                            {/each}
                        </div>
                    {/if}

                </div>

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


            <div class="war-info" bind:this={warInfoContainer}>
                {character_from.Name} , {character_to.Name}开始战斗... <br>
                {@html war_info_html}

            </div>

            {#if (show_skill !== null)}
                <div class="skill-info">
                    <h1>{show_skill.event}</h1>
                    <h2>伤害: {show_skill.damage}</h2>
                    <h3 class="skill-description">
                        {@html show_skill.description}
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
            <Button value="士兵冲锋" click="{()=>{
                use_army(character_from, character_to)
                character_from.ReloadId = Math.random()
                character_to.ReloadId = Math.random()
            }}"/>
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

    import {afterUpdate, onMount} from "svelte";
    import Strip from "../../../functions/Strip.svelte";
    import Button from "../../../functions/Button.svelte";
    import warManager from "../../../../../game/actives/WarManager.js";
    import warEffectTigger from "../../../../../game/actives/WarEffectTigger.js";
    import Tags from "../../../functions/Tags.svelte";
    import skillDict from "../../../../../game/skills/SkillDict.js";
    import roundWheel from "../../../../../game/roundWheel.js";
    import warTips from "../../../../stores/war_tips.js";
    import game_over from "../../../../../game/actives/game_over.js";
    import BindBox from "../../../../../game/characters/BindBox.js";
    import bindBox from "../../../../../game/characters/BindBox.js";
    import {fade} from "svelte/transition"
    import soldier from "../../../../../game/army/soldier.js";

    export let native_data; // 原始数据

    let character_from = native_data.form_character;
    let character_to = native_data.to_character;

    let dieTriggered = false // 是否已经触发过死亡

    let player_skills = [];

    let detail_to_army_show = false;
    let detail_from_army_show = false

    $:  army_from = Object.keys(character_from.Status.ranks);
    $:  army_to = Object.keys(character_to.Status.ranks)
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

    let round_wheel = roundWheel

    let round = 0;
    warTips.subscribe(
        (v) => {
            let tips = v.tips
            let html = render_color(tips)
            war_info_html += html
        }
    )

    function render_policy(policy_event) {
        let {info, status, context} = policy_event();

        war_info_html += "<br>" + info;
        war_context.push(context)

        let characters = warEffectTigger.effectTrigger(status, character_from, character_to)
        character_from = characters[0]
        character_to = characters[1]
    }

    let warInfoContainer;

    function scrollToBottom() {
        warInfoContainer.scrollTop = warInfoContainer.scrollHeight;
    }

    onMount(() => {
        scrollToBottom();
    });

    afterUpdate(() => {
        scrollToBottom();
    });

    function render_color(value, reversal = false) {
        if (reversal) {
            value = value.replace("{render:self}", "{render:hos_tmp}")
            value = value.replace("{render:hos}", "{render:self}")
            value = value.replace("{render:hos_tmp}", "{render:hos}")
        }
        value = value.replace("{render:self}", `<span class="self-character" style="color: #5eff00;padding: 0 10px;display: inline-block;">${character_from.Name}</span>`)
        value = value.replace("{render:hos}", `<span class="hos-character" style="color: #ff00e2;padding: 0 10px;display: inline-block;">${character_to.Name}</span>`)
        value = "<br />" + value
        return value
    }

    function use_army(_from, _to) {
        soldier.init(render_color, war_info_html) // 刷新参数
        soldier.use_army(_from, _to)
        war_info_html = soldier.war_info_html
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

    function beforeTrigger(round_wheel) {
        console.log("触发前提")
        round_wheel.active_tasks(round_wheel.TYPE.BEFORE) // 启动当前回合的所有的任务，开始的时候

    }

    function afterTrigger(round_wheel) {
        round_wheel.active_tasks(round_wheel.TYPE.AFTER) // 启动当前回合的所有的任务， 结束的时候
        round_wheel.round++;
        round++;

        console.log("-------")
        console.log(round_wheel.tasks_bus)
    }

    /**
     * 伤害AOP
     * @param round_wheel 回合轮
     * @param skill_data 释放技能详细
     * @param my_round 是否为我的回合 如果不是我的回合就是地方的技能伤害AOP
     */
    function hintTrigger(round_wheel, skill_data, my_round) {

        let has_hint = skill_data.hint !== undefined

        if (has_hint) {
            if (my_round)
                round_wheel.active_tasks(round_wheel.TYPE.ME_HINT, skill_data.hint); // 我的攻击
            else
                round_wheel.active_tasks(round_wheel.TYPE.HOS_HINT, skill_data.hint); // 敌方的攻击
        } // 是否存在攻击行为
    }

    function dieTrigger() {

        if (!dieTriggered) {
            if (character_from.Values.now_hp <= 0 || character_to.Values.now_hp <= 0) {
                dieTriggered = true; // 触发结束
                round_wheel.active_tasks(round_wheel.TYPE.HAS_DIE)
            }
        }
    }

    function trigger_skill() {
        let skill_name = show_skill.function_name;

        beforeTrigger(round_wheel)
        dieTrigger()

        let bindbox = new BindBox(character_from)
        try {
            bindbox.can_use_skill(skill_name)
        } catch (e) {
            alert(e.message)
            return
        }


        let array_characters = skillDict[skill_name](character_from, character_to, {round_wheel: round_wheel});
        character_from.war_active -= 1
        let array_character = array_characters.characters
        character_from = array_character[0]
        character_to = array_character[1]


        character_from.skill_history.push(skill_name) // 技能释放结束后就放在技能表中
        dieTrigger()

        let skill_data = array_characters.data;
        hintTrigger(round_wheel, skill_data, true)
        dieTrigger()


        let value = array_characters.value
        value = render_color(value)
        war_info_html += value


        // 电脑攻击环节
        let hos_bindBox = new bindBox(character_to);
        let policy = hos_bindBox.AISkill()
        let function_name = policy.policy({
            self: character_to,
            hos: character_from
        })

        array_characters = skillDict[function_name](character_to, character_from, {round_wheel: round_wheel}); // AI 释放技能

        array_character = array_characters.characters
        character_from = array_character[1] // AI 世界是反的
        character_to = array_character[0]

        character_to.skill_history.push(function_name) // AI技能释放结束后就放在技能表中
        dieTrigger()

        skill_data = array_characters.data;
        hintTrigger(round_wheel, skill_data, false)
        dieTrigger()

        afterTrigger(round_wheel)
        dieTrigger()


        value = array_characters.value
        value = render_color(value, true)
        war_info_html += value


    }

    function resurrectionTrigger() {

        // 判断是否复活
        let flag = null
        let token
        if (character_to.is_die)
            token = `re_life${character_to.ID}`;
        else
            token = `re_life${character_from.ID}`;

        flag = round_wheel.tasks_signal.includes(token)
        round_wheel.active_tasks(token, null) // 触发复活后注销
        round_wheel.tasks_signal.splice(round_wheel.tasks_signal.indexOf(token), 1)
        console.log("s", flag)
        return flag;
    }

    function gameover() {
        // TODO 游戏结束 角色死亡一个
        let has_resurrection = resurrectionTrigger() // 复活判断

        if (has_resurrection) {
            dieTriggered = false // 复活之后又要重新触发死亡机制了
            alert("角色复活")
            return
        }

        game_over.city_war = false

        if (character_to.is_die) {
            game_over.loser = character_to
            game_over.winner = character_from
        } else {
            game_over.loser = character_from
            game_over.winner = character_to
        }

        game_over.task_pip() // 全局的
        war_info_html += "游戏结束"

    }

    onMount(
        _ => {
            war_render(warManager.policy_select)
            round_wheel.replace_task(round_wheel.TYPE.HAS_DIE, gameover, round_wheel.RoundMakePolicy.long()); // 游戏死亡轮回
            soldier.init(render_color, war_info_html) // 注册中心登记参数

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
    background-color: #1A262FCC;

  }

  .war-info::-webkit-scrollbar {
    width: 10px;
  }

  .war-info::-webkit-scrollbar-thumb {
    background-color: #1A262F; /* 滚动条拖动部分的背景色 */
    border-radius: 5px; /* 滚动条拖动部分的圆角 */
  }

  .selector {
    display: flex;
    position: sticky;
    bottom: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .selector :global(.my-button) {
    width: fit-content !important;
    padding: 0 20px;
    margin-left: 30px !important;
  }

  .skill-info {
    font-family: "华文中宋", "幼圆", serif;
    padding: 20px;
    box-sizing: border-box;
    position: relative;

    max-height: 33vh;
    transition: 1s;

    overflow: auto;

    .skill-description {
      margin: 20px 0px;
      color: #1A262F;
    }


    &:hover {
      animation-name: show;
      animation-duration: 10s;
      animation-iteration-count: infinite;
    }


  }

  @keyframes show {
    0% {
      transform: rotate3d(360, 360, 360, 0deg);

    }
    25% {
      transform: rotate3d(360, 360, 360, -5deg);

    }
    50% {
      transform: rotate3d(360, 360, 360, 5deg);
    }
    75% {
      transform: rotate3d(360, 360, 360, -5deg);
    }
    100% {
      transform: rotate3d(360, 360, 360, 0deg);

    }
  }

  .show_army {
    &:hover {
      color: darkred;
    }
  }

</style>