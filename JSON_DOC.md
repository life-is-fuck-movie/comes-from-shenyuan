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