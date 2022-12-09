<template>
  <div class="accordion">
    <AccordionItem>
      <slot></slot>
    </AccordionItem>
    <AccordionItem>
      <slot></slot>
    </AccordionItem>
  </div>
</template>

<script>
import AccordionItem from "./AccordionItem";

export default {
  name: "Accordion",
  components: {AccordionItem},
  props: ['data'],
  data() {
    return {
      selectedItem: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.accordion
  width: 100%

</style>
