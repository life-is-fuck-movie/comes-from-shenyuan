# ReadMe
## MapResource
> 这个JSON是设置地图上某个具体的点值的资源等数据
```js
{
    point_id: 1, // 点的ID
}
```
其他的数据存放在`localstorge`中的

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


## showModel 
交给边框展示信息的全局消息
```js
{
    type: "city", // 展示类型
    name: "xxxx" // 名称
}
```

### 地图存档信息
```js
{
    city: [
        {
            data: {
                name: "群山塔", // 名称
                belongs: "青兰", // 所属国家
                rich: "small", // 富裕程度s
            },
            site: 164 // 位置
        }

    ],
    stone: stones,
          // 所在位置有石头 如 [23, 51, 2] 位置规则同下
    wood: generateRandomNumbers(0, 1199, 200, stones), 
          // 木头资源点 所在位置有木头 
    army: [
        {
            data: {
                name: "胡桃", // 名称
                aliasName: "HuTao", // 别名 用在文件系统上的
                ranks: { // 队伍配置
                    "炮兵": 200, 
                    "士卒": 100
                },
                object: Hutao, // 主将对应的 对象
                buff: [] // 当前配置
            },
            site: 201 // 所在位置
        }
    ]
}
```