import Gloabs from "./Gloabs.js";

class gameOver{
    loser;
    winner;
    city_war; // 是否城池战
    type_get() {
        let hp_rate = parseInt((this.winner.Values.now_hp / this.winner.Values.max_hp) * 100);
        let _nige, _jail, _die, _injured;

        let godModifier = this.loser.is_god ? -5 : 0; // 神明的概率调整

        switch (true) {
            case hp_rate < 10:
                _nige = Gloabs.randomEvent(80 + godModifier);
                _jail = Gloabs.randomEvent(5 + godModifier);
                _die = Gloabs.randomEvent(5 + godModifier);
                _injured = Gloabs.randomEvent(10 + godModifier + 15); // 受伤逃跑概率增加15%
                break;
            case hp_rate < 20:
                _nige = Gloabs.randomEvent(60 + godModifier);
                _jail = Gloabs.randomEvent(10 + godModifier);
                _die = Gloabs.randomEvent(10 + godModifier);
                _injured = Gloabs.randomEvent(20 + godModifier + 15); // 受伤逃跑概率增加15%
                break;
            case hp_rate < 40:
                _nige = Gloabs.randomEvent(50 + godModifier);
                _jail = Gloabs.randomEvent(15 + godModifier);
                _die = Gloabs.randomEvent(15 + godModifier);
                _injured = Gloabs.randomEvent(20 + godModifier + 15); // 受伤逃跑概率增加15%
                break;
            case hp_rate < 60:
                _nige = Gloabs.randomEvent(40 + godModifier);
                _jail = Gloabs.randomEvent(20 + godModifier);
                _die = Gloabs.randomEvent(20 + godModifier);
                _injured = Gloabs.randomEvent(20 + godModifier + 15); // 受伤逃跑概率增加15%
                break;
            case hp_rate < 80:
                _nige = Gloabs.randomEvent(25 + godModifier);
                _jail = Gloabs.randomEvent(40 + godModifier);
                _die = Gloabs.randomEvent(25 + godModifier);
                _injured = Gloabs.randomEvent(10 + godModifier + 15); // 受伤逃跑概率增加15%
                break;
            default:
                _nige = Gloabs.randomEvent(10 + godModifier);
                _jail = Gloabs.randomEvent(50 + godModifier);
                _die = Gloabs.randomEvent(30 + godModifier);
                _injured = Gloabs.randomEvent(10 + godModifier + 15); // 受伤逃跑概率增加15%
                break;
        }

        if (_nige) {
            return this.nigerunda;
        }
        if (_jail) {
            return this.jail;
        }
        if (_die) {
            return this.die;
        }
        if (_injured) {
            return this.injured;
        }
    }



    nigerunda(){
        // 逃跑啦
        console.log("逃跑了")
    }

    die(){
       // 死啦
        console.log("死了")
    }

    jail(){
        // 被俘
        console.log("被俘了")

    }


    injured(){
        // 受伤啦
        console.log("受伤了")
    }




    task_pip(){
        // 别管 调用就是了

        // if(! this.city_war){
        //     // 不是城池
        //     let method = this.type_get() // 根据胜利方当前血量得到失败方应该触发的事件
        //     method() // 调用事件
        // }

    }
}
export default new gameOver()