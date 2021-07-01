<template>
    <div>
      <b-modal
        v-model="showProductModal"
        :title="modalTitle"
        size="lg"
        header-bg-variant="dark"
        header-text-variant="light"
        body-bg-variant="light"
        body-text-variant="dark"
        footer-bg-variant="light"
        footer-text-variant="dark"
        :hide-footer="true"
      >
        <b-form @submit="onSubmit" @reset="onReset">

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Name:</label>
            </div>
            <div class="col-4">
              <b-form-input
                class="formfield"
                id="inputName"
                v-model="product.name"
                type="text"
                placeholder="Produktnamen eingeben"
                required
              ></b-form-input>
            </div>
          </div>

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Marke:</label>
            </div>
            <div class="col-4">
              <search-autocomplete
                class="formfield"
                id="autocompleteBrand"
                v-model="product.brand"
                :items="productBrands">
              </search-autocomplete>
            </div>
          </div>

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Beschreibung:</label>
            </div>
            <div class="col-4">
              <b-form-textarea
                class="formfield"
                id="textareaDescription"
                v-model="product.description"
                placeholder="Beschreibung eingeben"
                rows="3"
              ></b-form-textarea>
            </div>
          </div>

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Farbbedarf:</label>
            </div>
            <div class="col-4">
              <b-form-input
                class="formfield"
                id="inputName"
                v-model="product.coverage"
                type="number"
                placeholder="Farbbedarf eingeben"
                required
              ></b-form-input>
            </div>
          </div>

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Typ:</label>
            </div>
            <div class="col-4">
              <select
                class="formfield"
                id="inputType"
                v-model="product.type">
                <option
                    v-for="option in productTypes"
                    :key="option"
                    v-bind:value="option"
                >{{option}}</option>
              </select>
            </div>
          </div>

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">zugeordnete Farben:</label>
            </div>
            <div class="col-4">
              <b-form-checkbox-group
                v-model="product.color"
                :options="availableColors"
                class="mb-3"
                value-field="id"
                text-field="color"
              ></b-form-checkbox-group>
            </div>
          </div>

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Produkt-URL:</label>
            </div>
            <div class="col-4">
              <b-form-input
                class="formfield"
                id="inputImageurl"
                v-model="product.link"
                type="text"
                placeholder="Produkt-URL eingeben"
                required
              ></b-form-input>
            </div>
          </div>

          <div class="row align-items-center mb-3">
            <div class="col-4">
              <label class="text-shadow text-bold">Bild-URL:</label>
            </div>
            <div class="col-4">
              <b-form-input
                class="formfield"
                id="inputImageurl"
                v-model="product.images[0]"
                type="text"
                placeholder="Bild-URL eingeben"
                required
              ></b-form-input>
            </div>
          </div>

          <b-button type="reset" variant="danger">Zurücksetzen</b-button>
          <b-button type="submit" variant="primary">Speichern</b-button>
        </b-form>
      </b-modal>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SearchAutocomplete from "../components/SearchAutocomplete";

export default {
  props: {
    productTypes: Array,
    productBrands: Array,
    exampleProduct: Object
  },
  data() {
    return {
        showProductModal: false,
        modalTitle: '',
        editMode: false,
        product: {
          name: '',
          description: '',
          brand: '',
          link: '',
          sizeVariants: [],
          color: [],
          hexColor: '',
          coverage: null,
          images: [],
          type: ''
        },
        originalProduct: null
    };
  },
  components: {
    "search-autocomplete": SearchAutocomplete,
  },
  computed: {
    ...mapState("color", ["availableColors"]),
  },
  mounted(){
    this.getColors();
  },
  watch: {
  },
  methods: {
    ...mapActions("color", [
      "getColors"
    ]),
    ...mapActions("product", ["postProduct", "putProduct"]),
      onSubmit(event) {
        event.preventDefault();
        console.log("Produkt", this.product);
        this.saveProducts();
      },
      saveProducts() {
        for (var k in this.product) {
          this.exampleProduct[k] = this.product[k];
        }
        var id = this.exampleProduct.id;
        delete this.exampleProduct.id;
        if (this.editMode == true)
        {
          this.putProduct({id: id, data: this.exampleProduct}).then(
            function() {
              this.showProductModal = false;
            }.bind(this)
          );
        }
        else
        {
          this.postProduct(this.exampleProduct).then(
            function() {
              this.showProductModal = false;
            }.bind(this)
          );
        }
      },
      onReset(event) {
        event.preventDefault()
        if (this.editMode == true)
        {
          this.showEditProductModal(this.originalProduct);
        }
        else
        {
          this.product.title = '';
          this.product.description = '';
          this.product.file = '';
        }
      },
      showAddProductModal() {
        this.editMode = false;
        this.modalTitle = "Produkt hinzufügen";
        this.product.title = '';
        this.product.description = '';
        this.showProductModal = true;
      },
      showEditProductModal(data) {
        this.editMode = true;
        this.modalTitle = "Produkt ändern";
        this.product = data.item;
        this.originalProduct = data.item;
        this.showProductModal = true;
      },
  }
}
</script>