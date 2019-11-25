<template>
  <validation-observer>
    <template #default="{ invalid, handleSubmit }">
      <b-container>
        <b-form @submit.prevent="handleSubmit(submit)" class="form">
          <date-input name="birthday" v-model="birthday" label="Birthday" :description="ageDescription" />
          <date-input name="g1_date" v-model="g1Date" label="G1 Date" :min-date="eligibleForG1Date" />

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
    ...mapGetters(["age", "eligibleForG1Date"]),

    // fields
    birthday: {
      get() {
        return this.$store.state.application.birthday;
      },
      set(birthday) {
        this.updateBirthday(birthday);
      }
    },
    g1Date: {
      get() {
        return this.$store.state.application.G1Date;
      },
      set(date) {
        this.updateG1Date(date);
      }
    },

    // text
    ageDescription() {
      return this.age ? `Age: ${this.age} years` : null;
    },
    submitText() {
      return this.submitted ? "Submitted" : "";
    }
  },
  methods: {
    ...mapMutations(["updateBirthday", "updateG1Date"]),
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
