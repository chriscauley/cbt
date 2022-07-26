<template>
  <div class="app-nav">
    <router-link to="/" class="btn -link">Instructions</router-link>
    <router-link to="/quiz/bhs/" class="btn -link">New Quiz</router-link>
    <div class="flex-grow" />
    <router-link
      v-for="link, i in links"
      :key="i"
      :to="link.to"
      class="btn -link"
      >
      {{ link.text }}
      <i class="fa fa-check" v-if="link.complete" />
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    links() {
      const { session_id } = this.$route.params
      if (!session_id) {
        return []
      }

      const session = this.$store.local.getOne(session_id)
      const links = this.$store.quiz.getPage().map(q => ({
        text: q.name,
        to: `/quiz/${q.slug}/${session_id}/`,
        complete: session[q.slug]?.length === q.questions.length
      }))
      if (links.filter(l => l.complete).length === 3) {
        links.push({
          to: `/summary/${session_id}`,
          text: "Summary",
        })
      }
      return links
    },
  }
}
</script>