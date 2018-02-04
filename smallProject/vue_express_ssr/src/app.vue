<template>
    <div id="app">
        <Vueheader></Vueheader>
        <div>hello , this app555!</div>
        <div>hhhh</div>
        <List></List>
        <router-view></router-view>
    </div>

</template>

<script>
    // (function setSessionSite(siteId){
    //     $.ajax({
    //         url:'/users',
    //         type:"get",
    //         success: function (data) {
    //            console.log(data);
    //         }
    //     })
    // })();
    import Vueheader from './components/Header';
    import List from './components/List';
    export default {
        name: "app",
        components: {
            Vueheader,
            List
        }
    }
</script>

<style scoped>
    body{color:red;}
</style>