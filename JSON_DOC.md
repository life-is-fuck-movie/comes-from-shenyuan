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