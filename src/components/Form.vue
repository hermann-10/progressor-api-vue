<template>
  <h3>Créer une tâche</h3>
  <form @submit.prevent="createTask">
    <!-- "@submit" -> Raccourcie pour écouter les événements -->
    <!-- v-on:submit="createTask" -->
    <!-- pour que tout la page soit rechargé, j'utilise : @submit.prevent="createTask"-->
    <input
      type="text"
      v-model="name"
      placeholder="Nom de la tâche"
      ref="txtName"
    /><br />
    <!-- v-model pour récupérer le contenu que l'utilisateur entre dans l'input-->
    <textarea
      cols="30"
      rows="10"
      v-model="description"
      placeholder="Description de la tâche"
    ></textarea
    ><br />
    <select v-model="temporality">
      <option
        v-for="tempo in temporalityTypes"
        :value="tempo.value"
        :key="tempo.id"
      >
        {{ tempo.name }}
      </option></select
    ><br />
    <!-- v-bind:value="" -->
    <!-- le ":value" permet de récupérer la valeur et non le string entre les guimets  -->
    <button :disabled="!isFormValid">Créer</button>
  </form>
</template>
<script>
import { ref, onMounted, computed } from "vue";

export default {
  name: "Form",
  emits: ["createTask"], //Ajout d'une propriété -> emits : [], où on indique la donnée qu'on souhaite émettre à savoir createTask
  //lier les choses côté JS et côté HTML avec le méthode setup()
  setup(props, context) {
    const name = ref("");
    const description = ref("");
    const temporalityTypes = ref([
      {
        id: 1,
        name: "court terme",
        value: "short-term"
      },
      {
        id: 2,
        name: "moyen terme",
        value: "medium-term"
      },
      {
        id: 1,
        name: "long terme",
        value: "long-term"
      }
    ]);
    const temporality = ref(""); //variable qui récupère ce qui est selectionné par l'utilisateur
    let txtName = ref(null);

    function createTask() {
      //Comme on utilise la composition API, on a pas besoin de créer une propriété méthode qui comprendre notre fonction createTask()
      const task = {
        id: Date.now(), //provisoire
        name: name.value, //".value" pour récupérer la saisie de l'utilisateur
        description: description.value,
        temporality: temporality.value
      };
      console.log("task", task);
      context.emit("createTask", task); //Ce payload "task" qui représente la nouvelle tâche
      resetForm(); //Pas besoin de .this comme dans Vue 2 car on est dans la méthode setup() car elle est déclaré au même niveau que la fonction createTask()
    }

    function resetForm() {
      name.value = "";
      description.value = "";
      temporality.value = "";
      txtName.value.focus();
    }

    onMounted(() => {
      txtName.value.focus();
    });

    const isFormValid = computed(()=> {
      if(
        name.value !== '' &&
        description.value !== '' &&
        temporality.value !== ''
      ){
        return true;
      } else {
        return false;
      }
    });

    //return { name: name, description: description, } // Utilisation de la forme raccourcie ci-dessous
    return {
      name,
      description,
      temporalityTypes,
      temporality,
      createTask,
      txtName,
      isFormValid
    }; //j'exporte createTask() également pour qu'elle soit accessible dans le template
  }
};
</script>

<style>
input,
textarea,
select,
button {
  width: 90%;
  margin: 5px 10px;
}
</style>
