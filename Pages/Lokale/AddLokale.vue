<template>
  <div>

    <button @click="addItem">Add Lokale Item</button>

  </div>
</template>

<script>

export default {
  methods: {
    addItem() {
        this.$emit('addItem');
    },
  },
};
</script>

<style scoped>
/* Component-specific styles go here */
</style>
