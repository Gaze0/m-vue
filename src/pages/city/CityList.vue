<template>
  <div class="city-wrap">
    <van-index-bar :index-list="indexList" v-if='hotCities.length>0'>
      <div class="list-view">
        <section>
          <li class="list-group">
            <van-index-anchor index="热门" class="list-group-title">热门城市</van-index-anchor>
            <ul class="hot-cities-list">
              <li class="list-group-item" v-for=" (hotcity,index) in hotCities" :key="index"  @click="changeCity(hotcity.id,hotcity.city_name)">
                <span class="name">{{hotcity.city_name}}</span>
              </li>
             
            </ul>
          </li>
          <li class="list-group" v-for="(city,key) in allCities" :key="key" :ref="key">
            <van-index-anchor :index="key" class="list-group-title">{{key}}</van-index-anchor>
            <ul class="list-group-ul">
              <li class="list-group-item" v-for="c in city" :key="c.id" @click="changeCity(c.id,c.city_name)">
                <span class="name">{{c.city_name}}</span>
              </li>
            </ul>
          </li>
        </section>
      </div>
    </van-index-bar>
    <Loading v-else></Loading>
  </div>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor } from "vant";
Vue.use(IndexBar).use(IndexAnchor);
import { get } from "utils/http";
import _ from "lodash";
import store from 'store'
import Loading from 'components/Loading'
import INFO_ACTIVE from 'vuestore/active-type'
export default {
  data() {
    return {
      hotCities: [],
      allCities: {},
    };
  },
  created() {
    this.indexListInit = ["热门"];
  },
  async mounted() {
    let result = await get({
      url: "/api/user/allCityList",
      params: {}
    });
    this.hotCities = result.data.hotCities;
    this.allCities = result.data.allCities;
    let chunkedResult = _.groupBy(this.allCities, val => {
      return val.spell.substr(0, 1).toUpperCase();
    });
    let reducedResult = Object.keys(chunkedResult)
      .sort()
      .reduce((obj, key) => {
        obj[key] = chunkedResult[key];
        return obj;
      }, {});
    // console.log(reducedResult)
    this.allCities = reducedResult;
    await this.$nextTick();
   
  },
  methods: {
    changeCity(id,nm){
      // console.log(city)
      // this.$router.push({name:'home', params:{city}})
      // sessionStorage.setItem('city',city)
      store.set('currentCity',{
        id,nm
      })
      this.$store.dispatch('saveCity',{id,nm})
      this.$router.back()
    }
  },
  computed: {
    indexList() {
      return [...this.indexListInit, ...Object.keys(this.allCities).sort()];
    }
  },
  components:{
    Loading
  }
};
</script>

<style lang="stylus" scoped>
.city-wrap{
    flex 1
    background #000
    overflow scroll
    li{
      list-style none
    }
    .list-view{
        padding: .2rem .24rem 0;
        section{
            padding: 0;
            list-style: none;
            .list-group{
                .list-group-title{
                    height: 30px;
                    line-height: 30px;
                    padding-left: .12rem;
                    font-size: 12px;
                    color: #fff !important;
                    
                }
                .hot-cities-list{
                    display: flex;
                    -ms-flex-pack: start;
                    justify-content: flex-start;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                    padding: .24rem 0;
                    background: #1c1a1b;
                    font-size: 14px;
                    .list-group-item{
                        padding: .06rem .48rem;
                    }
                }
                .list-group-ul{
                    background: #1c1a1b;
                    .list-group-item{
                        display: flex;
                        align-items: center;
                        .name{
                            display: inline-block;
                            width: 100%;
                            padding: 10px 20px;
                            font-size: 14px;
                            border-bottom: 1px solid #262325
                        }
                    }
                }
                ul{
                    padding: 0;
                    list-style: none;
                }
            }
        }
    }
    .anchorGroup{
        position: fixed;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        -ms-flex-pack: center;
        justify-content: center;
        height: 100%;
        padding-left: .15rem;
        padding-right: .07rem;
        right: .05rem;
        top: 0;
        z-index: 1;
        ul{
            padding: 0;
            list-style: none;  
            .anchorPoint{
                z-index: 2;
                padding: .04rem;
                text-align: center;
                font-weight: bolder;
                font-family: Helvetica;
                color: #b3b3b3;
            }         
        }
    }
}
  
</style>