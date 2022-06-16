import { startCase } from 'lodash'

import bdi from './bdi-ii.yml'
import bhs from './bhs.yml'
import bai from './bai.yml'

const _1234 = (qs) => Object.fromEntries(qs.map(q => [q, [1, 2, 3, 4]]))
const _tf = (qs) => Object.fromEntries(qs.map(q => [q, ["True", "False"]]))

const sets = [
  {
    slug: 'bdi-ii',
    name: 'BDI-II',
    yaml: bdi,
  },
  {
    slug: 'bhs',
    name: 'BHS',
    yaml: _tf(bhs),
  },
  {
    slug: 'bai',
    name: 'BAI',
    yaml: _1234(bai),
  },
]

sets.forEach(set => {
  set.name = set.name || startCase(set.slug)
  set.to = `/set/${set.slug}/`
  set.questions = Object.entries(set.yaml).map(([text, answers]) => ({ text, answers }))
})

export default () => {
  return {
    getPage() {
      return sets
    }
  }
}