<template>
  <div id="app">
    <!-- :isDisabled="true" -->
    <Button :isPrim="true" :title="'Test'"></Button>
    <Button :title="'Test'" ></Button>

    <Button :isPrim="true" :isSmall="true" :title="'1'"></Button>
    <Button :isSmall="true" :title="'1'"></Button>

    <IconButton :svgName="'more-icon'" :isPrim="true"></IconButton>
    <IconButton :svgName="'more-icon'"></IconButton>

    <InputField></InputField>
    <InputSearch></InputSearch>
    <InputSearch :isSmall="true"></InputSearch>

    <DropdownButton :buttonArray="dropDownData" :title="'Button'"></DropdownButton>
    <DropdownButton :buttonArray="dropDownData" :title="'Button'" :isPrim="true"></DropdownButton>
  
    <DropdownIcon :buttonArray="dropDownData"></DropdownIcon>
    <DropdownIcon :buttonArray="dropDownData" :isPrim="true"></DropdownIcon>
  </div>
</template>

<script>
import Button from "@/components/buttons/button/Button.vue"
import IconButton from "@/components/buttons/icon-button/IconButton.vue"

import InputField from "@/components/inputs/input-field/InputField.vue"
import InputSearch from "@/components/inputs/input-search/InputSearch.vue"

import DropdownButton from "@/components/dropdown/dropdown-button/DropdownButton.vue"
import DropdownIcon from "@/components/dropdown/dropdown-icon/DropdownIcon.vue"

export default {
  data() {
    return {
      dropDownData: [
        {
          text: 'Test 1',
        },
        {
          text: 'Test 2',
        },
        {
          text: 'Test 3',
        },
      ],
    }
  },
  components: {
    Button, IconButton,
    InputField, InputSearch,
    DropdownButton, DropdownIcon
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss">

</style>