import { createStore } from 'vuex'

import movies from './modules/movies'

const modules = { 
  movies
}

const store = new createStore({
    modules
})

export default store