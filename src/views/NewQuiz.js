export default {
  __route: {
    path: "/quiz/:quiz_slug/"
  },
  render() {
    const { quiz_slug } = this.$route.params
    const quiz = this.$store.quiz.getPage().find(q => q.slug === quiz_slug)
    this.$store.local.save({
      quiz: quiz.slug,
    }).then(({id}) => this.$router.replace(`/quiz/${quiz_slug}/${id}/`))
    return "<div>Woo</div>"
  }
}