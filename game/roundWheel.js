class roundWheel {
    // 滑动时间轮
    tasks_bus = [{
        round: [1],
        run: function () {
            console.log('时间轮,启动！');
        },
        type: this.TYPE.BEFORE
    }]; // 任务总线

    TYPE = {
        BEFORE: "before", // 回合最开始之前
        AFTER: "after", // 回合最开始后
        BEFORE_ME: "before_me", // 玩家开始之前
        AFTER_ME: "after_me", // 玩家开始之后
        BEFORE_HOS: "before_hos", // 敌方开始之前
        AFTER_HOS: "after_hos", // 敌方开始之后
        BEFORE_CHARACTER(character) {
            return "before_" + character.ID;
        }, // 指定角色开始之前
        AFTER_CHARACTER(character) {
            return "after_" + character.ID;
        } // 指定角色开始之后
    }

    RoundMakePolicy = {
        sustain: (sustain_round) => {
            let rounds = []

            for (let i = 1; i <= sustain_round; i++) {
                rounds.push(this.round + i); // 预设 i 回合之后
            }

            return rounds;
        }, // 持续
        specify: "specify" // 指定
    }


    round = 1; // 默认从第一个回合开始

    active_tasks(task_type) {
        for (let task of this.tasks_bus) {
            if (task.round.includes(this.round) && task_type === task.type) {
                // 当前回合和是触发任务的时候并且 任务类型和触发的一样的时候
                task.run(); // 启动!
            }
        }
    }

    next_round() {
        this.round++;
        this.active_tasks();
    }

    register_task(task_method, task_type, rounds) {

    }
}

export default new roundWheel();