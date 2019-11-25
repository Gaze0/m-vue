<template>
  <div class="wrap">
    <div class="enter-main">
      <div class="enter-content"
        v-for="(people,index) in allPeople"
        :key="index"
      >
        <div class="enter-info">
          <div class="enter-title">
            <span class="enter-title-icon yo-ico" style="font-size:.25rem">&#xe601;</span>
            <span class="enter-title-text">入场人姓名</span>
          </div>
          <div class="enter-text">{{people.name}}</div>
        </div>
        <div class="enter-info">
          <div class="enter-title">
            <span class="enter-title-icon yo-ico" style="font-size:.25rem">&#xe60a;</span>
            <span class="enter-title-text">入场人手机号</span>
          </div>
          <div class="enter-text">{{people.phoneNumber}}</div>
        </div>
        <div class="enter-info">
          <div class="enter-title">
            <span class="enter-title-icon yo-ico"  style="font-size:.25rem">&#xe68a;</span>
            <span class="enter-title-text">证件类型</span>
          </div>
          <div class="enter-text">{{people.IdCard}}</div>
        </div>
        <div class="enter-info">
          <div class="enter-title">
            <span class="enter-title-icon yo-ico"  style="font-size:.25rem">&#xe66c;</span>
            <span class="enter-title-text">入场人证件号</span>
          </div>
          <div class="enter-text">{{people.IdNumber}}</div>
        </div>
        <div class="active">
          <div class="active-select active-selected"
            @click="selectDefault(index)"
          >
            <div class="select-dot">
              <span class="select-icon yo-ico"
              :style="selectIndex==index?'color:#ff5e00':''"
              >&#xe614;</span>
            </div>
            <span :style="selectIndex==index?'color:#ff5e00':''">默认</span>
          </div>
        </div>
      </div>
    </div>
    <div class="enter-add-btn">
      <span class="add-btn" @click="addPeople">添加入场人</span>
    </div>
  </div>
</template>

<script>
import store from "store";
export default {
  data() {
    return {
      allPeople: [],
      selectIndex:0
    };
  },
  mounted() {
    let people = store.get("people");
    console.log(people);
    this.allPeople = people;
  },
  methods: {
    addPeople() {
      this.$router.push("/inpeople/addpeople");
    },
    selectDefault(index){
        this.selectIndex = index
    }
  }
};
</script>

<style lang="stylus" scoped>
    .wrap{
        .enter-main{
            padding: .20564rem .20513rem;
            .enter-content{
                padding: .20513rem;
                background: #1c1a1b;
                margin-bottom: .20513rem;
                border-radius: .06838rem;
                .enter-info{
                    display: flex;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    -ms-flex-align: start;
                    align-items: flex-start;
                    padding: .10256rem 0;
                    .enter-title{
                        display: flex;
                        -ms-flex-negative: 0;
                        flex-shrink: 0;
                        padding-right: .61538rem;
                        .enter-title-icon{
                            font-size: .20513rem;
                            line-height: .30769rem;
                            padding-right: .13675rem;
                        }
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
                        .select-dot{
                            display: inline-block;

                            border-radius: 50%;
                            margin-right: .20513rem;
                            .select-icon{
                                font-size: .23932rem;
                                color: #fff;
                            }
                        }
                    }
                    // .active-selected{
                    //     .select-dot{
                    //         background: #ff5e00;
                    //         border: 1px solid #ff5e00;
                    //     }
                    // }
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