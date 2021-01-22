<template>
  <input type="text" placeholder="Filtrer" v-model="letters" @keyup="filter" />
  <!-- Two way binding -->
  <h3>Toutes les tâches</h3>
  <div v-show="tasksFiltered.length > 0">
    <div class="task" v-for="task in tasksFiltered" :key="task.id">
      <h3>{{ task.name }}</h3>
      <p>{{ task.description }}</p>
      <p>Echéance : {{ convertCase(task.temporality) }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import tasksService from "@/services/tasks.js";
export default {
  name: "Tasks",
  setup() {
    const tasks = ref([]);
    const letters = ref("");
    tasks.value = tasksService.read();
    const tasksFiltered = ref([]);
    filter();

    function convertCase(temporality) {
      return tasksService.convertCase(temporality);
    }

    function filter() {
      //console.log(letters.value);
     if (letters.value.length === 0) {
        console.log('tasks.value', tasks.value);
        tasksFiltered.value = tasks.value;
      } else {
        tasksFiltered.value = tasks.value.filter( (t) =>
          t.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
        );
      }
       /*
      if (selectedTemporality.value !== "") {
        tasksFiltered.value = tasksFiltered.value.filter(
          (t) => t.temporality === selectedTemporality.value
        );
      }*/
    }

    //return { tasks,letters, tasksFiltered, convertCase, filter };
    return { tasks,tasksFiltered, convertCase, letters, filter }; //On rend ici les éléments crés accesibles au template
  }
};
</script>

<style scoped>
.task {
  margin: 10px 15px;
  border: 3px solid #42b983;
  border-radius: 5px;
}
</style>
