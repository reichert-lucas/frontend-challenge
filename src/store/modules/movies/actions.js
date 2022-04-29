import { api } from '../../../configs/moviesApi'

const loadMovies = async ({ commit, state }, timeWindow = 'day') => { // timeWindow = day || week
    const mediaType = 'movie'
    let url = `3/trending/${mediaType}/${timeWindow}?api_key=${process.env.VUE_APP_MOVIE_API_KEY}&page=${state.pagination.current_page}`

    return await api.get(url)
        .then(res => {              
            const pagination = {
                "current_page": res.data.page,
                "last_page": res.data.total_pages,
                "total_records": res.data.total_results,
            }
            
            commit('UPDATE_PAGINATION', pagination)
            commit('LOAD_MOVIES', res.data.results)
        })
        .catch(() => {
            return Promise.reject(new Error('There was an error loading the movies'))
        }) 
}

const setPage = async ({ commit, state }, current_page) => {
    const pagination = {
        "current_page": current_page,
        "last_page": state.pagination.last_page,
        "total_records": state.pagination.total_records,
    }

    commit('UPDATE_PAGINATION', pagination)
}

export {
    loadMovies,
    setPage
}