class Gloabs {
    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomChoose(array) {
        return array[this.getRandomInt(0, array.length - 1)];
    }

    randomChooseMany(array, count) {
        return Array.from({length: count}, () => this.randomChoose(array));
    }

    randomEvent(rate) {
        let randomNumber = Math.floor(Math.random() * 100);
        return randomNumber < rate;
    }
}

export default new Gloabs()