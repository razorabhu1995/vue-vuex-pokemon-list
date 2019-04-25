<template>
  <div>
    <Header></Header>
    <div class="body-content">
        <div class="margin-bottom-10-px padding-10-px">
            <h1 class="is-size-3 is-size-4-mobile has-text-weight-bold">Search for Pokemons</h1>
        </div>
        <!-- TABS FOR SEARCHING ACCRODING TO DIFFERENT CATOGORIES -->
         <b-tabs position="is-centered" class="block">

            <!-- TAB TO SEARCH BASED ON NAME OF POKEMON -->
            <b-tab-item label="Name">
                  <div class="field">
                        <div class="control">
                           <input class="input is-medium" v-model="name" type="text" placeholder="Search according to name..." @keydown.enter="searchByName">
                           <button class="clear button is-text is-small" v-if="name" @click="cancelSelection">
                           Cancel
                           </button>
                        </div>
                  </div>
                  <div class="columns is-multiline is-mobile is-variable is-2" v-if="searchedPokemons && searchedPokemons.length > 0">
                     <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop" v-for="(pokemon,index) in searchedPokemons" :key="index">
                        <div class="no-border pointer"  @click="openPokemonDetailModal(pokemon.name)">
                           <div class="card-image">
                              <figure class="image is-128x128" >
                                 <img :src="pokemon.image" class="border-radius-5-px">
                              </figure>
                           </div>
                           <div class="card-content">
                                    <div class="media">
                                       <div class="media-content">
                                          <p class="has-text-weight-bold">{{pokemon.name}}</p>
                                       </div>
                                    </div>
                           </div>
                        </div>
                     
                     </div>
                  </div>
                  <div class="columns is-multiline is-mobile is-variable is-2" v-else>
                     <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop" v-for="(pokemon,index) in pokemons" :key="index">
                        <div class="no-border pointer"  @click="openPokemonDetailModal(pokemon.name)">
                           <div class="card-image">
                              <figure class="image is-128x128" >
                                 <img :src="pokemon.image" class="border-radius-5-px">
                              </figure>
                           </div>
                           <div class="card-content">
                                    <div class="media">
                                       <div class="media-content">
                                          <p class="has-text-weight-bold">{{pokemon.name}}</p>
                                       </div>
                                    </div>
                           </div>
                        </div>
                     
                     </div>
                  </div>
            </b-tab-item>

            <!-- TAB TO SEARCH BASED ON GENDER -->
            <!-- IMAGES ARE NOT SHOWING BECAUSE THE CALL TO API DOESN'T RETURN IMAGE AND TO GET IMAGE YOU NEED TO PERFORM MULTIPLE CALLS WHICH TAKES LONG TIME -->
            <b-tab-item label="Gender">
               <b-field>
                     <b-radio-button  v-model="genderSelection"  native-value="1" @click.native="getGenderPokemons(2)">
                        <span>Male</span>
                     </b-radio-button>
                     <b-radio-button   v-model="genderSelection" native-value="2" @click.native="getGenderPokemons(1)">
                        <span>Female</span>
                     </b-radio-button>
                     <b-radio-button   v-model="genderSelection" native-value="3" @click.native="getGenderPokemons(3)">
                        <span>Genderless</span>
                     </b-radio-button>
               </b-field>
               <div class="columns is-multiline is-mobile is-variable is-2" v-if="genderedPokemons && genderedPokemons.length > 0">
                     <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop" v-for="(pokemon,index) in genderedPokemons" :key="index">
                        <div class="no-border pointer"  @click="openPokemonDetailModal(pokemon.pokemon_species.name)">
                           <div class="card-image">
                              <figure class="image is-4by3" >
                                 <img src="https://bulma.io/images/placeholders/256x256.png" class="border-radius-5-px">
                              </figure>
                           </div>
                           <div class="card-content">
                                    <div class="media">
                                       <div class="media-content">
                                          <p class="has-text-weight-bold">{{pokemon.pokemon_species.name}}</p>
                                       </div>
                                    </div>
                           </div>
                        </div>
                     
                     </div>
               </div>
               <div v-else>
                 <p style="text-align: center; color: dimgrey;"> Click on Gender buttons to display pokemons based on their Gender! :) </p>
               </div>
               <b-loading :is-full-page="true" :active.sync="loadingGenderedPokemons" :can-cancel="true"></b-loading>

            </b-tab-item>
            

            <!-- TAB TO SEARCH BASED ON GENDER -->
            <!-- IMAGES ARE NOT SHOWING BECAUSE THE CALL TO API DOESN'T RETURN IMAGE AND TO GET IMAGE YOU NEED TO PERFORM MULTIPLE CALLS WHICH TAKES LONG TIME -->

            <b-tab-item label="Region">
                 <b-field label="Select" >
                        <b-select placeholder="Select a region" v-model="selectedRegion" @input="getRegionalPokemons"  size="is-medium" :loading="loadingRegionalPokemons">
                           <option value="kanto" >Kanto</option>
                           <option value="updated-johto">Johto</option>
                           <option value="hoenn">hoenn</option>
                           <option value="extended-sinnoh">Sinnoh</option>
                           <option value="updated-unova">Unova</option>
                           <option value="kalos-central">Kalos</option>
                        </b-select>
                  </b-field>
                  <div class="columns is-multiline is-mobile is-variable is-2" v-if="regionalPokemons && regionalPokemons.length > 0">
                     <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop" v-for="(pokemon,index) in regionalPokemons" :key="index">
                        <div class="no-border pointer"  @click="openPokemonDetailModal(pokemon.pokemon_species.name)">
                           <div class="card-image">
                              <figure class="image is-4by3" >
                                 <img src="https://bulma.io/images/placeholders/256x256.png" class="border-radius-5-px">
                              </figure>
                           </div>
                           <div class="card-content">
                                    <div class="media">
                                       <div class="media-content">
                                          <p class="has-text-weight-bold">{{pokemon.pokemon_species.name}}</p>
                                       </div>
                                    </div>
                           </div>
                        </div>
                     
                     </div>
               </div>
               <div v-else>
                 <p style="text-align: center; color: dimgrey;"> Select from options to display pokemons based on their Regions! :) </p>
               </div>
            </b-tab-item>
        </b-tabs>
     
      <!-- MODAL TO SHOW THE POKEMON DETAILS -->  
         <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
         <b-modal :active.sync="isPokemonDetailModalActive" :width="450" scroll="keep">
               <!-- MODAL COMPONENT IMPORTED -->
               <PokemonDetail :pokemonDetail="pokemonDetail"></PokemonDetail>          
         </b-modal>

   </div>
    
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import PokemonDetail from '@/components/PokemonDetail.vue'

export default {
  name: 'home',
  data(){
     return{
        pokemons: [],
        name : "",
        genderedPokemons : [],
        genderSelection : '',
        selectedRegion : "",
        regionalPokemons : [],
        searchedPokemons : [],
        loadingRegionalPokemons : false,
        loadingGenderedPokemons : false,
        isLoading : false,
        isPokemonDetailModalActive : false,
        pokemonDetail : {}
     }
  },
  methods: {
    openPokemonDetailModal : function(pokemonName){
        this.isLoading = true;
        /** GET DETAILS OF POKEMON AND SHOW IT IN MODAL */
        this.$http.get('pokemon/' + pokemonName)
               .then(response => {
                  console.log(response.data);
                  this.pokemonDetail = response.data;
                  this.isLoading = false;
                  this.isPokemonDetailModalActive = true;
               }).catch(errors => {
                  console.log(errors);
               });
     },
    searchByName: function() {
       /** FILTERS POKEMON NAME AND PROVIDES RESULT IN SEARCH BY NAME TAB */
      var pokemons = this.pokemons.filter(pokemon => {
         return pokemon.name == this.name
      })
      this.searchedPokemons = pokemons;
    },
    cancelSelection : function(){
      //  REMOVES THE SEARCHED INDEX WITH ALL POKEMONS
       this.name = "";
       this.searchedPokemons = [];
    },
    getPokemons : function(){
        /** GET ALL THE POKEMONS AND CALL EACH POKEMON API
        *   TO GET IMAGES 
        *   STORES ALL POKEMONS IN STORE SO THAT IT CAN BE USED GLOBALLY
        */
       var pokemons = [];
       this.$http.get('pokemon?limit=964')
         .then(response =>{
             response.data.results.forEach(item => {
               this.$http.get(item.url)
               .then(response => {
                  var pokemon = {
                     name : response.data.name,
                     image : response.data.sprites.front_default
                  }
                  pokemons.push(pokemon);
               }).catch(errors => {
                  console.log(errors);
               });
            });
            this.pokemons = pokemons;
            this.$store.commit("getPokemons", pokemons);
         }).catch(errors => {
            console.log(errors);
         })
    },
    getGenderPokemons : function(value){
       /** GET POKEMONS BASED ON GENDER WITH API CALL */
       this.loadingGenderedPokemons = true;
       var pokemons = [];
        this.$http.get('gender/' + value + '?limit=684')
         .then(response =>{
            console.log("here", response.data);
            this.genderedPokemons = response.data.pokemon_species_details;
            this.loadingGenderedPokemons = false;
         }).catch(errors => {
            console.log(errors);
         })
    },
    getRegionalPokemons : function(){
       /** GET POKEMONS BASED ON REGIONS WITH API CALL */
       this.loadingRegionalPokemons =true
        this.$http.get('pokedex/' + this.selectedRegion)
         .then(response =>{
            console.log("here", response.data);
            this.regionalPokemons = response.data.pokemon_entries;
            this.loadingRegionalPokemons = false;
         }).catch(errors => {
            console.log(errors);
         })
    }
  },
  components: {
    Header,
    PokemonDetail
  },
  mounted(){
       /** CHECK STORE FOR ALL POKEMONS IF AVAILABLE ASSIGN IT TO pokemons VARIABLE
      * OTHERWISE MAKE CALL TO getpokemon METHOD
      */
     if(this.$store.state.pokemons){
        this.pokemons = this.$store.state.pokemons;
     }else{
        this.getPokemons();
     }
  }
}
</script>
<style>
.body{
   background-color: aqua
}
.body-content {
   max-width: 940px;
   margin: 40px auto 75px auto;
   display: block;
   padding: 0px 10px;
   position: relative;
}
.margin-bottom-10-px {
   margin-bottom: 10px;
}
.padding-10-px {
   padding: 10px;
}
.border-radius-5-px {
   border-radius: 5px;
}
.no-border {
   border: none;
   box-shadow: none;
}
.no-border .card-content {
   padding: 10px 0px;
}
.clear{
      position: absolute;
      right: 2px;
      z-index: 10;
      margin-top: 5px;
}
.pointer{
   cursor: pointer;
}
</style>

