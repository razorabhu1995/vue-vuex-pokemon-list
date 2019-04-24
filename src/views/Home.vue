<template>
  <div>
    <Header></Header>
    <b-icon
                icon="account"
                size="is-small">
            </b-icon>
    <div class="body-content">
        <div class="margin-bottom-10-px padding-10-px" style="display: table-caption;">
           <figure class="image is-96x96" >
            <img src="./../assets/pokeball.png" alt="image">
           </figure>
            <h1 class="is-size-3 is-size-4-mobile has-text-weight-bold">Pokemons</h1>
            <p class="has-text-weight-bold is-italic has-text-grey-darker">Gotta Catch 'em  All</p>
        </div>
       <div class="columns is-multiline is-mobile is-variable is-2">
         <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop" v-for="(pokemon,index) in pokemons" :key="index">
            <div class="no-border pointer" @click="openPokemonDetailModal(pokemon.name)">
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
      <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <b-modal :active.sync="isPokemonDetailModalActive" :width="450" scroll="keep">
            <PokemonDetail :pokemonDetail="pokemonDetail"></PokemonDetail>          
      </b-modal>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import PokemonDetail from '@/components/PokemonDetail.vue'


export default {
  name: 'home',
  data(){
     return{
        pokemons: [],
        isPokemonDetailModalActive : false,
        isLoading : false,
        pokemonDetail : {}
     }
  },
  methods: {
     openPokemonDetailModal : function(pokemonName){
        this.isLoading = true;
        this.$http.get('pokemon/' + pokemonName)
               .then(response => {
                  console.log(response.data);
                  this.pokemonDetail = response.data;
                  this.isLoading = false;
                  this.isPokemonDetailModalActive = true;
               });
        
     },
    getPokemons : function(){
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
               });
            });
            this.pokemons = pokemons;
            this.$store.commit("getPokemons", pokemons);

         })
    }
  },
  components: {
    Header,
    PokemonDetail
  },
  mounted(){
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
.type{
   padding: 5px;
   margin: 3px;
   border-radius: 3px;
}
.pointer{
   cursor: pointer;
}
</style>

