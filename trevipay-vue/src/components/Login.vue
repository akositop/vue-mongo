<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Username:" label-for="input-1">
        <b-form-input
          id="input-username"
          v-model="form.username"
          placeholder="Enter username"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-password"
          type="password"
          v-model="form.password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        //alert(JSON.stringify(this.form))
        axios.post("http://localhost:3000/user/login", this.form)
        .then((data) => {
            try {
              if(data.data.status) {
                alert(`login successfully`)
                this.$router.push({ name: 'Home'})
              } else {
                alert(`Login failed`)
              }
            } catch (error) {
              console.error(error)
            }
        })
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.username = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>