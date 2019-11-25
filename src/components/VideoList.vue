<template>
  <div class="list"  @click="$router.push(`/video/videoDetail/${video.id}`)">
    <div class="main-list-item">
      <img :src="video.video_pic" class="media-item-cover" />
      <div class="media-item-info">
        <div class="item-info-name">{{video.video_name}}</div>
        <div class="item-info-duration" v-if="video.video_duration!=0">{{video.video_duration}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    video: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" scoped>
.list{
  
  .main-list-item{
      background-color: #1b1a1b;
      padding-bottom: .10256rem;
      margin-bottom: .20513rem;
      border-radius: .10256rem;
      // overflow: hidden;
      .media-item-cover{
          display: block;
          width: 100%;
      }
      .media-item-info{
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: .20513rem;
          font-size: .23932rem;
          .item-info-duration{
              padding-left: .20513rem
          }
      }
  }
}
</style>