<template>
    <div>
        <b-dropdown variant="primary" no-caret>
            <template #button-content>
                <div v-if="innerValue" style="margin-left:5px" class="row">
                    <div
                        v-if="innerValue.hexCode"
                        :style="'height:25px;background-color:' + innerValue.hexCode + ';'"
                        class="col-2">
                    </div>
                    <div class="col-3">
                        <label>{{innerValue[useText]}}</label>
                        &#9660;<span class="sr-only"></span>
                    </div>
                </div>
                <div v-else class="row mb-1">
                    <div class="col-3">
                        <label>Bitte auswählen</label>
                    </div>
                </div>
            </template>
            <b-dropdown-item 
                v-for="item in items"
                :key="item[useKey]"
                :value="item"
                @click="innerValue = item">
                <div class="row mb-1">
                    <div
                        v-if="item.hexCode"
                        :style="'height:25px;background-color:' + item.hexCode + ';'"
                        class="col-1">
                    </div>
                    <div class="col-3">
                        <label>{{item[useText]}}</label>
                    </div>
                </div>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
export default {
  props: {
    items: Array,
    value: Object,
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
  components: {
  },
  computed: {
  },
  mounted(){
    this.innerValue = this.value;
  },
  watch: {
    value(val) {
      this.innerValue = val;
    },
    innerValue(val) {
      this.$emit("change", val);
    }
  },
  methods: {
  }
}
</script>