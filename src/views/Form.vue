<template>
  <validation-observer>
    <template #default="{ invalid, handleSubmit }">
      <b-container>
        <b-form @submit.prevent="handleSubmit(submit)" class="form">
          <date-input name="birthday" v-model="birthday" :description="ageDescription" placeholder="yyyy-mm-dd" />

          <b-button type="submit" :disabled="invalid">Submit</b-button>

          <div>{{ submitted || "" }}</div>
        </b-form>
      </b-container>
    </template>
  </validation-observer>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { ValidationObserver } from "vee-validate";

import DateInput from "../components/DateInput";

const { mapGetters, mapMutations } = createNamespacedHelpers("application");

export default {
  name: "Form",
  components: {
    ValidationObserver,
    DateInput
  },
  data() {
    return {
      submitted: false
    };
  },
  computed: {
    ...mapGetters(["age"]),
    birthday: {
      get() {
        return this.$store.state.application.birthday?.format("YYYY-MM-DD");
      },
      set(birthday) {
        this.updateBirthday(birthday);
      }
    },
    ageDescription() {
      return this.age ? `Age: ${this.age} years` : null;
    },
    submitText() {
      return this.submitted ? "Submitted" : "";
    }
  },
  methods: {
    ...mapMutations(["updateBirthday"]),
    submit() {
      this.submitted = true;
    }
  }
};
</script>

<style scoped>
.form {
  margin: 1rem;
}
</style>
