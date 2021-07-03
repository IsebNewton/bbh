<template>
  <b-dropdown class="bg-white border rounded" variant="neutral" no-caret>
    <template #button-content>
      <div class="position-relative">
        <div :class="innerValue ? 'invisible' : ''">
          <label>Bitte auswählen</label>
          &#9660;
        </div>

        <div
          v-if="innerValue"
          class="position-absolute top-0 bottom-0 start-0 end-0 d-flex"
        >
          <div
            v-if="innerValue.hexCode"
            :style="'width:25px; background-color:' + innerValue.hexCode + ';'"
            class="ratio ratio-1x1 border rounded-circle me-2"
          ></div>
          <div class="flex-fill text-truncate text-start">
            <label>{{ innerValue[useText] }}</label>
          </div>
          <span>&#9660;</span>
        </div>
      </div>
    </template>

    <b-dropdown-item
      v-for="item in items"
      :key="item[useKey]"
      :value="item"
      @click="innerValue = item"
    >
      <div class="row mb-1">
        <div
          v-if="item.hexCode"
          :style="'height:25px;background-color:' + item.hexCode + ';'"
          class="col-1 border rounded-circle"
        ></div>
        <div class="col-3">
          <label>{{ item[useText] }}</label>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  props: {
    items: Array,
    value: Object,
    useKey: {
      // the name of the key-attribute which has to be use
      type: String,
      default: "id",
    },
    useValue: {
      // the name of the value-attribute which has to be use
      type: String,
      default: "id",
    },
    useText: {
      // the name of the text-attribute which has to be use
      type: String,
      default: "name",
    },
  },
  data() {
    return {
      innerValue: undefined,
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.innerValue = this.value;
  },
  watch: {
    value(val) {
      this.innerValue = val;
    },
    innerValue(val) {
      this.$emit("change", val);
    },
  },
  methods: {},
};
</script>
