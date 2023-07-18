<template>
  <div class="task__content-wrapper">
    <!-- header -->
    <div class="task__header">
      <div class="task__code-row">
        <div class="task__code-info">
          <h2 class="text text_prim text_h2">Код проекта</h2>
          <h2 class="text text_prim text_h2">{{ project?.code ? project.code : null }}</h2>
        </div>

        <DropdownIcon v-if="currentUserRole.isAuthor || currentUserRole.isAdmin" :isDisabled="isTesting || isTestingDone" :buttonsInitArray="buttonDropdownData" @ActionSelected="onSelectAction"></DropdownIcon>

      </div>

      <div class="task__title">
        <h2 class="text text_prim text_h2">{{ task.name }}</h2>
      </div>

      <div class="task__info">
        <div class="task__status">
          <StatusTag :tag="task.status"></StatusTag>
        </div>

        <div class="task__date-create">
          <Tooltip :textInner="'Создана' + correctTimeToString(task.dateCreated).date" :time="task.dateCreated"></Tooltip>
        </div>

        <UserInfoTag :user="findUser(task.author) || null"></UserInfoTag>
      </div>
    </div>
    <!-- // header -->

    <!-- main -->
    <div class="task__main">
      <div class="task__desc" v-if="(task.dateEdited !== null && task.authorEdited !== null) || task.description !== ''">
        <div class="task__desc-text" v-if="task.description !== ''">
          <p class="text text_prim">{{ task.description }}</p>
        </div>

        <div class="task__desc-info" v-if="task.dateEdited !== null && task.authorEdited !== null">
          <Tooltip :textInner="'Задача отредактирована' + correctTimeToString(task.dateEdited).date" :time="task.dateEdited"></Tooltip>

          <UserInfoTag :user="findUser(task.authorEdited) || null"></UserInfoTag>
        </div>
      </div>

      <div class="task__activity-title">
        <h2 class="text text_prim text_h2">Активность</h2>
      </div>

      <div class="task__activity-wrapper" v-if="isActionsSorted">
        <div class="task__activity-action" v-for="(action, index) in actionsSortedArray" v-bind:key="index">
          <!-- history-item -->
          <div class="task__history-wrapper" v-if="action.type === 'history'">
            <UserInfoTag :user="findUser(action.item.author) || null"></UserInfoTag>

            <div class="task__history-info" :class="{ 'no-margin' : action.item.field === 'executor' && action.item.newValue !== '' }">
              <span class="text text_disabled">{{ validHistoryText(action.item.field, action.item.newValue) }}</span>
            </div>

            <div class="task__history-executor" v-if="action.item.field === 'executor' && action.item.newValue !== ''">
              <UserInfoTag :user="findUser(action.item.newValue) || null"></UserInfoTag>
            </div>

            <div class="task__history-status" v-if="action.item.field === 'status'">
              <StatusTag :tag="action.item.newValue"></StatusTag>
            </div>

            <div class="task__history-spend-time" v-if="action.item.field === 'time'">
              <span class="text text_prim">{{ taskTimeToView(action.item.newValue) }}</span>
            </div>

            <div class="task__history-time">
              <Tooltip :textInner="correctTimeToString(action.item.dateEdited).date" :time="action.item.dateEdited"></Tooltip>
            </div>
          </div>
          <!-- // history-item -->

          <!-- comment-item -->
          <div class="task__comment-wrapper" v-else-if="action.type === 'comment' && action.item.parentId === null">
            <div class="task__comment-title">
              <div class="task__comment-user">
                <UserInfoTag :user="findUser(action.item.author) || null"></UserInfoTag>
              </div>

              <div class="task__comment-date">
                <Tooltip :textInner="correctTimeToString(action.item.dateCreated).date" :time="action.item.dateCreated"></Tooltip>
              </div>
            </div>

            <div class="task__comment-content" v-if="commentToUpdate !== action.item._id">
              <div class="task__comment-text">
                <span class="text text_prim">{{ action.item.text }}</span>
              </div>

              <div class="task__comment-button" v-if="currentUserId === action.item.author || currentUserRole.isAdmin">
                <DropdownIcon :buttonsInitArray="buttonDropdownData" @ActionSelected="onCommentAction(action.item._id, action.item.text, $event)"></DropdownIcon>
              </div>
            </div>

            <div class="task__comment-update" v-if="commentToUpdate === action.item._id">
              <InputSend placeholder="Ответить..." :startValue="action.item.text" :isUpdate="true" @onSendValue="SendNewChildComment(action.item._id, true, $event)" @onCloseUpdate="onCloseUpdateComment"></InputSend>
            </div>

            <!-- child-comment -->
            <div class="task__child-comment-wrapper" v-for="(comment, index) in findChildComments(action.item._id)" v-bind:key="index">
              <div class="task__child-comment">
                <div class="task__comment-title">
                  <div class="task__comment-user">
                    <UserInfoTag :user="findUser(comment.item.author) || null"></UserInfoTag>
                  </div>

                  <div class="task__comment-date">
                    <Tooltip :textInner="correctTimeToString(comment.item.dateCreated).date" :time="comment.item.dateCreated"></Tooltip>
                  </div>
                </div>

                <div class="task__comment-content" v-if="commentToUpdate !== comment.item._id">
                  <div class="task__comment-text">
                    <span class="text text_prim">{{ comment.item.text }}</span>
                  </div>

                  <div class="task__comment-button" v-if="currentUserId === comment.item.author || currentUserRole.isAdmin">
                   <DropdownIcon :buttonsInitArray="buttonDropdownData" @ActionSelected="onCommentAction(comment.item._id, comment.item.text, $event)"></DropdownIcon>
                  </div>
                </div>

                <div class="task__comment-update" v-if="commentToUpdate === comment.item._id">
                  <InputSend placeholder="Ответить..." maxlength="1023" :startValue="comment.item.text" :isUpdate="true" @onSendValue="SendNewChildComment(comment.item._id, true, $event)" @onCloseUpdate="onCloseUpdateComment"></InputSend>
                </div>
              </div>
            </div>

            <div class="task__comment-footer">
              <InputSend placeholder="Ответить..." @onSendValue="SendNewChildComment(action.item._id, false, $event)"></InputSend>
            </div>
            <!-- // child-comment -->
          </div>
          <!-- // comment-item -->
        </div>
      </div>
    </div>
    <!-- // main -->

    <!-- footer -->
    <div class="task__footer">
      <InputSend placeholder="Комментировать..." @onSendValue="SendNewComment"></InputSend>
    </div>
    <!-- // footer -->

    <ModalDelete v-if="isModalDeleteComment" :title="commentToDelete.text" :typeItem="'комментарий'" @onSelectedAction="onDeleteComment"></ModalDelete>
    <ModalDelete v-if="isModalDeleteTask" :title="task.name" :typeItem="'задачу'" @onSelectedAction="onDeleteAction"></ModalDelete>
  </div>
</template>

<script>
import { ItemDate } from "@/components/mixins/itemDate"

import DropdownIcon from '@/components/Dropdown/DropdownIcon/DropdownIcon.vue';

import StatusTag from '@/components/Status/StatusTag.vue';
import UserInfoTag from '@/components/UserInfoTag/UserInfoTag.vue';

import Input from '@/components/Inputs/Input.vue';
import Textarea from '@/components/Inputs/Textarea/Textarea.vue';
import BaseButton from '@/components/Buttons/BaseButton/BaseButton.vue';
import InputSend from '@/components/Inputs/InputSend/InputSend.vue';

import Tooltip from '@/components/ToolTip/Tooltip/Tooltip.vue';

import ModalDelete from '@/components/Modal/ModalDelete/ModalDelete.vue';

export default {
  mixins: [ ItemDate ],
  props: {
    currentUserId: {
      type: String,
      default: ""
    },
    currentUserRole: {
      type: Object,
      default: function() {
        return {};
      }
    },
    users: {
      type: Array,
      default: function() {
        return [];
      }
    },
    task: {
      type: Object,
      default: function() {
        return {};
      }
    },
    history: {
      type: Array,
      default: function() {
        return [];
      }
    },
    comments: {
      type: Array,
      default: function() {
        return [];
      }
    },
    project: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      buttonDropdownData: [
        {
          id: 'update',
          text: 'Редактировать',
        },
        {
          id: 'delete',
          text: 'Удалить',
          isAttention: true,
        },
      ],

      showedComments: [],

      actionsSortedArray: null,
      isActionsSorted: false,

      commentToUpdate: "",

      commentToDelete: {
        id: "",
        text: ""
      },

      isModalDeleteTask: false,
      isModalDeleteComment: false,
    }
  },
  components: {
    DropdownIcon,
    StatusTag, UserInfoTag,
    ModalDelete, Tooltip,
    Input, BaseButton, Textarea, InputSend
  },
  computed: {
    isTesting() {
      return this.task.status === "TESTING";
    },
    isTestingDone() {
      return this.task.status === "TESTING_DONE"
    }
  },
  mounted() {
    this.sortActionsArray();
  },
  watch: {
    history() {
      this.sortActionsArray();
    },

    comments() {
      this.sortActionsArray();
    }
  },
  methods: {
    findUser(id) {
      return this.users.find((user) => {
        if (user._id === id) return true;
      })
    },

    findChildComments(parentId) {
      let childCommentsArray = this.actionsSortedArray.filter((action) => {
        if (action.type === "comment" && action.item.parentId === parentId) return action;
      })

      return childCommentsArray && childCommentsArray.length > 0 ? childCommentsArray : null;
    },

    sortActionsArray: function() {
      this.isActionsSorted = false;
      this.actionsSortedArray = [];

      Array.prototype.push.apply(this.actionsSortedArray, this.history.map((historyItem) => { return { item: Object.assign({}, historyItem), type: "history" } }));
      Array.prototype.push.apply(this.actionsSortedArray, this.comments.map((comment) => { return { item: Object.assign({}, comment), type: "comment" } }));

      this.actionsSortedArray.sort((a, b) => {
        let aItemDate = a.type === "history" ? a.item.dateEdited : a.item.dateCreated;
        let bItemDate = b.type === "history" ? b.item.dateEdited : b.item.dateCreated;

        return (aItemDate < bItemDate) ? -1 : ((aItemDate > bItemDate) ? 1 : 0);
      });

      this.isActionsSorted = true;
    },

    validHistoryText: function(field, value) {
      if (field === "name") return "изменил(а) название";
      if (field === "description") return "изменил(а) описание";
      if (field === "executor" && value !== "") return "назначил(а) исполнителя";
      if (field === "executor" && value === "") return "удалил(а) исполнителя";
      if (field === "status") return "изменил(а) статус на";
      if (field === "time") return "списал(а) затраченное время";
      else return "Not found...";
    },

    onCommentAction: function(id, text, event) {
      if (event.id === "delete") {
        this.commentToDelete.id = id;
        this.commentToDelete.text = text;

        this.isModalDeleteComment = true;
      } else if (event.id === "update") {
        this.commentToUpdate = id;
      }
    },

    onCloseUpdateComment: function() {
      this.commentToUpdate = "";
    },

    SendNewComment: function(event) {
      this.$emit("CreateComment", {
        data: {
          "taskId": this.task._id,
          "text": event.value
        }
      })

      this.newComment = "";
    },

    SendNewChildComment: function(commentId, isUpdate, event) {
      if (this.isChildCommentDataEmpty) return;

      if (isUpdate) {
        this.$emit("UpdateComment", {
          data: {
            "_id": commentId,
            "taskId": this.task._id,
            "text": event.value
          }
        })

        this.commentToUpdate = "";
      } else {
        this.$emit("CreateComment", {
          data: {
            "taskId": this.task._id,
            "text": event.value,
            "parentId": commentId
          }
        })

        this.newChildComment = "";
      }

    },

    onSelectAction: function(event) {
      if (event.id === "update") this.$router.push({ name: 'PageUpdateTask', params: { isCreate: false, idTask : this.task._id } })
      else if (event.id === "delete") this.isModalDeleteTask = true;
      else return;
    },

    onDeleteAction: function(event) {
      this.isModalDeleteTask = false;
      if (!event.isAccept) return;

      this.$emit("DeleteTask", {})
    },

    onDeleteComment: function(event) {
      this.isModalDeleteComment = false;
      if (!event.isAccept) return;

      this.$emit('DeleteComment', {
        _id: this.commentToDelete.id
      })

      this.commentToDelete = {
        id: "",
        text: ""
      }
    }
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>