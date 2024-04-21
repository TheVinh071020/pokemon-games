<template>
  <div class="box">
    <div class="box1">
      <div class="aa">
        <h4>Height</h4>
        <span>{{ pokemon.height }}</span>
        <h4>Weight</h4>
        <span>{{ pokemon.weight }}</span>
      </div>
      <div>
        <h4>Abilities</h4>
        <div v-for="(ability, index) in pokemon.abilities" :key="index">
          <span>{{ ability.ability.name }}</span>
        </div>
      </div>
    </div>
    <div class="aa1">
      <h2>Type</h2>
      <div class="aa2">
        <div
          class="type-pokemon"
          v-for="(type, index) in pokemon.types"
          :key="index"
        >
          <div>
            {{ type.type.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InforDetailScreen",
  props: {
    pokemon: Object,
  },
};
</script>

<style>
.box {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.box h4 {
  color: white;
}

.box1 {
  display: flex;
  justify-content: space-evenly;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  gap: 10rem;
  background: #31a7d6ce;
  border-radius: 20px;
  padding: 1.5rem;
  color: #ee1a4f;
}

.aa2 {
  display: flex;
  gap: 1rem;
}

.aa1 h2 {
  margin-bottom: 1rem;
}

.aa1 button {
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px #6c6868;
}

.aa1 button:hover {
  color: black;
}

.btn-a {
  background: #77c856;
  cursor: pointer;
}

.btn-a:hover {
  background: #3f6c2c;
}

.btn-b {
  background: #9f409f;
  cursor: pointer;
}

.btn-b:hover {
  background: #4d1d4d;
}

.name {
  display: flex;
  justify-content: space-evenly;
  gap: 5rem;
}

img {
  width: 400px;
  object-fit: cover;
}
.type-pokemon {
  border-radius: 5px;
  border: 1px ridge rgb(245, 245, 245);
  padding: 5px;
  background-color: #77c856;
}
@media (max-width: 768px) {
  .box1 {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
</style>
