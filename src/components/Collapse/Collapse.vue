<template>
  <div id="accordionExample" class="card-collapse accordion">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CollapseComp',
  provide() {
    return {
      addItem: this.addItem,
      removeItem: this.removeItem,
    };
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    addItem(item) {
      const index = item.$.uid;
      if (index !== -1) {
        this.items.splice(index, 0, item);
      }
    },
    removeItem(item) {
      const { items } = this;
      const index = items.indexOf(item);
      if (index > -1) {
        items.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped></style>
