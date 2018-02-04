<template>
    <div class="Vueheader">
        这是head组件/
        <P>这是接口获取的数据{{list}}</P>
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
                    url:'/ssr',
                    type:"get",
                    success: function (data) {
                        _this.list = data.data.txt;
                        console.log(list)
                    }
                })
            })();
        }
    }
</script>