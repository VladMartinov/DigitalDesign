<template>
  <div id="app">
    <Button :isPrim="true" :title="'Test'"></Button>
    <Button :title="'Test'"></Button>

    <Button :isPrim="true" :isSmall="true" :title="'1'"></Button>
    <Button :isSmall="true" :title="'1'"></Button>

    <IconButton :svgName="'more-icon'" :isPrim="true"></IconButton>
    <IconButton :svgName="'more-icon'"></IconButton>

    <Input :hideIcons="true" :textPlaceholder="'Введите текст...'"></Input>
    <Input placeholder="Поиск..."></Input>
    <Input :isSmall="true" :textPlaceholder="'Поиск...'"></Input>

    <DropdownButton :buttonsInitArray="dropDownData" :title="'Button'"></DropdownButton>
    <DropdownButton :buttonsInitArray="dropDownData" :title="'Button'" :isPrim="true"></DropdownButton>

    <DropdownIcon :buttonsInitArray="dropDownData"></DropdownIcon>
    <DropdownIcon :buttonsInitArray="dropDownData" :isPrim="true"></DropdownIcon>
  </div>
</template>

<script>
import Button from "@/components/Buttons/Button/Button.vue"
import IconButton from "@/components/Buttons/IconButton/IconButton.vue"

import Input from "@/components/Inputs/Input.vue"

import DropdownButton from "@/components/Dropdown/DropdownButton/DropdownButton.vue"
import DropdownIcon from "@/components/Dropdown/DropdownIcon/DropdownIcon.vue"

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
    Input,
    DropdownButton, DropdownIcon
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss">

</style>