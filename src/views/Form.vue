<template>
  <validation-observer>
    <template #default="{ invalid, handleSubmit }">
      <b-container>
        <b-form @submit.prevent="handleSubmit(submit)" class="form">
          <date-input
            name="birthday"
            v-model="birthday"
            label="Birthday"
            :description="ageDescription"
            required
          />
          <date-input
            name="g1_date"
            v-model="g1Date"
            label="G1 Date"
            :min-date="eligibleForG1Date"
            required
          />

          <b-form-group label="Driver school for G1?">
            <b-form-checkbox v-model="g1School" />
          </b-form-group>

          <date-input
            name="g2_date"
            v-model="g2Date"
            label="G2 Date"
            :min-date="eligibleForG2Date"
            required
          />

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
    ...mapGetters(["age", "eligibleForG1Date", "eligibleForG2Date"]),

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
    g1School: {
      get() {
        return this.$store.state.application.driverSchoolG1;
      },
      set(value) {
        this.setDriverSchoolG1(value);
      }
    },
    g2Date: {
      get() {
        return this.$store.state.application.G2Date;
      },
      set(date) {
        this.updateG2Date(date);
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
    ...mapMutations([
      "updateBirthday",
      "updateG1Date",
      "setDriverSchoolG1",
      "updateG2Date"
    ]),
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
