<template>
  <div class="container">
    <h1 class="text-shadow">Produktübersicht</h1>
    <b-table
      striped
      responsive
      hover
      :items="shownProducts"
      :fields="fields"
      :busy="isBusy"
      class="mt-3"
      outlined
      >
      <template #cell(edit)="data">
        <b-button variant="outline-secondary" class="editbutton">
          <b-img left src="assets/edit.png" @click="showEditTaskModal(data)" width="20px" alt="Produkt bearbeiten"></b-img>
        </b-button>
      </template>
      <template #cell(description)="data">
        <label>{{ data.item.description }}</label>
      </template>
      <template #cell(delete)="data">
        <b-button variant="outline-danger" class="editbutton">
        <b-img left src="assets/delete.png" @click="confirmRemoveTask(data)" width="20px" alt="Produkt löschen"></b-img>
        </b-button>
      </template>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>        

<script>
export default {
  props: {
  },
  data() {
    return {
      shownProducts: [],
      fields: [
        {
          key: 'name',
          label: 'Name'
        },
        {
          key: 'type',
          label: 'Typ'
        },
        {
          key: 'image',
          label: 'Bild'
        },
        {
          key: 'edit',
          label: ''
        },
        {
          key: 'delete',
          label: ''
        }
      ],
      isBusy: true,
    };
  },
  components: {
  },
  computed: {
  },
  mounted(){
    this.$parent.title = "";
    this.$parent.adminnavigation = true;
  },
  watch: {
  },
  methods: {
  }
}
</script>