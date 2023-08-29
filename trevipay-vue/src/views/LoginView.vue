<template>
  <div class="login">
    <b-container fluid>
      <Login/>
    </b-container>
  </div>
</template>

<script>
import Login from '../components/Login.vue'

export default {
  name: 'LoginView',
  components: {
    Login
  }
}
</script>
