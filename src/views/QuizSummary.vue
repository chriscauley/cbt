<template>
  <div>
    <div v-for="score in scores" :key="score">
      {{ score }}
    </div>
  </div>
</template>

<script>
import { sum } from 'lodash'

export default {
  __route: {
    path: '/summary/:session_id/'
  },
  computed: {
    scores() {
      const bhs_key = [
        false, //1
        true,
        false,
        true,
        false, // 5
        false,
        true,
        false,
        true,
        false, // 10
        true,
        true,
        false,
        true,
        false, // 15
        true,
        true,
        true,
        false,
        true,
      ]
      const scores = []
      const session = this.$store.local.getOne(this.$route.params.session_id)
      this.$store.quiz.getPage().forEach(q => {
        let answers = session[q.slug].slice()
        if (q.slug === 'bhs') {
          const remap = { 0: true, 1: false }
          answers = answers.map((a,ai) => {
            return Number(remap[a] === bhs_key[ai])
          })
        }
        scores.push(`${q.slug} - ${sum(answers)}`)
      })
      return scores
    },
  },
}
</script>
