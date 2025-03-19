<script>
export default {
  props: {
    label: String,
    field: String,
    options: Array,
    selectedValue: String,
  },
  methods: {
    handleChange(event) {
      // Emit the change event to parent with the updated value
      this.$emit("update:selectedValue", event.target.value);
    }
  }
};
</script>

<template>
  <div class="select-holder">
    <label :for="field">{{ label }}</label>
    <select :id="field" :value="selectedValue" @input="handleChange">
      <option value="">All</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select-holder {
  width: 50%;
}

.select-holder label{
  display: block;
  font-weight: bold;
  font-style: italic;
}

.select-holder select{
  width: fit-content;
  padding: .5em;
  margin-top: .5em;
  border-radius: .5rem;
  border: 1px solid #ddd;
}

</style>