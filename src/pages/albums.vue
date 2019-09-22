<template>
  <q-page padding>
    <div v-if="!isAlbumsLoading" class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          v-for="album of albums"
          :key="album.id">
          <q-card class="album-card column flex justify-between">
            <q-card-section>
              <div class="text-h6">{{ album.title }}</div>
            </q-card-section>

            <q-card-actions align="around">
              <q-btn flat color="primary" :to="{ name: 'album', params: { id: album.id } }">View</q-btn>
              <q-btn flat color="negative" @click="openDeleteDialog(album.id)">Delete</q-btn>
            </q-card-actions>
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

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this item?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn :loading="isLoading" color="negative" type="submit" flat @click="deletAlbum">
            Delete
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Loading...
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'Albums',
  
  data() {
    return {
      albums: [],
      confirm: false,
      selectedAlbumId: null,
      isLoading: false,
      isAlbumsLoading: false,
    }
  },

  async created() {
    try {
      this.isAlbumsLoading = true;
      this.albums = (await this.$axios.get(`albums`)).data;
    } catch (error) {
      console.log(error);
    } finally {
      this.isAlbumsLoading = false;
    }
  },
  methods: {
    openDeleteDialog(id) {
      this.confirm = true;
      this.selectedAlbumId = id;
    },
    async deletAlbum() {
      try {
        this.isLoading = true;
        await this.$axios.delete(`albums/${this.selectedAlbumId}`);
        const albuIndex = this.albums.findIndex(album => album.id === this.selectedAlbumId);
        this.albums.splice(albuIndex, 1);
      } catch (error) {
        console.log(error);
      } finally {
        this.selectedAlbumId = null;
        this.isLoading = false;
        this.confirm = false;
      }
    }
  },
}
</script>

<style scoped>
.album-card {
  min-height: 100%;
}
</style>