<template>
  <section class="profile">
    <div class="container">
      <div class="profile__wrapper">
        <div class="profile-info-img">
          <img :src="profileData.img" alt="Profile Image">

          <div class="profile-info-img__dropdown">
            <DropdownIcon :buttonsInitArray="dropDownDataImg"></DropdownIcon>
          </div>
        </div>

        <div class="profile-info">
          <div class="profile-info__header">
            <div class="profile-info__full-name">
              <h2 class="text text_prim text_h2">{{profileData.fullName}}</h2>
            </div>
            
            <div class="profile-info__status">
              <StatusTag :tagText="profileData.tag.tagText" :tagStatus="profileData.tag.tagStatus"></StatusTag>
            </div>
            
            <DropdownIcon :buttonsInitArray="dropDownData"></DropdownIcon>
          </div>

          <div class="profile-info__title">
            <p class="text text_disabled">О себе:</p>
          </div>

          <div class="profile-info__text">
            <p class="text text_black">
              {{profileData.about}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import StatusTag from "@/components/Status/StatusTag.vue"

import IconButton from "@/components/Buttons/IconButton/IconButton.vue"
import DropdownIcon from "@/components/Dropdown/DropdownIcon/DropdownIcon.vue"

import ProfileImg from "@/assets/images/profile-img.jpg";

export default {
  props: [],
  data() {
    return {
      profileData: {
        img: ProfileImg,
        fullName: "Котов Семен Васильевич",
        tag: {
          tagText: "Активен",
          tagStatus: "active"
        },
        about: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового \
                океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения \
                залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни. Однажды одна маленькая строчка рыбного \
                текста по имени Lorem ipsum решила выйти в большой мир грамматики. Великий Оксмокс предупреждал ее о злых запятых, диких знаках вопроса и коварных точках с запятой, \
                но текст не дал сбить себя с толку. Он собрал семь своих заглавных букв, подпоясал инициал за пояс и пустился в дорогу. Взобравшись на первую вершину курсивных гор, \
                бросил он последний взгляд назад, на силуэт своего родного города Буквоград, на заголовок деревни Алфавит и на подзаголовок своего переулка Строчка. Грустный \
                риторический вопрос скатился по его щеке и он продолжил свой путь. По дороге встретил текст рукопись. Она предупредила его: «В моей стране все переписывается по \
                несколько раз. Единственное, что от меня осталось, это приставка «и». Возвращайся ты лучше в свою безопасную страну». Не послушавшись рукописи, наш текст продолжил \
                свой путь. Вскоре ему повстречался коварный составитель рекламных текстов, напоивший его языком и речью и заманивший в свое агенство, которое использовало его снова \
                и снова в своих проектах. И если его не переписали, то живет он там до сих пор. Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. \
                Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми \
                необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над \
                рыбными текстами, ведущими безорфографичный образ жизни. Однажды одна маленькая строчка р."

      },
      dropDownDataImg: [
        {
          text: "Редактировать"
        },
        {
          text: "Удалить",
          isAttention: true
        }
      ],
      dropDownData: [
        {
          text: 'Редактировать',
        },
        {
          text: 'Изменить пароль',
        },
        {
          text: 'Просмотр задач пользователя ',
        },
      ],
    }
  },
  components: {StatusTag, IconButton, DropdownIcon},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang='scss'>
@import './index.scss';
</style>