<template>
    <div class="container__movies">
        <h2>Trending</h2>

        <div v-if="loading">
            Só mais um momento, estamos carregando os filmes...
        </div>

        <div v-else-if="!movies.length">
            Nenhum filme encontrado
        </div>

        <div v-else>
            <div class="container__movies__list">
                <div v-for="movie in movies" :key="movie.id"
                    class="container__movies__list__item"
                >
                    <img :src="`${imagesUrl}${movie.poster_path}`">

                    <div class="container__movies__list__item__text">
                        <h4>{{ movie.title }}</h4>
                        <span class="container__movies__list__item__text__subtitle">{{ movie.release_date }}</span>
                    </div>

                    <div class="container__movies__list__item__rank">

                        <span>&#11088;</span>
                        {{ movie.vote_average }}
                    </div>
                </div>
            </div>

            <div class="container__pagination">
                <a href="" @click.prevent="previusPage()" class="container__pagination__btn"> 
                    <arrow-left /> 
                </a>

                <input type="number" min="1" :max="pagination.last_page" v-model="page" @keyup.enter="toPage">

                <a href="" @click.prevent="nextPage()" class="container__pagination__btn"> 
                    <arrow-right /> 
                </a>
            </div>
        </div>


    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ArrowLeft from '../components/icons/ArrowLeft'
import ArrowRight from '../components/icons/ArrowRight'

export default {
    data() {
        return {
            loading: false,
            page: 1,
            imagesUrl: null
        }
    },

    components: {
        ArrowLeft,
        ArrowRight
    },

    methods: {
        ...mapActions('movies', ['loadMovies', 'setPage']),

        previusPage() {
            if (this.pagination.current_page <= 1) return

            this.page = this.pagination.current_page - 1
            this.toPage()
        },

        nextPage() {
            if (this.pagination.current_page >= this.pagination.last_page) return

            this.page = this.pagination.current_page + 1
            this.toPage()
        },

        toPage() {
            if (this.page > this.pagination.last_page) return
            if (this.page < 1) return

            this.loading = true

            this.setPage(this.page)
            this.loadMovies()
                .finally(() => this.loading = false) 
        }
    },

    computed: {
        ...mapState('movies', ['movies', 'pagination'])
    },

    created() {
        this.loading = true
        this.imagesUrl = process.env.VUE_APP_MOVIE_API_IMAGE_URL

        this.loadMovies()
            .then(() => {
                console.log('movies are loaded')
                this.page = this.pagination.current_page
            })
            .finally(() => this.loading = false) 

    }
}
</script>

<style lang="scss" scoped>
    .container__movies {
        margin: 0;
        padding: 40px 0px;
        width: 90vw;
        box-sizing: border-box;
        margin: auto;
    }

    .container__pagination {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        input {
            width: 56px;
            height: 24px;
            border: 1px solid gray;
            border-radius: 6px;
            margin: 4px;
            outline: 0;
            text-align: center;
            color: gray;
            background: whitesmoke;

            &:hover, &:focus {
                color: var(--primary);
                border-color: var(--primary);
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            &[type=number] {
                -moz-appearance:textfield;
            }
        }

        &__btn {
            svg {
                width: 48px;
            }
        }
    }

    .container__movies__list {
        width: 100%;
        padding: 32px 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        &__item {
            width: 500px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 8px;
            margin: 8px;
            background: whitesmoke;
            border-radius: 6px;
            flex-wrap: wrap;
            position: relative;

            img {
                width: 140px;
                padding: 4px;
                border-radius: 8px;
            }

            @media (max-width: 600px) {
                width: 80%;
            }

            &__text {
                margin-left: 8px;
                max-width: calc(100% - 160px);
                text-align: left;

                &__subtitle {
                    font-size: 12px;
                    color: gray;
                    font-weight: 600;
                }

                h4 {
                    font-size: 18px;
                    text-align: left;
                    margin-bottom: 0;
                }

                @media (max-width: 600px) {
                    width: 100%;
                }
            }

            &__rank {
                position: absolute;
                bottom: 8px;
                right: 8px;
            }
        }
    }
</style>