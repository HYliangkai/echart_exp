const echarts = require('echarts')
const {createCanvas} = require('canvas')
/** echart版本必须得4.9.0,不然有时间显示bug */

const option = require('./option.json')

//改写Canvas创建函数
echarts.setCanvasCreator(() => {
  return createCanvas(100, 100)
})

const chart_option = {
  backgroundColor: '#ffffff',
  color: [
    '#c23531',
    '#3070b7',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3',
  ],
  /** X,Y轴的标题 */
  title: [
    ...option.y.name.map((item, index) => {
      return {
        text: item, //
        textStyle: {fontWeight: 'bold', fontFamily: 'Times New Roman', fontSize: 18},
        top: '4%',
        ...(index === 0 ? {left: '2.5%'} : {right: '2.5%'}),
      }
    }),
    {
      text: option.x.name, //
      textStyle: {fontWeight: 'bold', fontFamily: 'Times New Roman', fontSize: 18},
      right: '2%',
      bottom: '2%',
    },
  ],

  /** 整体布局 */
  grid: {
    show: true,
    left: '5%',
    right: '5%',
    borderColor: '#333',
  },

  /** 图例 */
  legend: {
    top: '4%',
    ...(option.linelegend ? {icon: 'line'} : {}), //是否显示直线
    itemWidth: 50,
    itemHeight: 10,
    itemStyle: {},
    textStyle: {
      fontFamily: 'Times New Roman',
      fontSize: option.fontsize,
      color: '#333',
    },
  },

  xAxis: [
    /**  下X轴(主X轴) */
    {
      position: 'bottom',
      type: 'time',
      min: option.x.min,
      max: option.x.max,
      interval: 3600 * 24 * 999 * 5,

      /** 刻度线 */
      axisTick: {
        length: 8,
        show: true,
        inside: true,
      },

      /** 轴线 */
      axisLine: {
        show: true,
        onZero: false,
        lineStyle: {
          color: '#333',
        },
      },

      /** 轴标签 */
      axisLabel: {
        showMaxLabel: true, //显示尾轴
        showMinLabel: true, //显示头轴
        formatter: function (value, index) {
          // 格式化成  年-月-日，只在第一个刻度显示年份
          var date = new Date(value)
          var texts = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
          return texts.join('-')
        }, // 得到的 label 形如：'2020-12-02'
        textStyle: {
          fontFamily: 'Times New Roman',
          fontSize: option.fontsize,
          color: '#333',
        },
      },

      /** 网格线 */
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
        },
      },
    },
    /**  上X轴(副X轴,不用于显示) */
    {
      position: 'top',
      type: 'time',
      /** @note 此处数据要和上面保持一致才能显示刻度线 */
      min: option.x.min,
      max: option.x.max,
      interval: 3600 * 24 * 999 * 5,
      axisTick: {
        length: 8,
        show: true,
        inside: true,
      },
      axisLine: {
        show: true,
        onZero: false,
        lineStyle: {
          color: '#333',
        },
      },
      axisLabel: {
        show: false,
        position: 'top',
        showMaxLabel: true, //显示尾轴
        showMinLabel: true, //显示头轴
        formatter: '{yyyy}-{MM}-{dd}', // 得到的 label 形如：'2020-12-02'
        textStyle: {
          fontFamily: 'Times New Roman',
          fontSize: 16,
          color: '#333',
        },
      },
    },
  ],

  yAxis: [
    /** 左Y轴 */
    {
      min: option.y.min,
      max: option.y.max,
      interval: option.y.interval,
      type: 'value',
      /** 刻度线 */
      axisTick: {
        length: 8,
        show: true,
        inside: true,
      },
      /** 轴线 */
      axisLine: {
        lineStyle: {
          color: '#333',
        },
      },
      /** 轴标签 */
      axisLabel: {
        textStyle: {
          fontFamily: 'Times New Roman',

          fontSize: 16,
          color: '#333',
        },
      },
      /** 网格线 */
      splitLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
    },
    /** 右Y轴 */
    {
      /** @note 此处数据要和上面保持一致才能显示刻度线 */
      alignTicks: true, //自动对齐
      min: option.y.min,
      max: option.y.max,
      interval: option.y.interval,
      type: 'value',
      axisTick: {
        length: 8,
        show: true,
        inside: true,
      },
      axisLine: {
        lineStyle: {
          color: '#333',
        },
      },
      axisLabel: {
        show: option.y.name.length > 1,
        textStyle: {
          fontFamily: 'Times New Roman',
          fontSize: option.fontsize,
          color: '#333',
        },
      },
      splitLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
    },
  ],
  /** 数据显示列 */
  series: [...option.series],
}

function render_chart() {
  const canvas = createCanvas(Number(option.width), Number(option.height))
  const chart = echarts.init(canvas)
  chart.setOption(chart_option)
  return canvas
}

//将canvas存储为图片
function save_image(canvas) {
  const fs = require('fs')

  const out = fs.createWriteStream(require('path').resolve(option.output || './'))
  const stream = canvas.createPNGStream()
  stream.pipe(out)
  out.on('finish', () => {
    console.log('保存成功🔥 : ', require('path').resolve(option.output))
    process.exit()
  })
}
save_image(render_chart())
