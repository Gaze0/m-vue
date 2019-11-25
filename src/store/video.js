import { VIDEO_ACTIVE } from './active-type'
import { VIDEO_MUTATION } from './mutation-type'
import { get } from 'utils/http'
const state={
    videotype:'',
    videoList:[],
}


const mutations = {
    [VIDEO_MUTATION](state,data){
        // state.videotype = data.payload.
        state.videotype = data.payload.screen
        state.videoList = data.payload.videoList
        // console.log(data.payload.videoList.data)
      }

}

const actions = {
    async [VIDEO_ACTIVE](context,action){
        let {page,screen}=action.payload
        let result = await get({
            url:'/mediaapi/videos',
            params:{
                screen,
                page,
                limit: 5
            }
        })
        // console.log(result)
        for(var i=0;i<result.data.length;i++){
            if(result.data[i].video_duration!=0){
                let h = Math.floor((~~result.data[i].video_duration)/60);
                let m = (~~result.data[i].video_duration)%60
                result.data[i].video_duration = '0'+h+':'+m
            }
        }
        action.payload.videoList = result
        // console.log(result)
        await context.commit({
          type:VIDEO_MUTATION,
          payload:action.payload
        })
    }
}

export default {
    namespace:true,
    state,
    mutations,
    actions
}