import { ref } from "vue";
import { useStore } from "vuex";
import Swal from 'sweetalert2'
import { useRouter } from "vue-router";

const useAuth = () => {
    const router = useRouter()
    const store = useStore()
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
        
        if (!createSession.success) {
          isLoading.value = false;
          return Swal.fire('Error', createSession.status_message, 'error')
        }

        await store.dispatch("auth/account",createSession.session_id);
        router.push({name:'entertainment'})
        isLoading.value = false;
      },
    };
}

export default useAuth