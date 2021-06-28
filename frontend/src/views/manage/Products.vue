<template>
  <div class="container">
    <h1 class="text-shadow">Produktübersicht</h1>
    <b-table
      striped
      responsive
      hover
      :items="availableProducts"
      :fields="fields"
      :busy="isBusy"
      class="mt-3"
      outlined
      >
      <template #cell(sizeVariants)="data">
        <div class="text-nowrap"
          v-for="sizeVariant in data.item.sizeVariants"
          :key="sizeVariant.size">
          <label>{{sizeVariant.size}} L</label>
          <label>{{sizeVariant.price}} €</label>
        </div>
      </template>
      <template #cell(link)="data">
        <a :href="data.item.link" target="_blank">{{data.item.link}}</a>
      </template>
      <template #cell(edit)="data">
        <b-button variant="outline-secondary" class="editbutton">
          <b-img left src="assets/edit.png" @click="showEditTaskModal(data)" width="20px" alt="Produkt bearbeiten"></b-img>
        </b-button>
      </template>
      <template #cell(delete)="data">
        <b-button variant="outline-danger" class="editbutton">
        <b-img left src="assets/delete.png" @click="confirmRemoveProduct(data)" width="20px" alt="Produkt löschen"></b-img>
        </b-button>
      </template>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <modal-confirm-action 
      ref="confirmActionModal"
      :value="selectedProduct"
      @accepted="removeProduct"
      title="Produkt löschen">
    </modal-confirm-action>
    <product-modal 
      ref="productModal"
      :productTypes="productTypes">
    </product-modal>
  </div>
</template>        

<script>
require("./../../../public/assets/edit.png");
require("./../../../public/assets/delete.png");
import { mapState, mapActions } from "vuex";
import ModalConfirmAction from '../components/ModalConfirmAction.vue'
import ProductModal from './ProductModal.vue'

export default {
  props: {
  },
  data() {
    return {
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
          key: 'sizeVariants',
          label: 'Varianten'
        },
        {
          key: 'link',
          label: 'Link'
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
      selectedProduct: null,
      isBusy: false,
      productTypes: []
    };
  },
  components: {
    "modal-confirm-action": ModalConfirmAction,
    "product-modal": ProductModal
  },
  computed: {
    ...mapState("product", ["availableProducts"]),
  },
  mounted(){
    this.$parent.title = "";
    this.$parent.adminnavigation = true;
    this.getProducts().then(
      function() {
        var _productTypes = [];
        for (var i = 0; i < this.availableProducts.length; i++) {
          if (_productTypes.indexOf(this.availableProducts[i].type) === -1) {
            _productTypes.push(this.availableProducts[i].type);
          }
        }
        this.productTypes = _productTypes;
      }.bind(this)
    );
  },
  watch: {
  },
  methods: {
    ...mapActions("product", [
      "getProducts"
    ]),
    confirmRemoveProduct(data) {
      this.selectedProduct = data;
      this.$refs.confirmActionModal.showConfirmationModal = true;
    },
    showEditTaskModal(data) {
      this.$refs.productModal.showEditProductModal(data);
    },
    removeProduct(data) {
      if (data.item)
      {
      }
    },
  }
}
</script>