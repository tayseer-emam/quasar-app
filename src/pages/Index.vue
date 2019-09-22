<template>
  <q-page padding>
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    <div class="q-pa-md flex justify-end">
      <q-btn color="primary" @click="addPostDialog = true">Add a new post</q-btn>
    </div>
    <div v-if="!isPostsLoading" class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
          v-for="post of posts"
          :key="post.id">
          <q-card
            class="my-card text-white post-card"
            style="background:linear-gradient(135deg, #7117ea 0%,#ea6060 100%);"
          >
            <q-card-section>
              <div class="text-h6">{{ post.title }}</div>
            </q-card-section>

            <q-card-section>
              {{ post.body }}
            </q-card-section>
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

    <q-dialog v-model="addPostDialog" content-class="post-dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add a new post</div>
        </q-card-section>

        <q-card-section>
          <q-form
            @submit="onSubmit"
            ref="form"
            class="q-gutter-md"
          >
            <q-input
              v-model="newPost.title"
              filled
              label="Title *"
              hint="Name and surname"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              v-model="newPost.body"
              filled
              label="Body *"
              lazy-rules
              autogrow
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-card-actions align="right">
              <q-btn :loading="isAddPostsLoading" color="primary" type="submit" flat="">
                Add Post
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-left" />
                  Loading...
                </template>
              </q-btn>
            </q-card-actions>
          </q-form>
        </q-card-section>

        
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

const postForm = () => ({
  userId: 1,
  title: null,
  body: null, 
});

export default {
  name: 'Posts',

  data() {
    return {
      posts: [],
      addPostDialog: false,
      newPost: postForm(),
      isPostsLoading: false,
      isAddPostsLoading: false,
    }
  },

  async created() {
    try {
      this.isPostsLoading = true;
      this.posts = (await this.$axios.get(`posts`)).data;
    } catch (error) {
      console.log(error);
    } finally {
      this.isPostsLoading = false;
    }
  },

  methods: {
    async onSubmit(e) {
      try {
        this.isAddPostsLoading = true;
        const post = (await this.$axios.post(`posts`, this.newPost)).data;
        this.posts.unshift({...post});        
      } catch (error) {
        console.log(error);
      } finally {
        this.isAddPostsLoading = false;
        this.addPostDialog = false;
        this.newPost = postForm();
      }
    }
  },
}
</script>

<style scoped>
.post-card {
  min-height: 100%;
}
.post-dialog .q-card {
  width: 400px;
}
</style>
