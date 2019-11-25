<template>
  <validation-provider :rules="rules">
    <template #default>
      <b-form-group :label="label" :description="description" v-bind="$attrs">
        <b-form-input :id="id" :name="name" v-model="date" type="date" :placeholder="placeholder" />
      </b-form-group>
    </template>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import Moment from "moment";

export default {
  name: "DateInput",
  model: {
    prop: "value",
    event: "input:date"
  },
  inheritAttrs: false,
  components: {
    ValidationProvider
  },
  data() {
    return {
      rawValue: ""
    };
  },
  props: {
    id: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: "Date"
    },
    description: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Date],
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "YYYY-MM-DD"
    }
  },
  computed: {
    date: {
      get() {
        return this.value && this.value.isValid
          ? this.value.format("YYYY-MM-DD")
          : this.rawValue;
      },
      set(text) {
        const parsed = Moment(text, "YYYY-MM-DD");

        this.rawValue = text;

        if (parsed && parsed.isValid) {
          this.$emit("input:date", parsed);
        }
      }
    },
    rules() {
      return `required`;
    }
  }
};
</script>

<style></style>
