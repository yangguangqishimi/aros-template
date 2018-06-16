/**
 * Created by Tw93 on 2016/11/4.
 */
const resourceHelper = require('Utils/resourceHelper.js')
export default {

  // 正常模式的tab title配置
  tabTitles: [
    {
      title: '首页',
      icon: resourceHelper.imagePathConvert('tab1.png'),
      activeIcon: resourceHelper.imagePathConvert('tab1.png')
    },
    {
      title: '债事管理',
      icon: resourceHelper.imagePathConvert('tab2.png'),
      activeIcon: resourceHelper.imagePathConvert('tab2.png')
    },
    {
      title: '债市公告',
      icon: resourceHelper.imagePathConvert('tab3.png'),
      activeIcon: resourceHelper.imagePathConvert('tab3.png'),
      badge: 5
    },
    {
      title: '分类中心',
      icon: resourceHelper.imagePathConvert('tab4.png'),
      activeIcon: resourceHelper.imagePathConvert('tab4.png')
    },
    {
      title: '我',
      icon: resourceHelper.imagePathConvert('tab5.png'),
      activeIcon: resourceHelper.imagePathConvert('tab5.png')
    }
  ],
  tabStyles: {
    bgColor: '#FFFFFF',
    titleColor: '#666666',
    activeTitleColor: '#3D3D3D',
    activeBgColor: '#FFFFFF',
    isActiveTitleBold: true,
    iconWidth: 70,
    iconHeight: 70,
    width: 160,
    height: 120,
    fontSize: 24,
    textPaddingLeft: 10,
    textPaddingRight: 10
  },

  // 使用 iconFont 模式的tab title配置
  tabIconFontTitles: [
    {
      title: '首页',
      codePoint: '\ue623'
    },
    {
      title: '特别推荐',
      codePoint: '\ue608'
    },
    {
      title: '消息中心',
      codePoint: '\ue752',
      badge: 5
    },
    {
      title: '我的主页',
      codePoint: '\ue601',
      dot: true
    }
  ],
  tabIconFontStyles: {
    bgColor: '#FFFFFF',
    titleColor: '#666666',
    activeTitleColor: '#3D3D3D',
    activeBgColor: '#FFFFFF',
    isActiveTitleBold: true,
    width: 160,
    height: 120,
    fontSize: 24,
    textPaddingLeft: 10,
    textPaddingRight: 10,
    iconFontSize: 50,
    iconFontMarginBottom: 8,
    iconFontColor: '#333333',
    activeIconFontColor: 'red',
    iconFontUrl: '//at.alicdn.com/t/font_501019_mauqv15evc1pp66r.ttf'
  }
}
