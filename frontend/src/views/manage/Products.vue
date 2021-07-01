<template>
  <div class="container">
    <h1 class="text-shadow">Produktübersicht</h1>
    <b-button variant="primary" @click="showAddProductModal();">Produkt hinzufügen</b-button>
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
      <template #cell(images)="data">
        <img
          v-if="data.item.images[0]"
          class="img-contain"
          :src="data.item.images[0]"
          :alt="'Bild von ' + data.item.name"
        />
        <label v-else>Kein Bild hinterlegt!</label>
      </template>
      <template #cell(color)="data">
        <label
          v-for="colorId in data.item.color"
          :key="colorId.key">
          {{colorDict[colorId]}}
        </label>
      </template>
      <template #cell(sizeVariants)="data">
        <div class="text-nowrap"
          v-for="sizeVariant in data.item.sizeVariants"
          :key="sizeVariant.key">
          <label>{{sizeVariant.size}} L</label>
          <label>{{sizeVariant.price}} €</label>
        </div>
      </template>
      <template #cell(link)="data">
        <a :href="data.item.link" target="_blank">{{data.item.link}}</a>
      </template>
      <template #cell(edit)="data">
        <b-button variant="outline-secondary" @click="showEditTaskModal(data)">
          <b-img left src="assets/edit.png" width="70px" alt="Produkt bearbeiten"></b-img>
        </b-button>
      </template>
      <template #cell(delete)="data">
        <b-button variant="outline-danger" @click="confirmRemoveProduct(data)">
        <b-img left src="assets/delete.png" width="70px" alt="Produkt löschen"></b-img>
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
      :productTypes="productTypes"
      :exampleProduct="availableProducts[0]"
      :productBrands="productBrands">
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
          key: 'description',
          label: 'Beschreibung'
        },
        {
          key: 'brand',
          label: 'Marke'
        },
        {
          key: 'type',
          label: 'Produkttyp'
        },
        {
          key: 'color',
          label: 'Farben'
        },
        {
          key: 'coverage',
          label: 'Farbbedarf'
        },
        {
          key: 'images',
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
      productTypes: [],
      productBrands: []
    };
  },
  components: {
    "modal-confirm-action": ModalConfirmAction,
    "product-modal": ProductModal
  },
  computed: {
    ...mapState("auth", ["isAuthorized"]),
    ...mapState("color", ["availableColors", "colorDict"]),
    ...mapState("product", ["availableProducts"]),
  },
  mounted(){
    this.$parent.title = "";
    this.$parent.adminnavigation = true;
    this.$parent.checkLoggedIn();
    this.fetchProducts();
    this.getColors();
  },
  watch: {
  },
  methods: {
    ...mapActions("auth", [
      "getAuth"
    ]),
    ...mapActions("color", [
      "getColors"
    ]),
    ...mapActions("product", [
      "getProducts",
      "deleteProduct"
    ]),
    confirmRemoveProduct(data) {
      this.selectedProduct = data;
      this.$refs.confirmActionModal.showConfirmationModal = true;
    },
    showEditTaskModal(data) {
      this.$refs.productModal.showEditProductModal(data);
    },
    fetchProducts() {
      this.getProducts().then(
        function() {
          var _productTypes = [];
          var _productBrands = [];
          for (var i = 0; i < this.availableProducts.length; i++) {
            if (_productTypes.indexOf(this.availableProducts[i].type) === -1) {
              _productTypes.push(this.availableProducts[i].type);
            }
            if (_productBrands.indexOf(this.availableProducts[i].brand) === -1) {
              _productBrands.push(this.availableProducts[i].brand);
            }
          }
          this.productTypes = _productTypes;
          this.productBrands = _productBrands;
        }.bind(this)
      );
    },
    removeProduct(data) {
      if (data.item)
      {
        console.log(data);
        this.deleteProduct(data.item.id).then(
          function() {
            this.fetchProducts();
          }.bind(this)
        );
      }
    },
    showAddProductModal() {
      this.$refs.productModal.showAddProductModal();
    }
  }
}
</script>