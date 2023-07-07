<template>
  <section class="filters">
    <div class="filters__wrapper">
      <div class="filters__input">
        <Input :textPlaceholder="'Поиск...'" @updateValue="onChangeTextFilter"></Input>
      </div>

      <div class="filters__filter-form" v-if="!isProject && !isUsers  ">
        <BaseButton class="button__second button_small" :nameIcon="'filter-form-icon'"></BaseButton>
      </div>

      <div class="filters__select">
        <InputSelectWButton :inputValueArray="dropdownFilter" :isUsers="isUsers" :isProject="isProject" :isTask="isTask" @onSortedValueSelected="onSortedSelectChange" @onOrderValueSelected="onOrderSelectChange"></InputSelectWButton>
      </div>

      <div class="filters__add-button" v-if="!isUsers">
        <BaseButton class="button__second" :title="'Добавить'"></BaseButton>
      </div>
    </div>
  </section>

</template>

<script>
import Input from "@/components/Inputs/Input.vue"
import InputSelect from "@/components/Inputs/InputSelect/InputSelect.vue"
import InputSelectWButton from "@/components/Inputs/InputSelectWButton/InputSelectWButton.vue"

import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"

import { mapState, mapGetters, mapActions } from "vuex"

export default {
  props: {
    isProject: {
      type: Boolean,
      default: false
    },
    isUsers: {
      type: Boolean,
      default: false
    },
    isTask: {
      type: Boolean,
      default: false
    },
    filterObj: {
      type: Object,
      default: function() {
        return {}
      }
    },
    dropdownFilter: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      filter: {},
      dropdownArray: []
    }
  },
  components: { 
    Input, InputSelect, InputSelectWButton,
    BaseButton 
  },
  computed: {},
  mounted() {
    this.setNewFilterObj();
  },
  watch: {
    filterObj() {
      this.setNewFilterObj();
    }
  },
  methods: {
    ...mapActions('projectsStore', { projectsSetFilterName :'setFilterName', projectsSetFilterSort :'setFilterSort', projectsSetFilterOrderType: 'setFilterOrderType' }),
    ...mapActions('usersStore', { usersSetFilterName :'setFilterName', usersSetFilterOrderType: 'setFilterOrderType' }),
    ...mapActions('tasksStore', { tasksSetFilterName :'setFilterName', tasksSetFilterSort :'setFilterSort', tasksSetFilterOrderType: 'setFilterOrderType' }),

    setNewFilterObj: function() {
      this.filter = Object.assign({}, this.filterObj);
    },
    
    onSortedSelectChange: function(event) {
      console.log("Sort ID: ",event.valId);
      console.log("Sort Text: ",event.val);

      let val = {
        id: event.valId,
        text: event.val
      };

      if (this.isProject) {
        this.projectsSetFilterSort(val)
      } else if (this.isTask) {
        this.tasksSetFilterSort(val)
      }
    },

    onOrderSelectChange: function(event) {
      console.log("Sort state: ",event.filterOrder);

      let val = event.filterOrder;

      if (this.isProject) {
        this.projectsSetFilterOrderType(val)
      } else if (this.isUsers) {
        this.usersSetFilterOrderType(val)
      } else if (this.isTask) {
        this.tasksSetFilterOrderType(val)
      }
    },

    onChangeTextFilter: function(event) {
      console.log("Search value: ",event.value);
      
      let val = event.value

      if (this.isProject) {
        this.projectsSetFilterName(val)
      } else if (this.isUsers) {
        this.usersSetFilterName(val)
      } else if (this.isTask) {
        this.tasksSetFilterName(val)
      }
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>