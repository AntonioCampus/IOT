<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <!-- Make the navbar and the footer available in all pages -->
  <header>
    <Navbar />
  </header>

  <RouterView /> <!-- Page content -->
  <Footer />
</template>

