<template >
    <div class="form-group">
        <label v-if="!noLabel && !smallLabel">{{ label }}</label>
        <small v-if="smallLabel" class="help-block form-text">{{ label }}</small>
        <select class="custom-select" 
            :id="inputId"
            :required="isRequired"
            v-model="innerValue"
        >
            <option
                v-for="option in options"
                :key="option[useKey]"
                v-bind:value="option[useValue]"
            >{{option[useText]}}</option>
        </select>
    </div>
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    options: Array,
    value: Number,
    label: String,
    smallLabel: Boolean,
    noLabel: Boolean,
    isRequired: Boolean,
    inputId: String,
    useKey: { // the name of the key-attribute which has to be use
      type: String,
      default: "id"
    },
    useValue: { // the name of the value-attribute which has to be use
      type: String,
      default: "id"
    },
    useText: { // the name of the text-attribute which has to be use
      type: String,
      default: "name"
    }
  },
  data() {
    return {
      innerValue: undefined
    };
  },
  watch: {
    value(val) {
      this.innerValue = val;
    },
    innerValue(val) {
      this.$emit("change", val);
    }
  },
  mounted() {;
    this.innerValue = this.value;
  },
  methods: {
  }
};
</script>