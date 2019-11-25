<template>
  <div class="wrap">
    <div class="address-main">
      <div class="address-content"
        v-for="(address,index) in addressList"
        :key="index"
      >
        <div class="address-info">
          <div class="address-title">
            <span class="address-title-icon yo-ico">&#xe601;</span>
            <span class="address-title-text">收货人姓名</span>
          </div>
          <div class="address-text">{{address.name}}</div>
        </div>
        <div class="address-info">
          <div class="address-title">
            <span class="address-title-icon yo-ico">&#xe6b7;</span>
            <span class="address-title-text">收货人地址</span>
          </div>
          <div class="address-text">{{address.pro}}{{address.city}}{{address.area}}{{address.detailAddress}}</div>
        </div>
        <div class="address-info">
          <div class="address-title">
            <span class="address-title-icon yo-ico">&#xe60a;</span>
            <span class="address-title-text">收货人手机号</span>
          </div>
          <div class="address-text">{{address.phoneNum}}</div>
        </div>
        <div class="active">
          <div class="active-select" @click="selDefault(index)">
            <div class="select-dot">
              <span class="select-icon yo-ico"
                :style="Default==index?'color:red':''"
              >&#xe614;</span>
            </div>
            <span class="select-dot-text" :style="Default==index?'color:red':''">默认</span>
          </div>
          <div>
            <span class="select-iconModify yo-ico" @click="Editor(index)">&#xe640;</span>
            <span class="select-iconDelete yo-ico" @click="Delete(index+1)">&#xe60c;</span>
          </div>
        </div>
      </div>
    </div>
    <div class="enter-add-btn">
      <span class="add-btn" @click="addAddress">添加地址</span>
    </div>
  </div>
</template>

<script>
import store from 'store'
export default {
    data(){
        return {
            addressList:[],
            Default:0
        }
    },
    mounted(){
        this.addressList = store.get('address')
    },
    methods: {
        addAddress() {
            this.$router.push("/address/add");
        },
        selDefault(index){
            // console.log(index)
            this.Default = index
        },
        async Delete(index){
            await this.$store.dispatch('getAddress',{
                payload:{
                    index,
                }
            })
            this.addressList = store.get('address')
        },
        Editor(index){
            let selectAddress = this.addressList.filter((val,ind)=>{
                return ind==index
            })
            this.$router.push({name:'addAddress',params:{selectAddress:selectAddress,index:index}});
        }
    },
};
</script>

<style lang="stylus" scoped>
    .wrap{
        flex 1
        .address-main{
            padding: .20564rem .20513rem;
            .address-content{
                padding: .20513rem;
                background: #1c1a1b;
                margin-bottom: .20513rem;
                border-radius: .06838rem;
                .address-info{
                    display: flex;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    -ms-flex-align: start;
                    align-items: flex-start;
                    padding: .10256rem 0;
                    .address-title{
                        display: flex;
                        -ms-flex-negative: 0;
                        flex-shrink: 0;
                        padding-right: .61538rem;
                        .address-title-icon{
                            font-size: .20513rem;
                            line-height: .30769rem;
                            padding-right: .13675rem;
                        }
                    }
                    .address-text{

                    }
                }
                .active{
                    padding-top: .13675rem;
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    -ms-flex-align: center;
                    align-items: center;
                    .active-select{
                        display: inline-block;
                        .select-dot{
                            display: inline-block;
                            // width: .2735rem;
                            // height: .2735rem;
                            // border: 1px solid #fff;
                            // border-radius: 50%;
                            // text-align: center;
                            // line-height: .20513rem;
                            margin-right: .20513rem;
                            .select-icon{
                                font-size: .23932rem;
                                color: #fff;
                            }
                        }
                        .select-dot-text{
                            font-family: PingFangSC-Medium;
                            font-weight: 500;
                        }
                    }
                    .active-selected{
                        .select-dot{
                            background: #ff5e00;
                            border: 1px solid #ff5e00;      
                        }
                        .select-dot-text{
                            color: #ff5e00;
                        }
                    }
                    div{
                        .select-iconModify{
                            font-size: .23932rem;
                            color: #fff;
                        }
                        .select-iconDelete{
                            margin-left: .30769rem;
                            font-size: .2735rem;
                            color: #fff;
                        }
                    }
                }
            }
        }
        .enter-add-btn{
            position: fixed;
            left: 0;
            bottom: 0;
            padding: .13675rem  0 .20513rem;
            width: 100%;
            background: #0d0d0d;
            box-sizing border-box
            outline: none;
            .add-btn{
                display: inline-block;
                width: 94%;
                margin 0 .20513rem
                padding: .13675rem;
                background: #ff5e00;
                color: #000;
                font-weight: 500;
                text-align: center;
                font-size: .30769rem;
                border-radius: .06838rem;
                font-family: PingFangSC-Medium;
                box-sizing border-box
            }
        }
    }
</style>