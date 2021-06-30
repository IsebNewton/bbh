<template>
    <div>
      <b-modal
        v-model="showProductModal"
        :title="modalTitle"
        size="lg"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
        :body-bg-variant="bodyBgVariant"
        :body-text-variant="bodyTextVariant"
        :footer-bg-variant="footerBgVariant"
        :footer-text-variant="footerTextVariant"
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
              <label class="text-shadow text-bold">Farbbedarf:</label>
            </div>
            <div class="col-4">
              <b-form-input
                class="formfield"
                id="inputName"
                v-model="product.coverage"
                type="text"
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
              <label class="text-shadow text-bold">Typ:</label>
            </div>
            <div class="col-4">
              <select
                class="formfield"
                id="inputType"
                v-model="product.color">
                <option
                    v-for="option in availableColors"
                    :key="option.id"
                    v-bind:value="option"
                >{{option.color}}</option>
              </select>
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
                v-model="product.imageUrl"
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

export default {
  props: {
    productTypes: Array
  },
  data() {
    return {
        showProductModal: false,
        modalTitle: '',
        editMode: false,
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'light',
        footerTextVariant: 'dark',
        product: {
          name: '',
          brand: '',
          link: '',
          price: '',
          sizeVariants: [],
          color: null,
          coverage: null,
          imageUrl: '',
          images: [],
          type: ''
        },
        originalProduct: null
    };
  },
  components: {
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
        if (this.uploadFile) {
          this.setProductFile();
          this.postFile({file: this.file, destination: this.selectedFileDestination});
        }
        this.saveProducts();
      },
      saveProducts() {
        if (this.editMode == true)
        {
          this.putProduct(this.product).then(
            function() {
              this.showProductModal = false;
              this.saveProductLabels();
            }.bind(this)
          );
        }
        else
        {
          this.postProduct(this.product).then(
            function() {
              this.product.id = this.postedProductId;
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
        this.originalProduct = data;
        this.product.id = data.item.id;
        this.product.title = data.item.title;
        this.product.description = data.item.description;
        this.showProductModal = true;
      },
  }
}
</script>