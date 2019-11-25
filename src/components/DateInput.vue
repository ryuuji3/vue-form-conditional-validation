<template>
  <validation-provider :rules="rules">
    <template #default="{ errors, valid }">
      <b-form-group
        :label="label"
        :description="description"
        v-bind="$attrs"
        :invalid-feedback="errors[0]"
        :state="valid"
      >
        <b-form-input
          :id="id"
          :name="name"
          v-model="date"
          type="date"
          :placeholder="placeholder"
        />
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
    placeholder: {
      type: String,
      default: "YYYY-MM-DD"
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
    // validation
    required: {
      type: Boolean,
      default: false
    },
    minDate: {
      type: [Date, Boolean],
      default: false
    },
    maxDate: {
      type: [Date, Boolean],
      default: false
    }
  },
  computed: {
    date: {
      get() {
        if (this.value) {
          const parsed = Moment(this.value);

          if (parsed.isValid) {
            return parsed.format("YYYY-MM-DD");
          }
        }

        return this.rawValue;
      },
      set(text) {
        const parsed = Moment(text, "YYYY-MM-DD");

        this.rawValue = text;

        if (parsed && parsed.isValid) {
          this.$emit("input:date", parsed.toDate());
        }
      }
    },
    rules() {
      return {
        required: this.required,
        min_date: this.minDate,
        max_date: this.maxDate
      };
    }
  }
};
</script>

<style></style>
