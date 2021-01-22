<template>
  <input type="text" placeholder="Filtrer" v-model="letters" @keyup="filter" />   <!-- Two way binding -->
  <div class="radio-filters">
    <label for="all">
      <input type="radio" id="all" value="" v-model="selectedTemporality">Toutes 
    </label>

    <label for="short-term">
      <input type="radio" id="short-term" value="short-term" v-model="selectedTemporality">Court terme
    </label>

    <label for="medium-term">
      <input type="radio" id="medium-term" value="medium-term" v-model="selectedTemporality">Moyen terme
    </label>

    <label for="long-term">
      <input type="radio" id="long-term" value="long-term" v-model="selectedTemporality">Long terme
    </label>

  </div>
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
import { ref, watch } from "vue";
import tasksService from "@/services/tasks.js";
export default {
  name: "Tasks",
  setup() {
    const tasks = ref([]); //on bind avec ref()
    const letters = ref("");
    const selectedTemporality = ref("");
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
       
      if (selectedTemporality.value !== "") {
        tasksFiltered.value = tasksFiltered.value.filter(
          (t) => t.temporality === selectedTemporality.value
        );
      }
    }

    watch(selectedTemporality, (newValue, oldValue) => {
      console.log('newValue: ', newValue, '|' ,'oldValue: ', oldValue);
      if(newValue !== ''){
        filter(); 
      } else {
        tasksFiltered.value = tasks.value;
        filter();
      }
    });

    //return { tasks,letters, tasksFiltered, convertCase, filter };
    return { tasks,tasksFiltered, convertCase, letters, selectedTemporality, filter }; //On rend ici les éléments crés accesibles au template
  }
};
</script>

<style scoped>
.task {
  margin: 10px 15px;
  border: 3px solid #42b983;
  border-radius: 5px;
}

.radio-filters{
  display: flex;
  justify-content: center;
}
</style>
