<template>
  <div class="container overflow-auto h-100">
    <h1 class="text-shadow">Produktübersicht</h1>
    <div class="my-3">
      <b-button variant="primary" @click="showAddProductModal()">
        Produkt hinzufügen
      </b-button>
    </div>
    <b-table
      striped
      responsive
      hover
      :items="availableProducts"
      :fields="fields"
      :busy="isBusy"
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
        <label v-for="colorId in data.item.color" :key="colorId">
          {{ colorDict[colorId] + (data.item.color.length - 1 > data.item.color.indexOf(colorId) ? ", " : "") }}
        </label>
      </template>
      <template #cell(sizeVariants)="data">
        <table>
          <tr
            class="text-nowrap text-right"
            v-for="sizeVariant in data.item.sizeVariants"
            :key="sizeVariant.key"
          >
            <td>{{ sizeVariant.size }} L</td>
            <td class="ps-1">{{ sizeVariant.price }} €</td>
          </tr>
        </table>
      </template>
      <template #cell(link)="data">
        <a :href="data.item.link" target="_blank">
          {{ data.item.link }}
        </a>
      </template>
      <template #cell(edit)="data">
        <div
          class="border-secondary rounded border p-1"
          @click="showEditTaskModal(data)"
        >
          <b-img
            class="action-icon"
            src="assets/edit.png"
            alt="Produkt bearbeiten"
          />
        </div>
      </template>
      <template #cell(delete)="data">
        <div
          class="border-danger rounded border p-1"
          @click="confirmRemoveProduct(data)"
        >
          <b-img
            class="action-icon"
            src="assets/delete.png"
            alt="Produkt löschen"
          />
        </div>
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
      title="Produkt löschen"
    >
    </modal-confirm-action>
    <product-modal
      ref="productModal"
      :productTypes="productTypes"
      :exampleProduct="availableProducts[0]"
      :productBrands="productBrands"
    >
    </product-modal>
  </div>
</template>

<script>
require("./../../../public/assets/edit.png");
require("./../../../public/assets/delete.png");
import { mapState, mapActions } from "vuex";
import ModalConfirmAction from "../components/ModalConfirmAction.vue";
import ProductModal from "./ProductModal.vue";

export default {
  props: {},
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Name",
        },
        {
          key: "description",
          label: "Beschreibung",
        },
        {
          key: "brand",
          label: "Marke",
        },
        {
          key: "type",
          label: "Produkttyp",
        },
        {
          key: "color",
          label: "Farben",
        },
        {
          key: "coverage",
          label: "Farbbedarf (ml/m²)",
        },
        {
          key: "images",
          label: "Bild",
        },
        {
          key: "sizeVariants",
          label: "Varianten",
        },
        {
          key: "link",
          label: "Link",
        },
        {
          key: "edit",
          label: "",
        },
        {
          key: "delete",
          label: "",
        },
      ],
      selectedProduct: null,
      isBusy: false,
      productTypes: [],
      productBrands: [],
    };
  },
  components: {
    "modal-confirm-action": ModalConfirmAction,
    "product-modal": ProductModal,
  },
  computed: {
    ...mapState("auth", ["isAuthorized"]),
    ...mapState("color", ["availableColors", "colorDict"]),
    ...mapState("product", ["availableProducts"]),
  },
  mounted() {
    this.$parent.title = "";
    this.$parent.adminnavigation = true;
    this.$parent.checkLoggedIn();
    this.fetchProducts();
    this.getColors();
  },
  watch: {},
  methods: {
    ...mapActions("auth", ["getAuth"]),
    ...mapActions("color", ["getColors"]),
    ...mapActions("product", ["getProducts", "deleteProduct"]),
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
            if (
              _productBrands.indexOf(this.availableProducts[i].brand) === -1
            ) {
              _productBrands.push(this.availableProducts[i].brand);
            }
          }
          this.productTypes = _productTypes;
          this.productBrands = _productBrands;
        }.bind(this)
      );
    },
    removeProduct(data) {
      if (data.item) {
        this.deleteProduct(data.item.id).then(
          function() {
            this.fetchProducts();
          }.bind(this)
        );
      }
    },
    showAddProductModal() {
      this.$refs.productModal.showAddProductModal();
    },
  },
};
</script>
