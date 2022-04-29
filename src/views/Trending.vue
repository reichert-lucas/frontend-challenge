<template>
    <div>
        Trending
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    methods: {
        ...mapActions('movies', ['loadMovies'])
    },

    computed: {
        ...mapState('movies', ['movies'])
    },

    created() {
        console.log(process.env.NODE_ENV)
        console.log(process.env.VUE_APP_MOVIE_API_KEY)
        this.loadMovies()
    }
}
</script>