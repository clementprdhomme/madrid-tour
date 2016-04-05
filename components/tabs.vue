<template>
  <ul class="tabs">
    <li v-for="item in list"
        :class="item === active ? '-active' : ''"
        :style="'width: calc(100% / ' + list.length + ');'"
        @click="active = item">{{item}}</li>
  </ul>
</template>

<script>
export default {

  props: {
    list: {
      type: Array,
      required: true
    },
    active: {
      type: String
    }
  }

}
</script>

<style>
  @import "../css/settings.css";

  .tabs {
    margin: 0;
    padding: 0;
    list-style-type: none;
    height: 40px;
    box-shadow: 0 1px 1px rgba($color-2, .1);

    > li {
      height: 100%;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      display: inline-block;
      color: rgba($color-2, .5);

      &.-active {
        background-color: $color-7;
        color: $color-1;
        font-weight: 700;
      }
    }
  }
</style>
