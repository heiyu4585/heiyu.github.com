<template>
    <div class="wrap">
        <ul>
            <li v-for="(item,index) in list" @click="showTitle(item.title)">
                <img :src="item.image">
                <p>
                    {{item.title}}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {
            showTitle(title) {
                alert(title)
            }
        },
        mounted() {
            // Vue.axios.get('/data').then((response) => {
            //     const list = response.data.data.liveWodList
            //     this.list = list
            //     console.log(list)
            // })
                    var _this =this;
            (function setSessionSite(siteId){
                $.ajax({
                    url:'/users',
                    type:"get",
                    success: function (data) {
                        const list = data.data.liveWodList
                        _this.list = list
                        console.log(list)
                    }
                })
            })();
        }
    }
</script>