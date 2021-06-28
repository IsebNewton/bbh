<template >
    <div>
      <b-modal
        v-model="showConfirmationModal"
        :title="title"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
        :body-bg-variant="bodyBgVariant"
        :body-text-variant="bodyTextVariant"
        :footer-bg-variant="footerBgVariant"
        :footer-text-variant="footerTextVariant"
        :hide-footer="true"
      >
        <b-form @submit="onSubmit" @reset="onCancel">
          <h2 class="text-center text-shadow mb-5">Sind sie sicher?</h2>
          <p class="text-center text-shadow mb-5">Der Löschvorgang kann nicht rückgängig gemacht werden!</p>
          <b-button type="reset" variant="primary">Abbrechen</b-button>
          <b-button type="submit" variant="danger">Löschen</b-button>
        </b-form>
      </b-modal>
    </div>
</template>

<script>

export default {
  props: {
    value: Object,
    title: String
  },
  data() {
    return {
        showConfirmationModal: false,
        wrongConfirmationWord: false,
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'light',
        footerTextVariant: 'dark'
    };
  },
  watch: {
    input(val) {
      this.wrongConfirmationWord = false;
    }
  },
  created() {
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$emit("accepted", this.value);
      this.showConfirmationModal = false;
    },
    onCancel(event) {
      event.preventDefault();
      this.showConfirmationModal = false;
    }
  }
};
</script>