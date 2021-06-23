# react-native-scroll-tab-menus
基于 react native ScrollView 封装的横向或纵向滚动菜单切换
```javascript
npm install react-native-scroll-tab-menus -S
```
```javascript
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScrollTabMenu from 'react-native-scroll-tab-menus';

export default class Test extends React.Component {
   constructor(props: Props) {
    super(props);
    this.state = {
      items: [
        {id: '1', name: '推荐'},
        {id: '2', name: '热榜'},
        {id: '3', name: '情感'},
        {id: '4', name: '手机'},
        {id: '5', name: '要闻'},
        {id: '6', name: '问答'},
        {id: '7', name: '抗疫'},
        {id: '8', name: '软件'},
        {id: '9', name: '动漫'},
        {id: '10', name: '音乐'},
        {id: '11', name: '彩票'},
        {id: '12', name: '娱乐'},
      ],
    };
  }
  onClick = (item, index) => {
    console.log(item, index);
  };
  render() {
    const {items} = this.state;
    return (
      <View style={styles.content}>
        {/*横向*/}
        <ScrollTabMenu
          items={items}
          onClick={this.onClick}
          defaultSelected={4}
        />
        {/*纵向*/}
        <ScrollTabMenu
          items={items}
          onClick={this.onClick}
          defaultSelected={4}
          horizontal={false}
          portraitHeight={400}
          horizontalWidth={80}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    position: 'relative'
  }
});
```
## props
| Name                           | Type                    | Default                   | Description                                                                      |
| ------------------------------ | ----------------------- | ------------------------- | -------------------------------------------------------------------------------- |
| defaultSelected                | ?number                 | 0                         | 默认选中的菜单索引                                                                 |
| navStyle                       | ?object                 | {}                        | 外容器样式                                                                        |
| items                          | any[]                   | []                        | 数据列表                                                                          |
| onClick                        | (item, index) => void   |                           | 菜单点击事件                                                                      |
| animated                       | ?:boolean               | true                      | 是否有滚动动画                                                                    |
| fontSizeActive                 | ?:number                | [scaleFont](https://github.com/qqwq3/react-native-size-zoom)(12)             | 选中的字体大小                                                                    |
| fontSizeDefault                | ?:number                | [scaleFont](https://github.com/qqwq3/react-native-size-zoom)(10)             | 默认的字体大小                                                                    |
| fontWeightBoldActive           | ?:boolean               | true                      | 选中字体是否增粗                                                                   |
| fontColorActive                | ?:string                | #f3916b                   | 选中的字体颜色                                                                     |
| fontColorDefault               | ?:string                | #666666                   | 默认的字体颜色                                                                     |
| isBorderBottom                 | ?:boolean               | true                      | 菜单是否有底边border                                                               |
| borderBottomColorActive        | ?:string                | #f3916b                   | 被选择的菜单border颜色                                                             |
| borderBottomWidthActive        | ?:number                | [scaleFont](https://github.com/qqwq3/react-native-size-zoom)(3)              | 被选中的菜单border宽度                                                             |
| horizontal                     | ?:boolean               | true                      | 是否横向                                                                           |
| portraitHeight                 | ?:number                | [scaleFont](https://github.com/qqwq3/react-native-size-zoom)(88)             | 菜单纵向高度                                                                       |
| horizontalWidth                | ?:number                | deviceWidth               | 菜单横向宽度                                                                    |
| menuStyle                      | ?:object                | {height: [scaleFont](https://github.com/qqwq3/react-native-size-zoom)(88)}   | 菜单样式                                                                    |
