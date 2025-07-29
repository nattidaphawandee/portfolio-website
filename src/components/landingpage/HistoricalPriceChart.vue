<template>
    <div class="summary-container">
        <div class="left-box">
            <div style="font-size: 40px;">INETREIT</div>
            <!-- <p>{{ latestInfo.lastPrice }}</p> -->
            <div style="display: flex; justify-items: center;">
                <div
                    :style="{color: latestInfo.stats === 'up' ? 'green' : latestInfo.stats === 'down' ? 'red' : 'black'}"
                    class="my-3  left-box-font-lastPrice"
                    >
                    <v-icon
                    
                        :style="{ color: latestInfo.stats === 'up' ? 'green' : latestInfo.stats === 'down' ? 'red' : 'black' }"
                        size="20" class="mr-1">
                        {{ latestInfo.stats === 'up' ? 'mdi-triangle' : latestInfo.stats === 'down' ?
                            'mdi-triangle-down' : 'คงที่' }}
                    </v-icon>
                    {{ latestInfo.lastPrice }}
                </div>
            </div>

            <p>
                <span
                    :style="{ color: latestInfo.stats === 'up' ? 'green' : latestInfo.stats === 'down' ? 'red' : 'black' }">
                    {{ latestInfo.changeDiff.toFixed(2) }} ({{ latestInfo.stats === 'up' ? '+' : latestInfo.stats ===
                        'down' ?
                    '-' : '' }} {{ latestInfo.changePercent.toFixed(2) }}% )
                </span>
            </p>
            <p style="font-size: 16px; color: #a2a2a2; font-weight: 400;">ปรับปรุงเมื่อ: {{
                formatThaiDate(latestInfo.date) }}</p>
        </div>

        <div class="right-box">
            <div class="stats-box">
                <div>
                    <div>ราคาปิด</div>
                    <div>{{ latestInfo.lastPrice }}</div>
                </div>
                <div class="highlighted-box">
                    <div style="font-size: 20px; font-weight: 400;">ราคาสูงสุด</div>
                    <div>{{ latestInfo.high }}</div>
                </div>
                <div>
                    <div>มูลค่าซื้อขาย (บาท)</div>
                    <div>{{ formatNumber(latestInfo.tradingValue) }}</div>
                </div>
            </div>

            <hr class="stats-divider" />


            <div class="stats-box">
                <div>
                    <div>ราคาปิดก่อนหน้า</div>
                    <div>{{ latestInfo.closePrev }}</div>
                </div>
                <div class="highlighted-box">
                    <div>ราคาต่ำสุด</div>
                    <div>{{ latestInfo.low }}</div>
                </div>
                <div>
                    <div>ปริมาณซื้อขาย (หุ้น)</div>
                    <div>{{ formatNumber(latestInfo.volume) }}</div>
                </div>
            </div>

        </div>
    </div>

    <div class="chart-buttons">
        <v-btn size="small" @click="changeChartType('line')">Line</v-btn>
        <v-btn size="small" @click="changeChartType('candlestick')">Candlestick</v-btn>
        <v-btn size="small" @click="changeChartType('ohlc')">OHLC</v-btn>
    </div>

    <div id="chart-container" ref="container"></div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue';
import Highcharts from 'highcharts/highstock';

import { useStockStore } from '@/stores/landingPage/stock'
const stock = useStockStore();

const container = ref<HTMLDivElement | null>(null);
let chart: Highcharts.Chart | null = null;

//สำหรับแสดง ข้อมูลหุ้นวันล่าสุด
const latestInfo = reactive({
    open: 0,
    high: 0,
    low: 0,
    closePrev: 0,
    changeDiff: 0,
    volume: 0,
    lastPrice: 0,
    tradingValue: 0,
    changePercent: 0,
    stats: '' as 'up' | 'down' | 'unchanged',
    date: '',
});

// function changeChartType(type: 'line' | 'area' | 'candlestick' | 'ohlc') {
//     if (!chart) return;

//     const mainSeries = chart.series[0]; // สมมุติว่า series[0] คือ main chart (ราคาหลักทรัพย์)

//     mainSeries.update({
//         type: type,
//     }, false);

//     chart.redraw(); // อัปเดตกราฟ
// }
function changeChartType(type: 'line' | 'area' | 'candlestick' | 'ohlc') {
    if (!chart) return;

    const seriesData =
        type === 'line' || type === 'area'
            ? rawData.map((item: any) => [new Date(item.date + 'T00:00:00Z').getTime(), item.close])
            : rawData.map((item: any) => [
                new Date(item.date + 'T00:00:00Z').getTime(),
                item.open,
                item.high,
                item.low,
                item.close
            ]);

    chart.series[0].update({
        type,
        data: seriesData
    }, false);

    chart.redraw();
}
// สำหรับใส่ , (comma คั่นตัวเลข)
function formatNumber(value: number) {
    return new Intl.NumberFormat('th-TH').format(value);
}
//สำหรับแปลงวัน
function formatThaiDate(dateStr: string): string {
    const monthsThai = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];

    const [year, month, day] = dateStr.split('-').map(Number);
    const thaiYear = year + 543;
    const monthName = monthsThai[month - 1];

    return `${day} ${monthName} ${thaiYear}`;
}

let rawData: any
async function init() {
    const res = await fetch('https://www.inetreit.com/stockservice/getStockNew/INETREIT.BK/1900', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    rawData = data;
    return data;
}

function calculateLatestInfo() {
    if (!rawData || rawData.length < 2) return;



    const latest = rawData[rawData.length - 1];
    const prev = rawData[rawData.length - 2];


    latestInfo.open = latest.open;
    latestInfo.high = latest.high;
    latestInfo.low = latest.low;
    latestInfo.closePrev = prev.close;
    latestInfo.volume = latest.volume;
    latestInfo.lastPrice = latest.close; // ราคาล่าสุด = close ของวันล่าสุด
    latestInfo.date = latest.date;

    latestInfo.tradingValue = latest.volume * latest.close;

    const diff = latest.close - prev.close;
    latestInfo.changePercent = (diff / prev.close) * 100;

    latestInfo.changeDiff = diff;

    if (diff > 0) {
        latestInfo.stats = 'up';
    } else if (diff < 0) {
        latestInfo.stats = 'down';
    } else {
        latestInfo.stats = 'unchanged';
    }
}

// function calculateLatestInfo() {
//   if (!rawData || rawData.length < 2) return;

//   const latest = rawData[rawData.length - 1];
//   const prev = rawData[rawData.length - 2];

//   latestInfo.open = latest.open;
//   latestInfo.high = latest.high;
//   latestInfo.low = latest.low;
//   latestInfo.closePrev = prev.close;
//   latestInfo.volume = latest.volume;
//   latestInfo.lastPrice = latest.close; // ราคาล่าสุด = close ของวันล่าสุด
//   latestInfo.date = latest.date;

//   latestInfo.tradingValue = latest.volume * latest.close;

//   const diff = latest.close - prev.close;
//   latestInfo.changePercent = (diff / prev.close) * 100;

//   if (diff > 0) {
//     latestInfo.stats = 'up';
//   } else if (diff < 0) {
//     latestInfo.stats = 'down';
//   } else {
//     latestInfo.stats = 'unchanged';
//   }
// }

onMounted(async () => {
    rawData = await init()
    // หลังโหลดข้อมูลเสร็จ ให้คำนวณข้อมูลล่าสุด
    calculateLatestInfo();
    // const response = await fetch('https://www.inetreit.com/stockservice/getStockNew/INETREIT.BK/1900', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // });
    // rawData = await response.json();

    //     const response = [
    //     {
    //         adjclose: 9.35,
    //         close: 9.35,
    //         date: "2025-06-30",
    //         high: 9.4,
    //         low: 9.25,
    //         open: 9.4,
    //         volume: 2142300.0
    //     },
    //     {
    //         adjclose: 9.35,
    //         close: 9.35,
    //         date: "2025-07-01",
    //         high: 9.4,
    //         low: 9.3,
    //         open: 9.4,
    //         volume: 1480500.0
    //     },
    //     {
    //         adjclose: 9.35,
    //         close: 9.35,
    //         date: "2025-07-02",
    //         high: 9.4,
    //         low: 9.35,
    //         open: 9.35,
    //         volume: 897900.0
    //     },
    //     {
    //         adjclose: 9.35,
    //         close: 9.35,
    //         date: "2025-07-03",
    //         high: 9.4,
    //         low: 9.3,
    //         open: 9.4,
    //         volume: 1391000.0
    //     },
    //     {
    //         adjclose: 9.4,
    //         close: 9.4,
    //         date: "2025-07-04",
    //         high: 9.4,
    //         low: 9.3,
    //         open: 9.4,
    //         volume: 842800.0
    //     }

    // ]

    const ohlc: Array<[number, number, number, number, number]> = [];
    const volume: Array<[number, number]> = [];
    // const groupingUnits = [
    //     ['week', [1]],
    //     ['month', [1, 2, 3, 4, 6]]
    // ];
    const groupingUnits = [
        ['day', [1, 2, 3, 5, 10, 15, 30]], // 👈 เพิ่มจำนวนวันที่รองรับ
        ['week', [1]],
        ['month', [1, 2, 3, 4, 6]]
    ];

    for (let i = 0; i < rawData.length; i++) {
        const timestamp = new Date(rawData[i].date + 'T00:00:00Z').getTime();

        ohlc.push([
            timestamp,
            rawData[i].open,
            rawData[i].high,
            rawData[i].low,
            rawData[i].close
        ]);

        volume.push([
            timestamp,
            rawData[i].volume
        ]);
    }

    if (container.value) {
        Highcharts.setOptions({
            lang: {
                // ป้องกัน error จาก Intl.NumberFormat
                decimalPoint: '.',
                thousandsSep: ','
            }
        });

        chart = Highcharts.stockChart(container.value, {
            // accessibility: {
            //     enabled: false
            // },
            zoomType: 'x',
            rangeSelector: {
                selected: 3,
                inputDateFormat: '%Y/%m/%d',
                inputBoxBorderColor: 'pink',
                inputStyle: {
                    backgroundColor: 'red',
                    color: '#039',
                    fontWeight: 'bold'
                },
                buttons: [
                    { type: 'day', count: 1, text: '1d' },
                    { type: 'day', count: 5, text: '5d' },
                    { type: 'month', count: 1, text: '1m' },
                    { type: 'month', count: 3, text: '3m' },
                    { type: 'month', count: 6, text: '6m' },
                    { type: 'ytd', text: 'YTD' },
                    { type: 'year', count: 1, text: '1y' },
                    { type: 'all', text: 'All' }
                ],
                inputEnabled: true
            },
            title: {
                text: 'ข้อมูล ราคาหลักทรัพย์ INET'
            },
            yAxis: [
                {
                    labels: { align: 'right', x: -3 },
                    title: { text: 'OHLC' },
                    height: '60%',
                    lineWidth: 2,
                    resize: { enabled: true }
                },
                {
                    labels: { align: 'right', x: -3 },
                    title: { text: 'Volume' },
                    top: '65%',
                    height: '35%',
                    offset: 0,
                    lineWidth: 2
                }
            ],
            xAxis: {
                type: 'datetime',
                labels: {
                    formatter: function () {
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        const date = new Date(this.value as number);
                        return `${date.getDate()} ${months[date.getMonth()]}`;
                    }
                }
            },
            tooltip: {
                split: true,
                xDateFormat: '%e %b %Y', // 👈 แสดงแบบ "8 Jul 2025"
            },
            series:
                [
                    {
                        type: 'candlestick',
                        name: 'INETREIT',
                        data: ohlc,
                        // dataGrouping: { units: groupingUnits },
                        dataGrouping: {
                            enabled: false // 👈 ปิดการ group
                        },
                        color: '#FF7F7F',
                        upColor: '#90EE90',
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [[0, '#2caffe'], [1, '#2caffe00']]
                        }
                    },
                    {
                        type: 'column',
                        name: 'Volume',
                        data: volume,
                        yAxis: 1,
                        color: {
                            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                            stops: [[0, 'pink'], [1, '#3366AA']]
                        },
                        // dataGrouping: { units: groupingUnits }
                        dataGrouping: {
                            enabled: false
                        },
                    }
                ]
        });


    }
});


onBeforeUnmount(() => {
    if (chart) {
        chart.destroy();
    }
});
</script>

<style>
/* .highcharts-range-input {
    border: 1px solid #fd2222 !important;
    border-radius: 4px;
    padding: 4px 8px;
    background-color: #fff;
    font-size: 14px;
    color: #111827;
} */
.summary-container {
    display: flex;
    flex-wrap: wrap;

    /* สำคัญสำหรับ mobile */
    background: #fdf5ce;
    padding: 15px;
}

.left-box {
    flex: 1 1 100%;
    max-width: 100%;
    background: pink;
    padding: 10px;
    justify-items: center;
    padding-top: 20px;
}
/* font  แสดงหุ้น */
.left-box-font-lastPrice{
    font-size: 40px;
    font-weight: 600;
}

.right-box {
    flex: 1 1 100%;
    max-width: 100%;
    background: deeppink;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* ส่วนของ responsive */
.stats-box {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    /* มือถือ 1 คอลัมน์ */
    gap: 10px;
}


.chart-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
}

.ibm-plex-sans-thai-extralight {
  font-family: "IBM Plex Sans Thai", sans-serif;
  font-weight: 200;
  font-style: normal;
}


/* -------------เส้นกัน--------------- */
.highlighted-box {
    position: relative;
    padding: 8px;
    height: 100%;
}


.highlighted-box::before,
.highlighted-box::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: red;
}

.highlighted-box::before {
    left: 0;
}

.highlighted-box::after {
    right: 0;
}

#chart-container {
    width: 100%;
    height: 60vh;
    min-height: 300px;
}

@media (min-width: 400px) {
    .stats-box {
        grid-template-columns: repeat(3, 1fr);
        background: yellow;
    }
}


@media (min-width: 768px) {
    .left-box {
        flex: 0 0 30%;
        max-width: 30%;
    }

    .right-box {
        flex: 0 0 70%;
        max-width: 70%;
    }
}

/* ให้เส้นหายเมื่อขนาดจอเล็ก */
@media (max-width: 767px) {

    .highlighted-box::before,
    .highlighted-box::after,
    .stats-divider,
    .stats-box hr {
        display: none;
    }
}

/* @media (max-width: 767px) {
  .stats-divider {
    display: none;
  }
} */
</style>
