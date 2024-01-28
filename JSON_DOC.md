# ReadMe
## MapResource
> 这个JSON是设置地图上某个具体的点值的资源等数据
```js
{
    point_id: 1, // 点的ID
    rich_value: 20, // 丰饶度 (0 - 100)
    type: "default", //地图的类型
    role: [], // 在上面的角色
    buff: [], // 所处位置的Buff
    build: [], // 所处位置的建筑
    belong: "" // 所处位置所属国度
    ... // 补充
}
```

## 通知JSON
```js
{
    type:"info",
    value: "游戏初始化完毕！",
    headimage: "../image.png" ,// 可选
    onclick(){
    }// 通知的点击事件
}
```

### type包含:
- info
  - 灰色提示， 一般是小提示
- warning
  - 黄色提示，一般是警告
- urgent 
  - 红色提示，一般是重大提示
- [default]
  - 一般提示
