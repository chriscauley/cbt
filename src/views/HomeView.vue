<template>
  <div>
    <div v-for="set in sets" :key="set.slug">
      <router-link :to="set.to">{{ set.name }}</router-link>
    </div>
  </div>
</template>

<script>
import sets from '@/data'
export default {
  __route: { path: '/' },
  computed: {
    sets() {
      return Object.entries(sets).map(([slug, questions]) => {
        const to = `/quiz/${slug}/`
        return { slug, questions, to, name: slug }
      })
    }
  }
}
</script>