import { api } from '../../../configs/moviesApi'

const loadMovies = async ({ commit }, timeWindow = 'day') => { // timeWindow = day || week
    const mediaType = 'movie'
    let url = `3/trending/${mediaType}/${timeWindow}?api_key=${process.env.VUE_APP_MOVIE_API_KEY}`

    return await api.get(url)
        .then(res => {              
            console.log(res.data)  
            
            commit('LOAD_MOVIES', res.data)
        })
        .catch(() => {
            return Promise.reject(new Error('There was an error loading the movies'))
        }) 
}

export {
    loadMovies,
}