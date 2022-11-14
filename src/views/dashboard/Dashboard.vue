<template>
  <div>
    <div class="section">
      <div class="left">
        <div class="overall">
          <OverallItem class="card" title="21.3k" desc="分配任务" />
          <OverallItem
            class="card"
            bg-color="linear-gradient(143deg, rgba(11,183,115,1) 0%, rgba(32,202,217,1) 100%)"
            title="21.3k"
            desc="分配任务"
          />
          <OverallItem
            class="card"
            bg-color="linear-gradient(143deg, rgba(255,64,86,1) 0%, rgba(255,131,73,1) 100%)"
            title="21.3k"
            desc="分配任务"
          />
        </div>
        <SectionCard>
          <!-- <div :style="{ width }"></div> -->
          <e-chart class="chart" autoresize :option="option2" theme="chalk" />
        </SectionCard>
      </div>
      <SectionCard class="right">
        <e-chart class="chart" :option="option1" />
      </SectionCard>
    </div>
    <SectionCard class="calendar" hidden-action>
      <FullCalendar :options="calendarOptions" />
    </SectionCard>
  </div>
</template>

<script setup lang="ts">
import OverallItem from './components/OverallItem.vue'
import SectionCard from './components/SectionCard.vue'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ref } from 'vue'
const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  weekends: false, // initial value
}
const option1 = ref({
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
  ],
})
const option2 = ref({
  legend: {
    bottom: '10px',
    data: ['Rainfall', 'Evaporation'],
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Rainfall',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }],
      },
    },
    {
      name: 'Evaporation',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      markPoint: {
        data: [
          { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
          { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }],
      },
    },
  ],
})
const width = ref('500px')
</script>

<style scoped lang="less">
.section {
  display: flex;
  width: 100%;
  .left {
    flex: 1;
    .overall {
      display: flex;
      margin-bottom: 32px;
      .card {
        flex: 1;
        &:nth-child(2) {
          margin: 0 32px;
        }
      }
    }
  }
  .right {
    width: 432px;
    margin-left: 32px;
    .chart {
      height: 100%;
    }
  }
}
.calendar {
  margin-top: 32px;
}
</style>
