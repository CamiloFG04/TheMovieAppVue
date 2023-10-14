<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="true"
    :color="'#0d6efd'"
  />
  <form>
    <!-- Email input -->
    <div class="form-outline mb-4">
      <input
        type="email"
        id="form3Example3"
        class="form-control form-control-lg"
        placeholder="Enter a valid username"
        v-model="user.username"
      />
      <label class="form-label" for="form3Example3">Username</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-3">
      <input
        type="password"
        id="form3Example4"
        class="form-control form-control-lg"
        placeholder="Enter password"
        v-model="user.password"
      />
      <label class="form-label" for="form3Example4">Password</label>
    </div>

    <div class="d-flex justify-content-between align-items-center"></div>

    <div class="text-center text-lg-start mt-4 pt-2">
      <button
        type="button"
        class="btn btn-primary btn-lg"
        style="padding-left: 2.5rem; padding-right: 2.5rem"
        @click="onLoginClick"
      >
        Login
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import Swal from 'sweetalert2'
export default {
  components: {
    Loading,
  },
  setup() {
    const store = useStore();
    const user = ref({
      username: "Waifu22",
      password: "Evangelion3.0",
    });
    const isLoading = ref(false);

    return {
      user,
      isLoading,
      onLoginClick: async () => {
        isLoading.value = true;
        await store.dispatch("auth/createRequestToken");
        const createSessionWithLogin = await store.dispatch( "auth/createSessionWithLogin", user.value);

        if (!createSessionWithLogin.success){
          isLoading.value = false;
          return Swal.fire('Error', createSessionWithLogin.status_message, 'error')
        }
        const createSession = await store.dispatch("auth/createSession",createSessionWithLogin.request_token);
          isLoading.value = false;

        console.log({ createSessionWithLogin, createSession });
      },
    };
  },
};
</script>

<style scoped></style>
