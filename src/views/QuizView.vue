<template>
  <div>
    <h2>{{ quiz.name }}</h2>
    <div v-for="question, qi in quiz.questions" :class="css.question(qi)" :key="qi">
      <h3>{{ question.text }}</h3>
      <div v-for="answer, ai in question.answers" :class="css.answer(qi, ai)" :key="ai">
        {{ ai + 1 }}
        {{ answer }}
      </div>
    </div>
  </div>
</template>

<script>
import Mousetrap from '@unrest/vue-mousetrap'

export default {
  __route: {
    path: '/quiz/:quiz_slug/:session_id',
  },
  mixins: [Mousetrap.Mixin],
  computed: {
    mousetrap() {
      return {
        '0,1,2,3,4': this.pressNumber,
        'backspace': this.back,
      }
    },
    quiz() {
      const { quiz_slug } = this.$route.params
      return this.$store.quiz.getPage().find(q => q.slug === quiz_slug)
    },
    answers() {
      const session = this.$store.local.getOne(this.$route.params.session_id)
      const { quiz_slug } = this.$route.params
      if (!session[quiz_slug]) {
        session[quiz_slug] = []
      }
      return session[quiz_slug]
    },
    question_index() {
      return this.answers.length
    },
    css() {
      return {
        question: (qi) => ['question', qi === this.question_index && '-active'],
        answer: (qi, ai) => [
          'question',
          this.answers[qi] === ai && '-active',
        ],
      }
    },
  },
  methods: {
    pressNumber(event) {
      this.answers.push(parseInt(event.key - 1))
      const session = this.$store.local.getOne(this.$route.params.session_id)
      this.$store.local.save(session)
    },
    back() {
      this.answers.pop()
    }
  },
}
</script>

<style>
.question.-active {
  outline: 3px solid black;
}
</style>