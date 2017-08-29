// 数据请求
import axios from 'axios'
import {
	registerApi,
	loginApi,
	allStageApi,
	allGradApi,
	allSubjectByGradeCodeApi
} from './resource'
export default {
	postRegister(config) {
		//console.log('url:'+registerApi)
		return axios.post(registerApi,config)
	},
	postLogin(config){
		return axios.post(loginApi,config)
	},
	getAllStage(params){
		return axios.get(allStageApi,params)
	},
	getAllGrad(params){
		return axios.get(allGradApi,params)
	},
	getAllSubjectByGradeCode(params){
		return axios.get(allSubjectByGradeCodeApi,params)
	}
}
