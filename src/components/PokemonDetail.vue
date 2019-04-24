<template>
          <div>
            <header class="modal-card-head">
               <p class="modal-card-title has-text-weight-bold">{{pokemonDetail.name}}</p>
            </header>
               <div class="card">
                  <div class="card-content">
                     <div class="media">
                           <div class="media-left">
                              <figure class="image is-128x128">
                                 <img :src="(pokemonDetail.sprites)?pokemonDetail.sprites.front_default : 'https://bulma.io/images/placeholders/128x128.png'" alt="Image">
                              </figure>
                           </div>
                           <div class="media-content">
                              <div style="margin-bottom: 10px;">
                                 <span v-for="(type,index) in pokemonDetail.types" :key="index">
                                    <span class="card type" v-if="type.type.name == 'normal'" style="background-color: bisque;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'fighting'" style="background-color: mediumspringgreen;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'flying'" style="background-color: wheat;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'poison'" style="background-color: mediumpurple;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'ground'" style="background-color: sandybrown;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'rock'" style="background-color: dimgrey;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'bug'" style="background-color: greenyellow;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'ghost'" style="background-color: darkcyan;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'steel'" style="background-color: silver;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'fire'" style="background-color: red;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'water'" style="background-color: skyblue;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'grass'" style="background-color: lightgreen">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'electric'" style="background-color: yellow;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'psychic'" style="background-color: steelblue;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'ice'" style="background-color: powderblue;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'dragon'" style="background-color: darkgoldenrod;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'fairy'" style="background-color: deeppink;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'unknown'" style="background-color: transparent;">{{type.type.name}}</span>
                                    <span class="card type" v-if="type.type.name == 'shadow'" style="background-color: darkgrey;">{{type.type.name}}</span>
                                 </span>
                              </div>
                              
                              <p class="is-size-6 has-text-grey"> height : {{pokemonDetail.height}} inches</p>
                              <p class="is-size-6 has-text-grey"> weight : {{pokemonDetail.weight / 10}} Kgs</p>
                           </div>
                     </div>
                     <hr>
                     <h5 class="has-text-weight-bold" style="margin-bottom:10px;">Abilities : </h5>
                     <div class="columns is-multiline is-variable is-2">
                        <div class="column is-half" v-for="(ability,index) in pokemonDetail.abilities" :key="index">
                           <div class="card" style="border-radius:3px;text-align:center;background-color: gainsboro;">
                              {{ability.ability.name}}
                           </div>
                        </div>
                     </div>
                     <hr>
                     <h5 class="has-text-weight-bold" style="margin-bottom:10px;">Skills : </h5>
                     <div class="columns is-multiline is-variable is-2">
                        <div class="column is-half" v-for="(move,index) in pokemonDetail.moves" :key="index">
                           <div class="card" style="border-radius:3px;text-align:center;">
                              {{move.move.name}}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>            
            </div>
</template>
<script>
export default {
   props: {
      pokemonDetail : {
         type: Object,
         required : true
      }
   },
   data (){
      return{
      }
   },
}
</script>
