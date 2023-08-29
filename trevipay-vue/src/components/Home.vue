<template>
    <div>
        <b-container>
          <b-button variant="outline-primary" @click="showAddBuyerForm">Add Buyer</b-button>
        </b-container>

        <b-modal ref="my-modal" hide-footer title="Buyer details">
          <div class="d-block text-center">
            <b-form @submit="handleSubmit" @reset="onReset">
              <b-form-group id="input-group-1" label="BuyerID:" label-for="input-1">
                <b-form-input
                  id="input-name"
                  v-model="buyerForm.buyerId"
                  disabled
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-1" label="Name:" label-for="input-1">
                <b-form-input
                  id="input-name"
                  v-model="buyerForm.name"
                  placeholder="Enter name"
                  :required="disabledInputs!=1"
                  :disabled="!addMode && disabledInputs==1"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Email:" label-for="input-2">
                <b-form-input
                  id="input-email"
                  type="email"
                  v-model="buyerForm.email"
                  placeholder="Enter email"
                  :required="disabledInputs!=1"
                  :disabled="!addMode && disabledInputs==1"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-3" label="Active:" label-for="input-3">
                <b-form-checkbox v-model="buyerForm.status" name="check-button" switch :disabled="disabledInputs==1"/>
              </b-form-group>

              <b-button type="submit" variant="primary" :disabled="!addMode && disabledInputs==1">{{ addMode? 'Add Buyer': 'Edit Buyer'}}</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
              
            </b-form> 
          </div>
        </b-modal>
        <div>
          <b-container class="bv-example-row">
            <b-row>
              <b-col>
                <b-form-group id="input-group-1" label="Search by Buyer ID:" label-for="input-1">
                <b-form-input
                  id="input-name"
                  v-model="searchBuyerById.buyerId"
                  placeholder="Search for buyer" />
                </b-form-group>
              </b-col>
              <b-col>
                <b-button style="margin-top:30px" variant="primary" @click="searchBuyer">Search Buyer</b-button>
              </b-col>
              <b-col>
                <b-button style="margin-top:30px" variant="primary" @click="getAllBuyers">See All Buyers</b-button>
              </b-col>
            </b-row>
          </b-container>
  
          <b-table 
            striped 
            hover 
            :items="items"
            select-mode="single"
            ref="selectableTable"
            selectable
            @row-selected="editBuyerModalOpen"></b-table>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
    export default {
      data() {
        return {
        items: [],
        selectedBuyer: [],
        searchBuyerById: {
          buyerId: ''
        },
        buyerForm: {
          buyerId: Math.floor(Math.random() * 100),
          name: '',
          email: '',
          status: true
        },
        disabledInputs: 0,
        editMode: false,
        addMode: false
      }
      },
      methods: {
        showAddBuyerForm() {
          this.$refs['my-modal'].show()
          this.addMode = true
          this.editMode = false
          this.disabledInputs = 1
          this.buyerForm = {
            buyerId: Math.floor(Math.random() * 100),
            name: '',
            email: '',
            status: true
          }
        },
        handleSubmit(event) {
          if(this.addMode) {
            this.addBuyer(event)
          } else {
            this.editBuyer()
          }
        },
        addBuyer(event) {
          event.preventDefault()
          axios.post("http://localhost:3000/buyer/create", this.buyerForm)
          .then((data) => {
              try {
                if(data.data.status) {
                  alert(`Added Buyer`)
                  this.$refs['my-modal'].hide()
                  window.location.reload()
                } else {
                  alert(`Transaction Failed`)
                }
              } catch (error) {
                console.error(error)
              }
          })
        },
        getAllBuyers() {
          axios.get("http://localhost:3000/buyer/getAllBuyers")
          .then((result) => {
              try {
                let data = result.data.data
                if(data.length > 0) {
                  let returnList =data.reduce((acc, val) => {
                    let currentVal = {
                      buyerId: val.buyerId,
                      name: val.name,
                      email: val.email,
                      status: val.status? 'Active' : 'Disabled'
                    }
                    acc.push(currentVal)
                    return acc
                  }, [])
                  this.items = returnList
                }
              } catch (error) {
                console.error(error)
              }
          })
        },
        searchBuyer() {
          axios.post("http://localhost:3000/buyer/getBuyerById", this.searchBuyerById)
          .then((result) => {
              try {
                let data = result.data.data
                if(data) {
                  let arrayToOutput = []
                  let userResultVal = {
                      buyerId: data.buyerId,
                      name: data.name,
                      email: data.email,
                      status: data.status? 'Active' : 'Disabled'
                    }
                  arrayToOutput.push(userResultVal)
                  this.items = arrayToOutput
                } else {
                  this.items = []
                }
              } catch (error) {
                console.error(error)
              }
          })
        },
        onReset(event) {
          event.preventDefault()
          // Reset our form values
          this.buyerForm.name = ''
          this.buyerForm.email = ''
          // Trick to reset/clear native browser form validation state
          this.show = false
          this.$nextTick(() => {
            this.show = true
          })
        },
        editBuyerModalOpen(items) {
          this.selectedBuyer = items
          console.log(this.selectedBuyer)
          this.addMode = false
          this.editMode = true
          this.disabledInputs = items[0].status == 'Active' ? 0 : 1
          this.$refs['my-modal'].show()
          this.buyerForm = {
            buyerId: items[0].buyerId,
            name: items[0].name,
            email: items[0].email,
            status: items[0].status == 'Active' ? true : false
          }
        },
        editBuyer() {
          axios.patch(`http://localhost:3000/buyer/update/ ${ this.selectedBuyer[0].buyerId }`, this.buyerForm)
          .then((data) => {
            console.log(data)
              try {
                  alert(`Buyer Updated!`)
                  this.$refs['my-modal'].hide()
                  window.location.reload()
              } catch (error) {
                console.error(error)
              }
          })
        }
      },
      mounted() {
        this.getAllBuyers()
      }
    }
  </script>