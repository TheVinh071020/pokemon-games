<template>
  <div class="bar-chart">
    <ul class="bar-list">
      <li v-for="(stat, index) in chartData" :key="index" class="bar-item">
        <div class="horizontal-label">{{ stat.name }}</div>
        <div class="bars">
          <div class="bar" :style="{ width: stat.base_stat + '%' }">
            <p>
              {{ stat.base_stat }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CustomChart",
  props: {
    chartData: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.bar-chart {
  width: 100%;
}

.bar-list {
  width: 400px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.bar-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.horizontal-label {
  margin-right: 15px;
  width: 140px;
}

.bars {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.bar {
  background-color: #3498db;
  margin-right: 10px;
  transition: width 0.5s;
  border-radius: 5px;
  position: relative;
}
.bar p {
  text-align: center;
  margin-top: 5px;
}
</style>
