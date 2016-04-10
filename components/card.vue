<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  @import "../css/settings.css";

  .card {
    box-shadow:0 1px 1px 1px rgba($color-2, .1);
    border-radius: 1px;
    padding-bottom: 15px;
    margin-bottom: 20px;

    > .content {
      padding: 0 15px;

      > .row {
        display: flex;
        justify-content: flex-start;

        > .col {
          margin-right: 10px;
          &:last-of-type { margin-right: 0; }
        }
      }
    }
  }
</style>
