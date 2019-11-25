import axios from 'axios'

export const get = ({url,params})=>{
    return axios({url,params})
        .then((result)=>{
            // console.log(result)
            return result.data
        })
        .catch((err)=>{
            return err.message
        })
}