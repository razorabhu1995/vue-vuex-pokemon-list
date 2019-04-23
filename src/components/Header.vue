<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
         <router-link :to="{name : 'home'}" class="navbar-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" width="112" height="28">
         </router-link>
      </div>
      <div class="buttons search-button">
         <router-link :to="{name : 'search'}" class="button">
            Search
         </router-link>
      </div>
   </nav>
</template>

<script>
export default {
  name: 'Header',
}
</script>
<style>
.search-button {
   position: absolute;
   right: 10px;
   top: 7px;
}
</style>


