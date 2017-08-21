// 数据请求
import axios from 'axios'
import {
	registerApi
} from './resource'
export default {
	postRegister(config) {
		//console.log('url:'+registerApi)
		return axios.post(registerApi,config)
	}
}