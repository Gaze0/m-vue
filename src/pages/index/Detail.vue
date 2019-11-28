<template>
  <div class="content-wrap">
    <div class="content"  v-if="isLoaded.length>0">
      <div class="ticket-detail-content">
        <div class="header-content">
          <div class="ticket-detail-top">
            <div class="ticket-detail-poster">
              <img :src="allInfo.img_poster" />
            </div>
            <div class="ticket-detail-info">
              <div class="ticket-detail-title">{{allInfo.title}}</div>
              <div class="presell-and-price">
                <div class="ticket-detail-presell">
                  <span class="detail-presell-text">预售截止至</span>
                  <span class="detail-presell">{{(allInfo.time_end||'').slice(0,10)}}</span>
                </div>
                <div class="ticket-detail-price">
                  <div>
                    <span class="detail-price">¥{{(allInfo.price||'').slice(0,-1)}}</span>
                    <span class="info-price-up">起</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!---->
          <div class="ticket-detail-body">
            <div class="detail-body-time">
              <span class="detail-body-icon yo-ico">&#xe600;</span>
              <span class="detail-time-text">{{(allInfo.time_start||'').slice(0,-3)}}~{{(allInfo.time_end||'').slice(0,-3)}}</span>
            </div>
            <div class="detail-body-location">
              <div class="body-location">
                <span class="detail-body-icon yo-ico">&#xe6b7;</span>
                <span class="detail-body-text">{{allInfo.field_name}}</span>
              </div>
              <span class="detail-body-icon yo-ico">&#xe612;</span>
            </div>
            <div class="detail-body-tour" v-if="allInfo.road_show_info!=null">
              <div class="body-tour" >
                <span class="detail-body-icon yo-ico">&#xe6e7;</span>
                <span class="detail-body-text">巡演城市</span>
              </div>
              <div class="body-tour-detail" v-if="allInfo.road_show_info.count!=null">
                <span class="body-tour-count">{{(allInfo.road_show_info.count)||''}}站</span>
                <span class="detail-body-icon yo-ico">&#xe612;</span>
              </div>
            </div>
          </div>
        </div>
        <div class="ticket-detail-description">
          <div class="detail-description-titile">演出详情</div>
         
          <div class="detail-description">
            <transition name="bounce">
            <div
              class="detail-description-text"
              
              ref="detail"
            >
            <!-- :style="clickSeeAll? 'transition: height 0.4s ease 0s;':'transition: height 0.4s ease 0s;'" -->
            <!-- <div class="detail-rich-text"><p>2019年，「莫宰羊来啦」巡演即将开启，莫宰羊真的来啦！</p><p><br></p><p>11月16日 星期六 深圳 红糖罐（蛇口店）&nbsp;</p><p>11月17日 星期日 上海 Modernsky LAB&nbsp;</p><p>11月23日 星期六 长沙 46LIVEHOUSE&nbsp;</p><p>11月24日 星期日 武汉 L7 LIVEHOUSE&nbsp;</p><p>12月1日   星期日 广州 TU凸空间&nbsp;</p><p>12月6日   星期五 重庆 坚果LIVEHOUSE&nbsp;</p><p>12月7日   星期六 成都 CH8冇独空间（完美店）&nbsp;</p><p>12月8日   星期日 西安 未来星球1935LIVEHOUSE&nbsp;</p><p>12月13日 星期五 北京 乐空间</p><p><br></p><p>莫宰羊【读音：m̄tsai-iánn】</p><p>释义1：不清楚，不晓得</p><p>释义2：来自台湾花莲，一首《未接来电》引爆台网的「怪物新人」歌手/Rapper</p><p>释义3：一间真实存在的羊肉馆</p><p><br></p><p>今次！在台湾堪称现象级的「怪物新人」莫宰羊，动用难以言喻的超能力，从「已经大红大紫」的未来穿越回到「此刻」，打电话叫你去看他的首轮内地巡演！不要让你和未来天王莫宰羊的live初体验，变成你人生中的「未接来电」！</p><p><br></p><p><img src="http://img.zhengzai.tv/partner/2019/09/25/5d8b8e7ce82e0.jpeg"></p><p><br></p><p>号称是「怪物新人」，也的确是像少年漫画角色的20岁少年莫宰羊，可是一首歌就拥有600万播放量的「顶流」狠角色。虽然他来自台湾的「后山」花莲市，却冲在了本土原创音乐的最前线：莫宰羊熟练把玩着时下最新颖的音色和腔调，探讨都市年轻人最头大的问题；言辞间流露的南方海岸的质朴和温柔，调和孩子气的古怪譬喻，让他成为名副其实的可爱「怪物」；而超级流畅、明朗的旋律，更有让人重回00年代华语R&amp;B盛世的兴奋感！</p><p><br></p><p><img src="http://img.zhengzai.tv/partner/2019/09/25/5d8b4597e5e82.jpg"></p><p><br></p><p>尽管很多时候，莫宰羊都被冠以rapper的身份，但他的音乐却是难以用说唱来定义的奇妙综合体。我们也可以在现今所有的音乐icon身上，发现同样的特质：难以界定的风格，凸显个人特质的细节，和完全自发的率真。</p><p><br></p><p>浓重的台湾口音、咿咿呀呀的「羊羊腔」和洗脑旋律，不得不教人想起周杰伦处子作中闪现的灵光；不设界限的编曲风格，则来自于Frank Ocean、Kanye</p><p>West这些跨界天才的启发，他更坦言在尝试将techno、house风格加入到新作中去；至于怎么写出《鱼》《水》那样细腻、不谈金钱与权色、专注于内心世界的“另类”歌词，只要知道他是个民谣爱好者，就也说得通了。虽然年纪轻轻，但莫宰羊已经学会将创作上复杂的影响内化，取得了在「熟悉」和「新颖」之间的微妙平衡，打上了自己的专属音乐标签。</p><p><br></p><p><img src="http://img.zhengzai.tv/partner/2019/09/25/5d8b48c3d8bff.jpg"></p><p><br></p><p><br></p><p>莫宰羊的每一首歌，都像是一种人生的标本切片，看似浅薄，却能触及本质。&nbsp;「最近还好吗脸色变超差馁」，在他的新歌《健康快乐》里面，不出三句，就出现了这样直戳「痛点」的直率提问——要怎么回答这样的问题，又怎么解决这样的情境呢？完全不同于那些贩卖焦虑的丧文化商人，当你听过他「根本感受不到任何快乐呀」的困惑，和「答应我做梦完回道路上」的感叹，总能被他真挚朴实的给小小地感动，就像被邀请到了没有烦恼的秘密海滩，单纯地看着海面，不会被打扰——「如果能当一只鱼，就不用脱裤裤尿尿」。</p><p><br></p><p><br></p><p>这个被海水养育得很温柔的小孩，从很小的时候，就带着“绝对不要和其他人一样”的心情在生活着；在社会上迷茫的人们像是蚂蚁一样“寻找自己”的时候，莫宰羊已经用无数次不为人知的尝试，找到了属于自己的方向，哪怕是被认为是怪物，也要像「水花」和「游鱼」一样，自由快乐啊！</p><p><br></p><p>总之，莫宰羊来啦！</p></div> -->
            <div class="detail-rich-text" v-html="allInfo.detail">
                {{allInfo.detail}}
            </div>
            </div>
             </transition>
            <div @click="SeeAll" v-show="moreBtn">
              <div class="detail-description-more">
                查看全部
                <span class="description-more-icon yo-ico">&#xe609;</span>
              </div>
            </div>
          </div>
        </div>
        <div class="ticket-instructions">
          <div class="insturctions-title">购票须知</div>
          <div class="instructions-content">
            <!---->
            <!---->
            <div class="instructions-img-notice">
              <div class="instructions-img-info"
               v-for="(notice,index) in allInfo.notice_image"
                :key="index"
              >
                <div class="instructions-img">
                  <img
                    :src="notice.url"
                  />
                </div>
                <div class="instructions-info">
                  <div class="instructions-info-title">{{notice.title}}</div>
                  <div
                    class="instructions-info-text"
                  >{{notice.text}}</div>
                </div>
              </div>
             
              <div class="ticker-tips">演出信息请随时关注【正在现场】官方微博/微信公众号</div>
            </div>
            <div class="instructions-service">
              <span class="instructions-service-text">联系客服</span>
              <a href="tel:400-1680-650" class="instructions-service-tel">
                <i class="yo-ico" style="font-size:.4rem">&#xe623;</i>4001680650
              </a>
              <a href="mailto:kefu@zhengzai.tv" class="instructions-service-email">
                <i class="yo-ico">&#xe651;</i>kefu@zhengzai.tv
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot-btn" >
      <div class="ticket-detail-footer">
        <div class="only-buy-btn" v-if="allInfo.type==1" @click="buyTicket">{{allInfo.buy_content}}</div>
        <div class=" only-buy-btn stop-sell-btn" v-else-if="allInfo.type==2">{{allInfo.stop_sell_content}}</div>
        <div class="only-buy-btn" v-else-if="allInfo.type==3">{{allInfo.sell_finish_content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'utils/http'
export default {
    data(){
        return {
          // transition: height 0.4s ease 0s;
            clickSeeAll:false,
            allInfo:{},
            isLoaded:[],
            moreBtn:true,
            height:0,
            isAll:"查看全部"
        }
    },
    async mounted(){
        let id = this.$route.params.id
        // console.log(this.$route.params)
        let result = await get({
            url:'/api/user/performance/detailNew',
            params:{
                performance_id: id,
                amid: 0
            }
        })
        // v-if="isLoaded.length>0"
        this.allInfo = result.data
        this.isLoaded = result.data.notice_image
        // console.log(this.allInfo)
        setTimeout(()=>{
          this.getHeight()
        },300)
    },
    methods:{
        SeeAll(){
            this.clickSeeAll = !this.clickSeeAll
        },
        buyTicket(){
          let id = this.$route.params.id
          this.$router.push({name:'purTicket',params:{id:id,title:this.allInfo.title,cityName:this.allInfo.city_name,fieldName:this.allInfo.field_name}})
        },
        async getHeight(){
          await this.$nextTick(()=>{
            this.height = this.$refs.detail.offsetHeight
          })
          if(this.$refs.detail.offsetHeight<=400){
            this.moreBtn= false
          }else{
            this.$refs.detail.style.height = '400px'
          }
        }
    },
    watch:{  
      "clickSeeAll"(){
        if(this.clickSeeAll){
          this.$refs.detail.style.height = this.height + 'px'
          this.isAll = "收起"
        }else{
          this.$refs.detail.style.height = "400px"
          this.isAll = "查看全部"
        }
      }
    }
};
</script>

<style lang="stylus">
.content-wrap{
    flex 1
    display flex
    flex-direction column
    overflow hidden
    color: #a2a2a2;
    .content{
        flex 1
        background #000
        overflow scroll
        .ticket-detail-content{
            padding: .202564rem .20513rem .52564rem;
            .header-content{
                background: #1b1a1b;
                border-radius: .10256rem;
                .ticket-detail-top{
                    padding: .41026rem .20513rem .20513rem;
                    display: flex;
                    justify-content: space-between;
                    .ticket-detail-poster{
                        width: 1.38462rem;
                        height: 1.84615rem;
                        overflow: hidden;
                        border-radius: .10256rem;
                        -ms-flex-negative: 0;
                        flex-shrink: 0;
                        img{
                            width: 1.38462rem;
                            height: 1.84615rem;
                        }
                    }
                    .ticket-detail-info{
                        padding-left: .20513rem;
                        width: 4.35897rem;
                        position: relative;
                        .ticket-detail-title{
                            position: absolute;
                            top: 0;
                            font-size: .23932rem;
                            font-weight: 600;
                            color: #fff;
                            font-family: PingFangSC-Semibold;
                        }
                        .presell-and-price{
                            position: absolute;
                            bottom: 0;
                            display: -ms-flexbox;
                            display: flex;
                            width: 100%;
                            padding-right: .20513rem;
                            -ms-flex-pack: justify;
                            justify-content: space-between;
                            -ms-flex-align: end;
                            align-items: flex-end;
                            -ms-flex-item-align: end;
                            align-self: flex-end;
                            .ticket-detail-presell{
                                font-size: .13675rem;
                                color: #ff6060;
                                line-height: .17094rem;
                                .detail-presell-text{

                                }
                                .detail-presell{
                                    padding-left: .10256rem;
                                }
                            }
                            .ticket-detail-price{
                                padding-right 0.20513rem
                                .detail-price{
                                    font-size: .44444rem;
                                    font-family: DINCond-Black;
                                    font-weight: 900;
                                    color: #ff5e00;
                                    line-height: .37607rem;
                                }
                                .info-price-up{
                                    font-size: .17094rem;
                                    font-family: PingFangSC-Regular;
                                    color: #ff5e00;
                                }
                            }
                        }
                    }
                }
                .ticket-detail-body{
                    width: 5.58974rem;
                    border-top: 2px solid #292929;
                    margin: 0 auto;
                    padding: .13675rem 0;
                    .detail-body-time{
                        display: flex;
                        align-items: center;
                        padding: .10256rem 0;
                        .detail-body-icon{
                            font-size: .23932rem;
                            color: #a2a2a2;
                            padding: .03419rem;
                        }
                        .detail-time-text{
                            padding-left: .20513rem;
                            font-size: .17094rem;
                            font-family: DINCond-Black;
                            font-weight: 900;
                        }
                    }
                    .detail-body-location{
                        display: flex;
                        -ms-flex-pack: justify;
                        justify-content: space-between;
                        -ms-flex-align: center;
                        align-items: center;
                        padding: .10256rem 0;
                        .body-location{
                            display: flex;
                            -ms-flex-align: center;
                            align-items: center;
                            .detail-body-icon{
                                font-size: .23932rem;
                                color: #a2a2a2;
                                padding: .03419rem;
                            }
                            .detail-body-text{
                                padding-left: .20513rem;
                                font-size: .17094rem;
                                font-family: PingFangSC-Regular;
                                font-weight: 900;
                            }
                        }
                        .detail-body-icon{
                            font-size: .23932rem;
                            color: #a2a2a2;
                            padding: .03419rem;
                            .body-tour{
                                display: flex;
                                -ms-flex-align: center;
                                align-items: center;
                                .detail-body-icon {
                                    font-size: .23932rem;
                                    color: #a2a2a2;
                                    padding: .03419rem;
                                }
                                .detail-body-text{
                                    padding-left: .20513rem;
                                    font-size: .17094rem;
                                    font-family: PingFangSC-Regular;
                                    font-weight: 900;
                                }
                            }
                            
                        }
                    }
                    .detail-body-tour{
                        display: flex;
                        -ms-flex-pack: justify;
                        justify-content: space-between;
                        -ms-flex-align: center;
                        align-items: center;
                        padding: .10256rem 0;
                        .body-tour{
                            display: flex;
                            -ms-flex-align: center;
                            align-items: center;
                            .detail-body-text{
                                padding-left: .20513rem;
                                font-size: .17094rem;
                                font-family: PingFangSC-Regular;
                                font-weight: 900;
                            }
                        }
                        .body-tour-detail{
                            .body-tour-count{
                                font-size: .17094rem;
                                font-family: DINCond-Black;
                                font-weight: 900;
                                color: #ff5e00;
                                padding-right: 8px;
                            }
                            .detail-body-icon{
                                font-size: .23932rem;
                                color: #a2a2a2;
                                padding: .03419rem
                            }
                        }
                    }
                }
            }
            .ticket-detail-description{
                overflow: hidden;
                .detail-description-titile{
                    padding: .10256rem;
                    font-size: .20513rem;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: #fff;
                }
                .detail-description{
                    position: relative;
                    background: #1b1a1b;
                    padding: .20513rem;
                    .detail-description-text{
                        transition: height 0.4s ease 0s;
                        overflow: hidden;
                        .detail-rich-text{
                            p{
                                font-family: PingFangSC-Regular;
                                color: #a2a2a2!important;
                                span{
                                    font-family: PingFangSC-Regular;
                                    color: #a2a2a2!important;
                                }
                                strong{
                                    font-family: PingFangSC-Regular;
                                    color: #a2a2a2!important;
                                }
                            }img{
                                    max-width 100%
                                }
                        }
                    }
                    div{
                        .detail-description-more{
                            padding-top: .20513rem;
                            bottom: 0;
                            text-align: center;
                            font-size: .20513rem;
                            color: #fff;
                            .description-more-icon{
                                padding-left: .06838rem;
                                font-size: .13675rem;
                                transition: transform .4s;
                                transform: rotate(1turn);
                            }
                        }
                    }
                }
            }
            .ticket-instructions{
                font-size: .20513rem;
                font-family: PingFangSC-Regular;
                .insturctions-title{
                    padding: .10256rem;
                    font-size: .20513rem;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    color: #fff;
                }
                .instructions-content{
                    padding: .20513rem;
                    background: #1b1a1b;
                    .instructions-img-notice{
                        padding: .20513rem 0;
                        border-bottom: 1px solid #292929;
                        .instructions-img-info{
                            display: flex;
                            -ms-flex-pack: start;
                            justify-content: flex-start;
                            padding-bottom: .10256rem;
                            .instructions-img{
                                width: .5812rem;
                                height: .5812rem;
                                border-radius: .10256rem;
                                overflow: hidden;
                                -ms-flex-negative: 0;
                                flex-shrink: 0;
                                img{
                                    width: .5812rem;
                                    height: .5812rem;
                                }
                            }
                            .instructions-info{
                                padding-left: .10256rem;
                                .instructions-info-title{
                                    color: #fff;
                                }
                                .instructions-info-text{
                                    font-size: .13675rem;
                                    color: #a2a2a2;
                                }
                            }
                        }
                        .ticker-tips{
                            text-align: center;
                            color: #fff;
                        }
                    }
                    .instructions-service{
                        display: flex;
                        -ms-flex-pack: distribute;
                        justify-content: space-around;
                        -ms-flex-align: center;
                        align-items: center;
                        padding: .20513rem 0 0;
                        .instructions-service-text,.instructions-service-tel,.instructions-service-email{
                            color: #a2a2a2
                            
                        }
                    }
                }
            }
        }
    }
    .foot-btn{
        position: fixed;
        bottom: 0;
        width: 100%;
        max-width: 640px;
        background: #1c1a1b;
        padding: .13675rem .20513rem;
        .ticket-detail-footer{
            width: 100%;
            max-width: 640px;
            background: #1c1a1b;
            .only-buy-btn  {
                width 94%
                height: .68376rem;
                background: #ff5e00;
                border-radius: .10256rem;
                color: #fff;
                font-size: .34188rem;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                text-align: center;
                line-height: .68376rem;
            }
            .stop-sell-btn{
                background: #4d4d4d;
                color: #000;
            }
        }
    }

}
</style>