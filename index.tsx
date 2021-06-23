import React from 'react';
import {ScrollView, TouchableOpacity, Text, View, StyleSheet} from 'react-native';
// @ts-ignore
import {scaleSize, scaleFont, deviceWidth} from 'react-native-size-zoom';

interface Props {
  defaultSelected?: number; // 默认选中的菜单索引
  navStyle?: object; // 外容器样式
  items: any[]; // 数据列表
  onClick: (item: object, index: number) => void; // 点击事件
  animated?: boolean; // 是否有动画
  // font
  fontSizeActive?: number; // 选中的字体大小
  fontSizeDefault?: number; // 默认的字体大小
  fontWeightBoldActive?: boolean; // 选中字体是否增粗
  fontColorActive?: string; // 选中的字体颜色
  fontColorDefault?: string; // 默认的字体颜色
  // border
  isBorderBottom?: boolean; // 菜单是否有底边border
  borderBottomColorActive?: string; // 被选择的菜单border颜色
  borderBottomWidthActive?: number; // 被选中的菜单border宽度
  // horizontal
  horizontal?: boolean; // 是否横向
  portraitHeight?: number; // 菜单纵向高度
  horizontalWidth?: number; // 横向宽度
  menuStyle?: object;
}

interface State {
  current?: number;
}

class ScrollTabMenu extends React.Component<Props, State> {
  static defaultProps = {
    defaultSelected: 0,
    animated: true,
    navStyle: {},
    items: [],
    horizontal: true,
    fontSizeActive: scaleFont(12),
    fontSizeDefault: scaleFont(10),
    fontWeightBoldActive: true,
    fontColorActive: '#f3916b',
    fontColorDefault: '#666666',
    isBorderBottom: true,
    borderBottomColorActive: '#f3916b',
    borderBottomWidthActive: scaleSize(3),
    portraitHeight: scaleSize(88),
    horizontalWidth: deviceWidth,
    menuStyle: {
      height: scaleSize(88)
    }
  };
  private scrollViewRef: any;
  private menuWidthSum: number;
  private menuWidthArr: any[];
  constructor(props: Props) {
    super(props);
    this.scrollViewRef = null;
    // 导航栏的总宽度
    this.menuWidthSum = 0;
    // 导航栏的宽数组
    this.menuWidthArr = [];
    this.state = {
      current: 0
    };
  }
  componentDidMount(): void {
    const {defaultSelected} = this.props;
    this.setState({current: defaultSelected}, () => {
      setTimeout(() => {
        // @ts-ignore
        this.onMenuAutoScroll(defaultSelected);
      }, 200);
    });
  }
  componentDidUpdate(prevProps: Props) {
    // @ts-ignore
    this.onMenuAutoScroll(this.state.current);
  }
  onClickMenus = (item: object, index: number) => {
    this.props.onClick(item, index);
    this.setState({current: index}, () => {
      // this.onMenuAutoScroll(index);
    });
  };
  onMenuLayout = (e: any) => {
    const {horizontal} = this.props;
    const {width, height} = e.nativeEvent?.layout;
    const menuWidth = horizontal ? width : height;
    this.menuWidthSum += menuWidth;
    this.menuWidthArr.push(menuWidth);
  };
  onMenuAutoScroll = (index: number) => {
    const {animated, horizontalWidth, portraitHeight, horizontal} = this.props;
    // 取到菜单数组
    const menuWidthArr = this.menuWidthArr;
    // 步进的距离,初始值设置为 0
    let scrollDistance = 0;
    // 获得屏幕宽度
    const screenWidth: any = horizontal ? horizontalWidth : portraitHeight;
    // 获取导航栏的总宽度
    const navAllWidth = this.menuWidthSum;
    // 获取的当前被选中菜单的宽度
    const menuWidth = menuWidthArr[index];
    // 对比的差值
    const difference = (screenWidth - menuWidth) / 2;
    // 当前菜单的左位移
    const curMenuLetPosition = this.onCurMenuLetPosition(menuWidthArr, index);
    // - 菜单执行自动滚动时的核心算法 -
    if (curMenuLetPosition <= difference) {scrollDistance = 0}
    else if (difference - curMenuLetPosition <= screenWidth - navAllWidth) {scrollDistance = screenWidth - navAllWidth}
    else {scrollDistance = difference - curMenuLetPosition}
    // 菜单执行自动滚动动画
    const objs = horizontal ? {x: (-scrollDistance), y: 0} : {x: 0, y: (-scrollDistance)};
    this.scrollViewRef?.scrollTo({...objs, animated});
  };
  onCurMenuLetPosition (arr: any[], value: number) {
    let sums = 0;
    arr.reduce((prev, cur, i) => {if(i === 0) {sums = 0} if(i < value) {sums += cur}}, 0);
    return sums;
  }
  render(): React.ReactNode {
    const {
      navStyle,
      items,
      horizontal,
      fontSizeActive,
      fontSizeDefault,
      fontWeightBoldActive,
      fontColorActive,
      fontColorDefault,
      isBorderBottom,
      borderBottomColorActive,
      borderBottomWidthActive,
      portraitHeight,
      horizontalWidth,
      menuStyle
    } = this.props;

    if (items && items.length === 0) {return null;}

    const elements: any[] = [];
    const {current} = this.state;

    items.forEach((item, index) => {
      const condition = index === current;
      const borderBottomColor = condition ? borderBottomColorActive : 'transparent';
      const borderBottomWidth = condition ? borderBottomWidthActive : 0;
      const viewBorderBottom = isBorderBottom ? {borderBottomColor, borderBottomWidth} : {};

      elements.push(
        <TouchableOpacity
          key={index + '-menu'}
          activeOpacity={1}
          onPress={() => this.onClickMenus(item, index)}
        >
          <View
            onLayout={e => this.onMenuLayout(e)}
            style={[
              styles.cateNavItem,
              {flexDirection: horizontal ? 'row' : 'column'},
              horizontal ? {paddingHorizontal: scaleSize(20)} : {paddingVertical: scaleSize(20)},
              viewBorderBottom,
              menuStyle
            ]}
          >
            <Text
              style={[
                {fontSize: condition ? fontSizeActive : fontSizeDefault},
                {color: condition ? fontColorActive : fontColorDefault},
                fontWeightBoldActive && {fontWeight: condition ? 'bold' : '400'},
              ]}
            >
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View style={[
        styles.nav,
        {height: portraitHeight, width: horizontalWidth},
        navStyle,
        {flexDirection: horizontal ? 'row' : 'column'}
      ]}>
        <ScrollView
          pagingEnabled={false}
          horizontal={horizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.menuBox}
          ref={ref => this.scrollViewRef = ref}
        >
          {elements}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  nav: {
    position: 'relative'
  },
  menuBox: {
    flex: 1,
    position: 'relative'
  },
  cateNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleSize(20)
  }
});
export default ScrollTabMenu;
