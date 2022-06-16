import local from './local'
import quiz from './quiz'

const store = {}
const modules = {
  local,
  quiz,
}

export default {
  install(app) {
    app.config.globalProperties.$store = store
    store._app = app

    Object.entries(modules).forEach(([name, module]) => {
      store[name] = module({ store })
    })
  }
}
