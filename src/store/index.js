import { createStore } from 'vuex'
import auth from "@/modules/auth/store";
import entertainment from "@/modules/entertainment/store";

export default createStore({
  modules: {
    auth,
    entertainment
  }
})
