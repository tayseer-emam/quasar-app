<template>
  <q-page padding>
    
    <div v-if="!isLoading" class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          v-for="photo of photos"
          :key="photo.id">
          <q-card class="my-card">
            <q-img :src="photo.thumbnailUrl" spinner-color="red">
              <div class="absolute-bottom text-subtitle2 text-center">
                {{ photo.title }}
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>
    <div v-else class="q-pa-md flex flex-center">
      <q-circular-progress
        indeterminate
        size="50px"
        color="primary"
        class="q-ma-md"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Album',

  data() {
    return {
      albumId: this.$route.params.id,
      photos: [],
      isLoading: false,
    }
  },

  async created() {
    try {
      this.isLoading = true;
      this.photos = (await this.$axios.get(`photos?albumId=${this.albumId}`)).data;
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
