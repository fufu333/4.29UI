<template>
    <van-field
      v-model="localValue"
      clearable
      @keyup.enter="submit"
    />
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps(['modelValue']);
  const emit = defineEmits(['input', 'submit']);
  
  const localValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('input', value),
  });
  
  const submit = () => {
    emit('submit');
  };
  </script>