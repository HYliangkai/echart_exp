## 使用手册
0. 本项目运行环境 :`node v16`
1. `centos`
  1. 要先安装依赖:`sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel`
  2. gcc版本必须高于9.2
  3. [解决/lib64/libstdc++.so.6: version `CXXABI_1.3.9' not found](https://www.cnblogs.com/astonc/p/16660844.html)
  4. [解决/usr/lib64/libstdc++.so.6: version `GLIBC_2.18' not found](https://www.cnblogs.com/astonc/p/16660844.html)
2. 然后进入本项目执行:`npm install`,安装项目依赖
3. 最后执行 `npm run start` or `node ./index.js` 均可完成图片导出

## Option的配置
+ 默认字体为`微软雅黑`
```json
{
  "output": "/Users/chzky/Code/work/chart.jpg",//图片保存的位置
  "width": 1462,//图片宽度
  "height": 432,//图片高度
  "fontsize": 16,//基准字体大小
  "linelegend":true,//图例是否只使用线条表示
  "x": {
    "name": "日期(年-月-日)",//x轴的名称
    "min": 1659283201020,//最小值(时间戳)
    "max": 1661907201020//最大值(时间戳)
  },
  "y": {
    "name": ["倾斜角度（°）"],//y轴的名称,最多存放两个名称,分别是['左侧名称','右侧名称']
    "min": -0.05,//y轴最小值
    "max": 0.05,//y轴最大值
    "interval": 0.025//y轴间隔,决定了y轴的刻度个数和刻度间隔
  },
  "series": [//数据,有多少条数据存放多少个Object,配置完全参考echart[https://echarts.apache.org/v4/zh/option.html#series]
    {
      "name": "AT9-1-X",//数据列名称,用于图例名称的显示
      "type": "line",//显示的类型
      "symbol": "triangle",//显示点的形状 可选值有: 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      "lineStyle": {
        "width": 1//线条粗细
      },
      "data":[//数据
        [1659283201020, 0.11],//时间戳+value
        {"value":[1659283201022, 0.22], "symbol": "circle", "symbolSize": 8}//在"symbol": "none"的情况下要单独显示这个点的symbol
      ]
    }
  ]
}
```