<template>
    <div class="content">
      <h3>Aussparungen</h3>
      <div
        v-for="recess in recesses"
        :key="recess.name">
        <label>{{recess.name + ": " + recess.length + "cm x " + recess.height + "cm = " + recess.length * recess.height / 10000 + "m²"}}</label>
        <b-button
        variant="danger"
        @click="deleteRecess(recess.name)">
        X
        </b-button>

      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      recesses: []
    };
  },
  components: {
  },
  computed: {
  },
  mounted(){
  },
  watch: {
  },
  methods: {
    addRecess(_name, _length, _height)
    {
        var suffix = "";
        var found = true;
        while (found)
        {
            var found = false;
            for(var i = 0; i < this.recesses.length; i++) {
                if (this.recesses[i].name == _name + suffix) {
                    found = true;
                    if (suffix == '')
                    {
                        suffix = 2;
                    }
                    else
                    {
                        suffix++;
                    }
                    break;
                }
            }
        }
        this.recesses.push({
            name: _name + suffix,
            length: _length,
            height: _height
        });
    },
    deleteRecess(recessname) {
      for(var i = 0; i < this.recesses.length; i++) {
        if (this.recesses[i].name == recessname) {
          this.recesses.splice(i, 1);
        }
      }
    }
  }
}
</script>