<template>
    <div>

        <!-- <div ref="container" style="height: 600px; min-width: 310px"></div> -->
        <div>
            Home : หน้าหลัก
            About Us :เกี่ยวกับเรา
                - General ข้อมูลทั่วไป
                - REIT Structure โครงสร้างกองทรัสต์
                - * milestone
            Management : การบริหารจัดการ
                - Reit Manager : ผู้จัดการกองทรัสต์
                - * โครงสร้างองค์กร : organizational structure
                - * คณะกรรมการบริษัท : Board of Directors
                - * คณะผู้บริหาร : Management Team
                -TrustTee : ทรัสตี
            Asset Investment : ทรัพย์สินที่ลงทุน
            Investor Relation : นักลงทุนสัมพันธ์ 
                - Financial StockInformation : ข้อมูลการเงิน
                    - * งบการเงิน : Financial Statement
                    - * มูลค่าทรัพย์สินสุทธิ (Unit NAV) 
                - Stock Information : ข้อมูลราคาหลักทรัพย์
                    - * ราคาหลักทรัพย์ : stock Quote
                    - * ราคาย้อนหลัง : Historical Price
                - Unitholders Information : ข้อมูลผู้ถือหน่วยทรัสต์
                    - * โครงสร้างผู้ถือหน่วยทรัสต์ : Unitholders Structure
                    - * การประชุมผู้ถือหน่วยทรัสต์ : Unitholders Meeting
                    - * การจ่ายเงินปันผล : compensation
                - Published Docments : เอกสารเผยแพร่
                    - Annual Reports and Form 56-REIT : รายงานประจำปี และแบบ 56-REIT
                    - Appraisal Reports :รายงานการประเมินมูลค่าทรัพย์สิน
                    - Prospectus : หนังสือชี้ชวน
                    - * เอกสารสำหรับนักลงทุน
            New Roow : ห้องข่าว
                - SET Announcements : ข่าวแจ้งตลาดหลักทรัพย์
                - * ข่าวสารอื่น ๆ
                
                - Press Releass : ข่าวจากสื่อสิ่งพิม (ตัดออก)
                - Clippings: ข่าวจากสื่อสิ่งพิม (ตัดออก)
                - Video: สื่อวิดิโอประชาสัมพันธ์ (ตัดออก)

            Contact Us : ติดต่อเรา
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Highcharts from 'highcharts/highstock';

const container = ref<HTMLDivElement | null>(null);
let chart: Highcharts.Chart | null = null;
function changeChartType(type: 'line' | 'area' | 'candlestick' | 'ohlc') {
    if (!chart) return;

    const mainSeries = chart.series[0]; // สมมุติว่า series[0] คือ main chart (ราคาหลักทรัพย์)

    mainSeries.update({
        type: type,
    }, false);

    chart.redraw(); // อัปเดตกราฟ
}


onMounted(async () => {
    const response = await fetch('https://www.inetreit.com/stockservice/getStockNew/INETREIT.BK/1900', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });


    const rawData = await response.json();

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

        chart = Highcharts.chart(container.value, {
            chart: {
                type: 'column'
            },
            title: {
                text: 'อัตราการจ่ายผลประโยชน์ตอบแทน'
            },
            xAxis: {
                categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
                crosshair: true,
                accessibility: {
                    description: 'Countries'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '1000 metric tons (MT)'
                }
            },
            tooltip: {
                valueSuffix: ' (1000 MT)'
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    name: 'Corn',
                    data: [387749, 280000, 129000, 64300, 54000, 34300]
                },
                {
                    name: 'Wheat',
                    data: [45321, 140000, 10000, 140500, 19500, 113500]
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
