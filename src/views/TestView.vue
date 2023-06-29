<template>
  <div id="app">
    <Button :isPrim="true" :title="'Test'"></Button>
    <Button :title="'Test'"></Button>

    <Button :isPrim="true" :isSmall="true" :title="'1'"></Button>
    <Button :isSmall="true" :title="'1'"></Button>

    <IconButton :svgName="'more-icon'" :isPrim="true"></IconButton>
    <IconButton :svgName="'more-icon'"></IconButton>

    <Input :hideIcons="true" :textPlaceholder="'Введите текст...'" @updateValue="UpdateInputValue"></Input>
    <Input placeholder="Поиск..." :startValue="testInputClear" @updateValue="UpdateInputValue"></Input>
    <Input :isSmall="true" :textPlaceholder="'Поиск...'" @updateValue="UpdateInputValue"></Input>

    <DropdownButton :buttonsInitArray="dropDownData" :title="'Button'"></DropdownButton>
    <DropdownButton :buttonsInitArray="dropDownData" :title="'Button'" :isPrim="true"></DropdownButton>

    <DropdownIcon :buttonsInitArray="dropDownData"></DropdownIcon>
    <DropdownIcon :buttonsInitArray="dropDownData" :isPrim="true"></DropdownIcon>

    <InputSelect :inputValueArray="testSelectData" @onValueSelected="SelectedVal"></InputSelect>
    <InputSelect :inputValueArray="testSelectData" :isProfile="true" @onValueSelected="SelectedVal"></InputSelect>
    <InputSelect :inputValueArray="testSelectData" :isProfile="true" :isProfileSearch="true" @onValueSelected="SelectedVal"></InputSelect>
  </div>
</template>

<script>
import imgProfile from "@/assets/images/profile-img.jpg"

import Button from "@/components/Buttons/Button/Button.vue"
import IconButton from "@/components/Buttons/IconButton/IconButton.vue"

import Input from "@/components/Inputs/Input.vue"
import InputSelect from "@/components/Inputs/InputSelect/InputSelect.vue"

import DropdownButton from "@/components/Dropdown/DropdownButton/DropdownButton.vue"
import DropdownIcon from "@/components/Dropdown/DropdownIcon/DropdownIcon.vue"

export default {
  data() {
    return {
      testSelectData: [
        {
          text: "Кузьма Валерий Григорьевич",
          id: "test-1",
          profileImg: imgProfile
        },
        {
          text: "Калоша Алексей Викторович",
          id: "test-2",
          profileImg: imgProfile
        },
        {
          text: "Губной Карим Зембович",
          id: "test-3",
          profileImg: imgProfile
        },
        {
          text: "Кузьма Валерий Григорьевич",
          id: "test-4",
          profileImg: imgProfile
        },
        {
          text: "Калоша Алексей Викторович",
          id: "test-5",
          profileImg: imgProfile
        },
        {
          text: "Губной Карим Зембович",
          id: "test-6",
          profileImg: imgProfile
        },
        {
          text: "Кузьма Валерий Григорьевич",
          id: "test-7",
          profileImg: imgProfile
        },
        {
          text: "Калоша Алексей Викторович",
          id: "test-8",
          profileImg: imgProfile
        },
        {
          text: "Губной Карим Зембович",
          id: "test-9",
          profileImg: imgProfile
        },
        {
          text: "Кузьма Валерий Григорьевич",
          id: "test-10",
          profileImg: imgProfile
        },
        {
          text: "Калоша Алексей Викторович",
          id: "test-11",
          profileImg: imgProfile
        },
        {
          text: "Губной Карим Зембович",
          id: "test-12",
          profileImg: imgProfile
        },
      ],
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
      testInputClear: "Start Value",
    }
  },
  components: {
    Button, IconButton,
    Input, InputSelect,
    DropdownButton, DropdownIcon
  },
  computed: {},
  watch: {},
  methods: {
    UpdateInputValue(event) {
      console.log(event.value);
    },

    SelectedVal(event) {
      //console.log("\n");
      //console.log("ValID: ", event.valId);
      //console.log("Val: ", event.val);
      //console.log("\n");
    }
  }
}
</script>

<style lang="scss">

</style>