let datas = {
    rich:{
        point_id: 1,
        rich_value: 100,
        type: "default",
        role: [],
        buff: [],
        build: [],
        belong: ""
    },
    poor:{
        point_id: 1,
        rich_value: 2,
        type: "default",
        role: [],
        buff: [],
        build: [],
        belong: ""
    },
    template:{
        point_id: 1,
        rich_value: 2,
        type: "default",
        role: [],
        buff: [],
        build: [],
        belong: ""
    },
    random_rich : function(code) {
        let rich = {
            point_id: code,
            rich_value: 2,
            type: "default",
            role: [],
            buff: [],
            build: [],
            belong: ""
        }
        rich.rich_value = Math.floor(Math.random() * (50  + 1)) ;
        return rich
    }
}
export default datas