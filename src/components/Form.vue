<template>
  <h3>Créer une tâche</h3>
  <form>
    <input type="text" v-model="name" placeholder="Nom de la tâche" /><br />
    <!-- v-model pour récupérer le contenu que l'utilisateur entre dans l'input-->
    <textarea
      cols="30"
      rows="10"
      v-model="description"
      placeholder="Description de la tâche"
    ></textarea><br>
    <select v-model="temporality">
      <option v-for="tempo in temporalityTypes" :value="tempo.value" :key="tempo.id">
        {{ tempo.name }}
      </option></select
    ><br />
    <!-- v-bind:value="" -->
    <!-- le ":value" permet de récupérer la valeur et non le string entre les guimets  -->
    <button>Créer</button>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Form",
  //lier les choses côté JS et côté HTML avec le méthode setup()
  setup() {
    const name = ref("");
    const description = ref("");
    const temporalityTypes = ref([
      {
        id: 1,
        name: "court terme",
        value: "short-term",
      },
      {
        id: 2,
        name: "moyen terme",
        value: "medium-term",
      },
      {
        id: 1,
        name: "long terme",
        value: "long-term",
      },
    ]);
    const temporality = ref(""); //variable qui récupère ce qui est selectionné par l'utilisateur

    //return { name: name, description: description, } // Utilisation de la forme raccourcie ci-dessous
    return { name, description, temporalityTypes, temporality };
  },
};
</script>

<style>
input, textarea, select, button{
    width: 90%;
    margin: 5px 10px;
}
</style>