class roundWheel {
    // 滑动时间轮

    tasks_signal = [] // 回合信号 这里存放着一些特殊的信号

    tasks_bus = [{
        task_name: "??",
        round: [1],
        run: function () {
            console.log('时间轮,启动！');
        },
        type: "before"
    }]; // 任务总线

    TYPE = {
        BEFORE: "before", // 回合最开始之前
        AFTER: "after", // 回合最开始后
        BEFORE_ME: "before_me", // 玩家开始之前
        AFTER_ME: "after_me", // 玩家开始之后
        BEFORE_HOS: "before_hos", // 敌方开始之前
        AFTER_HOS: "after_hos", // 敌方开始之后

        ME_HINT: "me_hint", // 我的伤害之后
        // 这个任务需要传入一参数，表示其伤害

        HOS_HINT: "hos_hint", // 敌方的伤害之后
        // 这个任务需要传入一参数，表示其伤害

        BEFORE_CHARACTER(character) {
            return "before_" + character.ID;
        }, // 指定角色开始之前
        AFTER_CHARACTER(character) {
            return "after_" + character.ID;
        }, // 指定角色开始之后

        HAS_DIE: "has_die", // 有角色死亡之后
    }

    RoundMakePolicy = {
        sustain: (sustain_round) => {
            let rounds = []

            for (let i = 1; i <= sustain_round; i++) {
                rounds.push(this.round + i); // 预设 i 回合之后
            }

            return rounds;
        }, // 持续 sustain_round 个回合
        specify: (array) => {
            let ret = [];
            for (let round_number of array) {
                if (this.round <= round_number) {
                    ret.push(round_number);
                }
            }
            return ret;
        }, // 指定 array 发生
        long: ()=>{
            return ["LONG"]
        }
    }


    round = 1; // 默认从第一个回合开始

    active_tasks(task_type, argument = null, cancel_it=false) {
        console.log("触发", task_type)
        for (let task of this.tasks_bus) {
            if ((task.round.includes(this.round) || task.round.includes("LONG")) && task_type === task.type) {
                // 当前回合和是触发任务的时候并且 任务类型和触发的一样的时候
                if (argument === null) {
                    task.run(); // 启动!
                    if (cancel_it){
                        console.log("已注销")
                        this.cancel_task(task.task_name)
                    }
                    return true
                } else {
                    task.run(argument)
                    return true
                }
            }
        }
        return false
    }

    next_round() {
        this.round++;
        this.active_tasks();
    }

    register_task(task_method = () => {
    }, task_type = this.TYPE.AFTER, rounds = [], name = "歪比巴卜") {
        let code = Math.random()
        this.tasks_bus.push({
            round: rounds,
            run: task_method,
            type: task_type,
            task_name: [name, code]
        })
        return code
    }

    /**
     * 注销任务
     * @param code_name 任务注销
     */
    cancel_task(code_name) {
        let tmp = []
        for (let task of this.tasks_bus) {
            if (!task.task_name.includes(code_name)) {
                tmp.push(task)
            }
        }
        this.tasks_bus = tmp
    }

    /**
     * 替换某个类型的task_methods
     */
    replace_task(type, task_method, round=[]) {
        let flag_in = false;
        for (let task of this.tasks_bus) {
            flag_in = task.type === task
            if (flag_in) {
                task.run = task_method
                return task.task_name[1]
            }
        }

        return this.register_task(task_method, type, round);
    }


}

export default new roundWheel();