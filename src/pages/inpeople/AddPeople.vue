<template>
  <div class="add-wrap">
    <!-- <van-stepper v-model="value" /> -->
    <div class="add-enter">
      <div class="add-enter-form">
        <div class="enter-form-col">
          <span class="form-title">姓名</span>
          <input type="text" placeholder="请输入姓名" class="form-input" v-model="name" />
        </div>
        <div class="enter-form-col">
          <span class="form-title">手机号</span>
          <input type="text" placeholder="请输入手机号" class="form-input" v-model="phoneNumber" />
        </div>
        <div class="enter-form-col">
          <span class="form-title">证件类型</span>
          <div class="form-select-type">
            <select class="form-select-prov"
             v-model="IdCard"
            >
              <option
                value="0"
                disabled="disabled"
                selected="selected"
                style="display: none;"
              >请选择证件类型</option>
              <option >身份证</option>
              <option >港澳居民来往内地通行证</option>
              <option>台胞证</option>
              <option>护照</option>
            </select>
          </div>
        </div>
        <div class="enter-form-col">
          <span class="form-title">证件号</span>
          <input type="text" placeholder="请输入证件号" class="form-input" v-model="IdNumber" />
        </div>
      </div>
      <div class="enter-submit-btn">
        <span class="submit-btn" @click="addPeople">确定</span>
      </div>
      <!---->
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import { Stepper } from 'vant';

// Vue.use(Stepper);
export default {
  data() {
    return {
      IdCard:'',
      value: 1,
      IdNumber:'',
      phoneNumber:'',
      name:'',
      // IdCardVal:''
    }
  },
  // computed:{
  //   change:function(){
  //     return this.IdCardVal=this.IdCard
  //   }
  // },
  methods:{
    addPeople(){
      // console.log(this.IdCard)
      this.$store.dispatch("getPeople",{
        payload:{
          name:this.name,
          phoneNumber:this.phoneNumber,
          IdCard:this.IdCard,
          IdNumber:this.IdNumber
        }
      })
      this.$router.back()
    }
  }
};
</script>

<style lang="stylus" scoped>
  .add-wrap{
    .add-enter-form{
      font-size: .20513rem;
      font-family: PingFangSC-Regular;
      color: #cdcdcd;
      padding: 0 .20513rem;
      padding-top: .61538rem;
      .enter-form-col{
        display: flex;
        -ms-flex-pack: start;
        justify-content: flex-start;
        padding: .20513rem 0;
        border-bottom: 2px solid #262425;
        .form-title{
          width: 1.36752rem;
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
        .form-select-type{
          .form-select-prov{
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
    .enter-submit-btn{
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
</style>