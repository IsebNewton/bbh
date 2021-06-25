<template>
    <div class="content">
      <h3>Aussparungen</h3>
      <div
        v-for="recess in recesses"
        :key="recess.name">
        <small>{{recess.name + ": " + recess.length + "x" + recess.height + " = " + recess.length * recess.height + "m²"}}</small>

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
    }
  }
}
</script>