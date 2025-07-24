<!-- ถ้าฉันต้อง นำข้อมูลของวันล่าสุดมาแสดง (ข้อมูลindex สุดท้าย) โดยจะต้องมีข้อมูลดังนี้ 1. ราคาเปิด 2. ราคาสูงสุด 3.
มูลค่าซื้อขาย (บาท) 4. ราคาปิดก่อนหน้า 5. ราคาต่ำสุด 6. ปริมาณซื้อขาย (หุ้น) 7. ราคาล่าสุด 8. เปลี่ยนแปลงกี(%) 9. stats
ว่าขึ้นหรือลง เทียบกับวันก่อน (เทียบกับ ข้อมูลก่อนสุดท้าย) เพื่อเอาไปทำสีแดงเขียนให้ข้อมูล -->
<template>
    <div>
        <div>
            <h3>ข้อมูลวันล่าสุด ({{ latestInfo.date }})</h3>
            <ul>
                <li>ราคาเปิด: {{ latestInfo.open }}</li>
                <li>ราคาสูงสุด: {{ latestInfo.high }}</li>
                <li>ราคาต่ำสุด: {{ latestInfo.low }}</li>
                <li>ราคาปิดก่อนหน้า: {{ latestInfo.closePrev }}</li>
                <li>ปริมาณซื้อขาย (หุ้น): {{ latestInfo.volume }}</li>
                <li>มูลค่าซื้อขาย (บาท): {{ latestInfo.tradingValue.toFixed(2) }}</li>
                <li>ราคาล่าสุด: {{ latestInfo.lastPrice }}</li>
                <li>เปลี่ยนแปลง (%):
                    <span
                        :style="{ color: latestInfo.stats === 'up' ? 'green' : latestInfo.stats === 'down' ? 'red' : 'black' }">
                        {{ latestInfo.changePercent.toFixed(2) }}%
                    </span>
                </li>
                <li>สถานะ:
                    <span
                        :style="{ color: latestInfo.stats === 'up' ? 'green' : latestInfo.stats === 'down' ? 'red' : 'black' }">
                        {{ latestInfo.stats === 'up' ? 'ขึ้น' : latestInfo.stats === 'down' ? 'ลง' : 'คงที่' }}
                    </span>
                </li>
            </ul>
        </div>

        <v-btn size="small" variant="outlined" color="red" class="mx-2" @click="changeChartType('line')">Line</v-btn>
        <v-btn size="small" variant="outlined" color="red" class="mx-2"
            @click="changeChartType('candlestick')">Candlestick</v-btn>
        <v-btn size="small" variant="outlined" color="red" class="mx-2" @click="changeChartType('ohlc')">OHLC</v-btn>

        <div ref="container" style="height: 600px; min-width: 310px"></div>
    </div>
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
// async function getINET() {
//   const url = 'https://api.twelvedata.com/time_series' +
//               '?symbol=SET/INET&interval=1day&apikey=YOUR_API_KEY';
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }
function calculateLatestInfo() {
    if (!rawData || rawData.length < 2) return;

    //   const latest = rawData[rawData.length - 1];
    //   const prev = rawData[rawData.length - 2];
    const latest = rawData[rawData.length - 8];
    const prev = rawData[rawData.length - 1];

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
.highcharts-range-input {
    border: 1px solid #fd2222 !important;
    /* Tailwind gray-700 */
    border-radius: 4px;
    padding: 4px 8px;
    background-color: #fff;
    font-size: 14px;
    color: #111827;
    /* Tailwind gray-900 */
}
</style>
