<template>
<div class="mark">
  <div class="ticket-screening">
    <span data-state="true" @click="close" class="ticket-screening-close yo-ico">&#xe63d;</span>
    <div class="ticket-screening-time">
      <p class="ticket-screening-type">时间范围</p>
      <div class="ticket-screening-options">
        <span 
          v-for="(day,index) in daysList"
          :key="day.id"
         :data-days="day.days"
         :class="[day.marg?'screening-option-margin screening-option':'screening-option',index==daysactive?'screening-option-selected':'']"
         @click="dayclick(index)"
         >{{day.name}}</span>
        <!-- <span data-days="1" class="screening-option screening-option-margin">今天</span>
        <span data-days="3" class="screening-option">三天内</span>
        <span data-days="7" class="screening-option">本周内</span>
        <span data-days="30" class="screening-option screening-option-margin">一个月内</span> -->
      </div>
    </div>
    <div class="ticket-screening-time">
      <p class="ticket-screening-type">排序方式</p>
      <div class="ticket-screening-options">
         <span 
          v-for="(order,index) in orderList"
          :key="order.id"
         :data-orderby="order.orderby"
         :class="[order.marg?'screening-option-margin screening-option':'screening-option',index==orderactive?'screening-option-selected':'']"
         @click="orderclick(index)"
         >{{order.name}}</span>
        <!-- <span data-orderby="default" class="screening-option screening-option-selected">默认</span>
        <span data-orderby="save_count" class="screening-option screening-option-margin">热度</span>
        <span data-orderby="time_start" data-sort="asc" class="screening-option">演出时间</span> -->
      </div>
    </div>
    <div class="ticket-screening-time">
      <p class="ticket-screening-type">演出类型</p>
      <div class="ticket-screening-options">
        <span 
          v-for="(type,index) in typeList"
          :key="type.id"
         :data-type="type.type"
         :class="[type.marg?'screening-option-margin screening-option':'screening-option',index==typeactive?'screening-option-selected':'']"
         @click="typeclick(index)"
         >{{type.name}}</span>
        <!-- <span data-type="0" class="screening-option screening-option-selected">全部</span>
        <span data-type="1" class="screening-option screening-option-margin">音乐节</span>
        <span data-type="2" class="screening-option">演唱会</span>
        <span data-type="3" class="screening-option">小型演出</span>
        <span data-type="4" class="screening-option screening-option-margin">展览</span>
        <span data-type="6" class="screening-option">舞台剧</span> -->
      </div>
    </div>
    <div class="ticket-screening-btn">
      <span @click="reset" class="screening-btn-reset">重置</span>
      <span @click="define" class="screening-btn-submit">确定</span>
    </div>
  </div>
</div>
</template>

<script>
import  { INFO_ACTIVE } from '../../store/active-type'
export default {
    data(){
        return {
            searchIsShow:false,
            daysactive:0,
            orderactive:0,
            typeactive:0,
            daysList:[
              {id:0,name:'全部',days:'0'},
              {id:1,name:'今天',days:'1',marg:'true'},
              {id:2,name:'三天内',days:'3'},
              {id:3,name:'本周内',days:'7'},
              {id:4,name:'一个月内',days:'30',marg:'true'},
            ],
            orderList:[
              {id:0,name:'默认',orderby:'default',sort:'desc'},
              {id:1,name:'热度',orderby:'save_count',sort:'desc',marg:'true'},
              {id:2,name:'演出时间',orderby:'time_start',sort:'asc'}
            ],
            typeList:[
              {id:0,name:'全部',type:'0'},
              {id:1,name:'音乐节',type:'1',marg:'true'},
              {id:2,name:'演唱会',type:'2'},
              {id:3,name:'小型演出',type:'3'},
              {id:4,name:'展览',type:'4',marg:'true'},
              {id:5,name:'舞台剧',type:'6'},
            ]
        }
    },
    methods:{
        close(){
          this.$emit('getSearchIsShow',this.searchIsShow)
        },
        dayclick(index){
          this.daysactive=index
        },
        orderclick(index){
          this.orderactive=index
        },
        typeclick(index){
          
          this.typeactive=index
        },
        reset(){
          this.typeactive = 0
          this.orderactive = 0
          this.daysactive = 0
        },
        define(){
          // console.log(this.daysList[this.daysactive].days)
          this.$store.dispatch({
              type:INFO_ACTIVE,
              payload:{
                day:this.daysList[this.daysactive].days,
                order:this.orderList[this.orderactive].orderby,
                sort:this.orderList[this.orderactive].sort,
                type:this.typeList[this.typeactive].type
              }
          })
          this.$emit('getSearchIsShow',this.searchIsShow)
          // this.$router.go('/index/home')
          // console.log(this.$router.go)
        }
    }
};
</script>

<style lang="stylus" scoped>
.mark{
    display none
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 998;
    .ticket-screening{
        position: fixed;
        bottom: 1.57778rem;
        width: 6rem;
        margin:  .20513rem;
        background: #1e1e1e;
        z-index: 1001;
        .ticket-screening-close{
            position: absolute;
            top: 0;
            right: 0;
            padding: .20513rem;
            font-size: .34188rem;
            color: #514f50;
        }
        .ticket-screening-time{
            .ticket-screening-type{
                padding: .20513rem 0;
                text-align: center;
                font-size: .23932rem;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
            }
            .ticket-screening-options{
                display: flex;
                flex-wrap: wrap;
                padding: .17094rem .36rem;
                .screening-option-selected{
                    color: #fff;
                    background: #ff5e00;
                    border: 1px solid #ff5e00;
                }
                .screening-option{
                    display: inline-block;
                    width: 1.53846rem;
                    height: .47863rem;
                    border: 1px solid #cdcdcd;
                    border-radius: .23932rem;
                    line-height: .47863rem;
                    text-align: center;
                    margin-bottom: .23932rem;
                }
                .screening-option-margin{
                    margin: 0 .2735rem;
                }
            }
        }
        .ticket-screening-btn{
            display: flex;
            justify-content: space-between;
            padding: .17094rem .41026rem;
            .screening-btn-reset,.screening-btn-submit{
                width: 2.39316rem;
                height: .47863rem;
                text-align: center;
                border: 2px solid #cdcdcd;
                border-radius: 2px;
                color: #cdcdcd;
                line-height: .47863rem;
                font-size: .23932rem;
                font-weight: 600;
            }
            .screening-btn-submit{
                border: 2px solid #ff5e00;
                border-radius: 2px;
                background: #ff5e00;
                color: #fff;
            }
        }
    }
}

</style>