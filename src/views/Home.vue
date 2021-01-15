<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Vue.js App : Progressor (compo API)" />
    <Form @createTask="addTask" />
    <!-- "@" car on écoute l'événement createTask définit dans Form.vue, lorsque l'emission de cet événement arrive, on appel la fonction addTask -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Form from "@/components/Form.vue";
import tasksService from "@/services/tasks.js";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Form
  },
  setup() {
    function addTask(data) {
      console.log("Home.vue | addTask()", data);
      tasksService.create(data);
    }

    //Pour utiliser addTask dans le template, il faut bien penser à retourner un objet qui comporte une propriété addTask
    return { addTask };
  }
};
</script>
