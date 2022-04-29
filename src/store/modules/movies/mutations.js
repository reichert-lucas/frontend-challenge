const LOAD_MOVIES = (state, movies) => {
    state.movies = movies
}

const UPDATE_PAGINATION = (state, pagination) => { 
    state.pagination = pagination
}

export {
    LOAD_MOVIES,
    UPDATE_PAGINATION
}