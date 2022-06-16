import { LocalStorage } from '@unrest/vue-storage'

export default () => {
  const storage = LocalStorage('UNREST_APP')
  return storage
}