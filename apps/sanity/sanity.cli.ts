import { defineCliConfig } from 'sanity/cli'
import { PROJECT_ID, DATASET } from './constants'

export default defineCliConfig({
  api: {
    projectId: PROJECT_ID,
    dataset: DATASET
  },
  studioHost: 'lidenskap'
})
