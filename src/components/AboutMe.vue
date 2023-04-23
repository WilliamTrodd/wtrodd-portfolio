<script setup lang="ts">
import { ref } from 'vue'

const active = ref('AboutMe')

</script>

<template>
  <div class='flex justify-around mb-4'>
    <button id='about-button' @click="active = 'AboutMe'"
      class='cursor-pointer text-center mx-2 pb-2 border-b-2 border-solid w-36 transition-all duration-500'
      :class="active === 'AboutMe' ? 'border-white' : 'border-primary-blue '">About</button>
    <button id='skills-button' @click="active = 'Skills'"
      class='cursor-pointer text-center mx-2 pb-2 border-b-2 border-solid w-36 transition-all duration-500'
      :class="active === 'Skills' ? 'border-white' : 'border-primary-blue '">Skills</button>
  </div>
  <div class='flex flex-col md:flex-row items-center md:justify-center justify-start pb-2 gap-2'>
    <img src='/web-developer.svg' class='w-56 md:w-2/5' />
    <div class='flex flex-col'>
      <div v-if="active === 'AboutMe'">
        <p class='text-lg w-96'>
          I'm a software engineer based in the UK. I've worked on a variety of
          projects, from small web apps to multi-user chat apps.
        </p>
        <p class='text-lg w-96'>
          I'm passionate about web development and the GreenTech and EdTech industries.
        </p>
      </div>
      <div v-if="active === 'Skills'">
        <p class='text-lg w-96'>
          JS/CSS/HTML, Node, Express, MongoDB,
          React, Vue, Tailwind, Astro
        </p>
      </div>
      <p class='text-lg w-96'>
        I'm currently looking for a role as a full-stack web developer.
      </p>
    </div>
  </div>
</template>