<template>
  <div class="filter-form">
    <div class="filter-form__rows-wrapper">
      <div class="filter-form__row">
        <p class="foter-from__lable text text_disabled">Статус</p>

        <MultiInputSelect :inputValueArray="statusDropDown" :currentValue="filterFormObject.status" @onValueSelected="onStatusSelected"></MultiInputSelect>
      </div>

      <div class="filter-form__row">
        <p class="foter-from__lable text text_disabled">Автор</p>

        <MultiInputSelect :isUsers="true" :inputValueArray="dataOfUsers" :currentValue="filterFormObject.author" @onValueSelected="onAuthorSelected"></MultiInputSelect>
      </div>
      
      <div class="filter-form__row">
        <p class="foter-from__lable text text_disabled">Исполнитель</p>

        <MultiInputSelect :isUsers="true" :inputValueArray="dataOfUsers" :currentValue="filterFormObject.executor" @onValueSelected="onExecutorSelected"></MultiInputSelect>
      </div>

      <div class="filter-form__row">
        <p class="foter-from__lable text text_disabled">Дата создания</p>

        <div class="filter-form__datepicker-wrapper">
          <div class="filter-form__datepicker-item-wrapper">
            <InputSelectDate :currentValue="filterFormObject.dateStart" @onSelectDate="onSelectedDateStart"></InputSelectDate>
          </div>

          <span class="text text_prim">-</span>

          <div class="filter-form__datepicker-item-wrapper">
            <InputSelectDate :currentValue="filterFormObject.dateEnd" @onSelectDate="onSelectedDateEnd"></InputSelectDate>
          </div>
        </div>
      </div>
    </div>

    <div class="filter-form__buttons">
      <BaseButton class="button__second" :title="'Очистить'" @onButtonClick="onCloseButton"></BaseButton>

      <BaseButton class="button__primary" :title="'Применить'" @onButtonClick="onAcceptButton"></BaseButton>
    </div>
  </div>
</template>

<script>
import MultiInputSelect from "@/components/Inputs/MultiInputSelect/MultiInputSelect.vue"

import InputSelectDate from "@/components/Inputs/InputSelectDate/InputSelectDate.vue"

import BaseButton from "@/components/Buttons/BaseButton/BaseButton.vue"

import { mapState, mapGetters, mapActions } from "vuex"

export default {
  props: {
    filterObj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      statusDropDown: [
        {
          text: "Черновик",
          id: "DRAFT"
        },
        {
          text: "В работе",
          id: "IN_PROCESS"
        },
        {
          text: "Завершена",
          id: "COMPLETED"
        },
        {
          text: "Тестирование",
          id: "TESTING"
        },
        {
          text: "Выполнена",
          id: "TESTING_DONE"
        },
        {
          text: "Закрыта",
          id: "CLOSED"
        },
        {
          text: "Удалена",
          id: "DELETED"
        }
      ],
      dataOfUsers: [],

      filterFormObject: {
        status: [],
        author: [],
        executor: [],
        dateStart: '',
        dateEnd: ''
      }
    }
  },
  components: {
    MultiInputSelect,
    InputSelectDate,
    BaseButton,
  },
  computed: {
    ...mapGetters(['getToken']),
  },
  created() {
    this.filterFormObject.status = this.filterObj.status;
    this.filterFormObject.author = this.filterObj.author;
    this.filterFormObject.executor = this.filterObj.executor;
    this.filterFormObject.dateStart = this.filterObj.dateStart;
    this.filterFormObject.dateEnd = this.filterObj.dateEnd;

    this.getCurrentUsersList();
  },
  watch: {},
  methods: {
    getCurrentUsersList() {
      let token = this.getToken;

      if (!token) {
        console.log("Token is empty or undefind: ", token);
        this.setLoadingState(false);

        return
      }

      let data = {
        limit: 10000
      }

      this.$api.post.searchUsers(data, token)
        .then(({data}) => {
          this.dataOfUsers = data.users.map((user) => { return Object.assign({}, user) })
        })
        .catch(e => {
          console.log(e)
          this.setLoadingState(false)
        })
    },

    onCloseButton: function() {
      this.filterFormObject = {
        status: [],
        author: [],
        executor: [],
        projectId: '',
        dateStart: '',
        dateEnd: ''
      };
      this.$emit('onClearForm', {
        filterObj: this.filterFormObject
      })
    },

    onAcceptButton: function() {
      console.log("Accept");
      this.$emit('onAcceptForm', {
        filterObj: this.filterFormObject
      })
    },

    onStatusSelected: function(event) {
      this.filterFormObject.status = event.valArray;
    },

    onAuthorSelected: function(event) {
      this.filterFormObject.author = event.valArray;
    },

    onExecutorSelected: function(event) {
      this.filterFormObject.executor = event.valArray;
    },

    onSelectedDateStart: function(event) {
      this.filterFormObject.dateStart = event.dateISO;
    },

    onSelectedDateEnd: function(event) {
      this.filterFormObject.dateEnd = event.dateISO;
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>