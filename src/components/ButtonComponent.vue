<template>
    <van-button @click="emit('click')">点击反馈</van-button>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  
  const emit = defineEmits(['click']);
  </script>