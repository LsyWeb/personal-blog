<template>
  <Layout>
    <template slot="main">
      <BlogList />
    </template>
    <template slot="right">
      <BlogCategory  />
    </template>
  </Layout>
  
</template>

<script>

import Layout from '@/components/Layout';
import BlogList from './components/BlogList';
import BlogCategory from './components/BlogCategory';
export default {
  components:{
    Layout,
    BlogList,
    BlogCategory
  },
  created(){
    console.log(this.$route);
  }
}
</script>

<style>

</style>