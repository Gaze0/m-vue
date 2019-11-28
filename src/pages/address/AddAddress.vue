<template>
  <div class="add-address-wrap">
    <div class="add-address">
      <div class="add-address-form">
        <div class="address-form-col">
          <span class="form-title">姓名</span>
          <input type="text" placeholder="请输入姓名" class="form-input" v-model="name" />
        </div>
        <div class="address-form-col">
          <span class="form-title">手机号</span>
          <input type="text" placeholder="请输入手机号" class="form-input"  v-model="phoneNum"/>
        </div>
        <div class="address-form-col">
          <span class="form-title">所在地区</span>
          <div class="form-select-address">
            <div class="form-select-area">
              <select class="form-select-prov"
               v-model="val">
                <option :value="city.n"
                v-for="(city,index) in cityList"
                :key="index"
                >{{city.n}}</option>
              </select>
              <span>省/直辖市</span>
            </div>
            <div class="form-select-area">
              <select class="form-select-city">
                <option value="北京城区"
                  v-for="(val,index) in nowCity"
                  :key="index"
                >{{val.n}}</option>
              </select>
              <span>市</span>
            </div>
            <div class="form-select-area">
              <select class="form-select-district">
                <option value="东城区"
                v-for="(val,index) in nowArea"
                :key="index"
                >{{val.n}}</option>
               
              </select>
              <span>区/县</span>
            </div>
          </div>
        </div>
        <div class="address-form-col">
          <span class="form-title">详细地址</span>
          <input type="text" placeholder="不需要再次填写省市区/县" class="form-input" v-model="detailAddress" />
        </div>
      </div>
      <div class="address-submit-btn" @click="addAddress">
        <span class="submit-btn">确定</span>
      </div>
      <!---->
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http'
import store from 'store'
export default {
    data(){
      return {
        nowCity:[],
        cityList:[],
        val:'',
        nowArea:[],
        detailAddress:'',
        phoneNum:'',
        name:'',
        pro:'',
        selectAddress:'',
        changeIndex:''
      }
    },
    async mounted(){

        let { selectAddress,index } =this.$route.params
        // console.log(selectAddress,index)
        if(selectAddress){
          this.changeIndex = index
          this.selectAddress = selectAddress
          this.name = selectAddress[0].name
          this.phoneNum = selectAddress[0].phoneNum
          this.detailAddress = selectAddress[0].detailAddress
        }
        let result = await get({
            url:'/json'
        })
        // console.log(result)
        this.cityList = result
        let { nm } = store.get('currentCity')||{nm:''}
        nm = nm+'市'
        this.val = nm
    },
    methods:{
      addAddress(){
        // console.log(this.selectAddress)
        if(this.selectAddress!=''){
          this.$store.dispatch('getAddress',{
            payload:{
              index:this.changeIndex,
              type:'change',
              pro:this.pro,
              city:this.nowCity[0].n,
              area:this.nowArea[0].n,
              name:this.name,
              phoneNum:this.phoneNum,
              detailAddress:this.detailAddress
            }
          })
        
        }else{
          this.$store.dispatch('getAddress',{
            payload:{
              type:'add',
              pro:this.pro,
              city:this.nowCity[0].n,
              area:this.nowArea[0].n,
              name:this.name,
              phoneNum:this.phoneNum,
              detailAddress:this.detailAddress
            }
          })
        }
        // this.$router.push('/address/list')
        this.$router.back()

      }
    },
    watch:{
      val(val){
        // console.log(val,213)
        var now = this.cityList.filter((value,index)=>{
          return val==value.n
        })
        this.pro = now[0].n
        this.nowCity = now[0].d
        this.nowArea = now[0].d[0].d
        // console.log(now)
      }
    }
};
</script>

<style lang="stylus" scoped>
.add-address-wrap{
    height 100%
    .add-address{
        .add-address-form{
            font-size: .20513rem;
            font-family: PingFangSC-Regular;
            color: #cdcdcd;
            padding: 0 .20513rem;
            padding-top: .61538rem;
            .address-form-col{
                display: flex;
                -ms-flex-pack: start;
                justify-content: flex-start;
                padding: .20513rem 0;
                border-bottom: 2px solid #262425;
                .form-title{
                    width: 1.06752rem;
                    -ms-flex-negative: 1;
                    flex-shrink: 1;
                    text-align: right;
                    padding-right: .30769rem;
                }
                .form-input{
                    width: 4.44444rem;
                    height: .34188rem;
                    font-size: .20513rem;
                    font-weight: 400;
                    background-color: transparent;
                    border-style: none;
                }
                .form-select-address{
                    .form-select-area{
                        padding-bottom: .13675rem;
                        .form-select-prov,.form-select-city,.form-select-district{
                            width: 3.4188rem;
                            height: .34188rem;
                            font-size: .20513rem;
                            font-weight: 400;
                            background-color: transparent;
                            border-style: none;
                        }
                    }
                }
            }
        }
        .address-submit-btn{
            position: fixed;
            left: 0;
            bottom: 0;
            padding: .13675rem .20513rem .20513rem;
            width: 100%;
            background: #0d0d0d;
            .submit-btn{
                display: inline-block;
                width: 90%;
                padding: .13675rem;
                background: #ff5e00;
                color: #fff;
                font-weight: 500;
                text-align: center;
                font-size: .30769rem;
                border-radius: .06838rem;
                font-family: PingFangSC-Medium;
            }
        }
    }
}
</style>