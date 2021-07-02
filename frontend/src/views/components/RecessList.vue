<template>
  <div>
    <!--<h3 v-if="title" class="fs-5">{{ title }}</h3>-->
    <table class="table table-sm caption-top">
      <caption v-if="title">
        {{
          title
        }}
      </caption>
      <thead>
        <th style="width: 85%"></th>
      </thead>
      <tbody>
        <tr v-for="recess in recesses" :key="recess.name" class="align-middle">
          <td>
            <label class="pt-1">{{
              (recess.name != "null" ? recess.name + ": " : "") +
              recess.length +
              "cm x " +
              recess.height +
              "cm = " +
              (recess.length * recess.height) / 10000 +
              "m²"
            }}</label>
          </td>
          <td>
            <b-button
              variant="danger"
              size="sm"
              class="px-3"
              @click="deleteRecess(recess.name)"
            >
              X
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    recesses: Array,
    arrayname: String,
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    addRecess(_name, _length, _height) {
      var suffix = "";
      var found = true;
      while (found) {
        var found = false;
        for (var i = 0; i < this.recesses.length; i++) {
          if (this.recesses[i].name == _name + suffix) {
            found = true;
            if (suffix == "") {
              suffix = 2;
            } else {
              suffix++;
            }
            break;
          }
        }
      }
      this.$parent._data[this.arrayname].push({
        name: _name + suffix,
        length: _length,
        height: _height,
      });
    },
    deleteRecess(recessname) {
      for (var i = 0; i < this.recesses.length; i++) {
        if (this.recesses[i].name == recessname) {
          this.$parent._data[this.arrayname].splice(i, 1);
        }
      }
    },
  },
};
</script>