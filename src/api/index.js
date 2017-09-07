// 数据请求
import axios from 'axios'
import {
	registerApi,
	loginApi,
	allStageApi,
	allGradApi,
	allSubjectByGradeCodeApi,
	getBookTypeByGradSubjectApi,
	getSceneByResourceIdApi,
	getResourceOriginApi,
	allSubjectApi,
	allBigCoursApi,
	getSmallCourseByBigIdApi
} from './resource'
export default {
	postRegister(config) {
		//console.log('url:'+registerApi)
		return axios.post(registerApi,config)
	},
	postLogin(config){
		return axios.post(loginApi,config)
	},
	getAllStage(){
		return axios.get(allStageApi)
	},
	getAllGrad(){
		return axios.get(allGradApi)
	},
	getAllSubjectByGradeCode(params){
		return axios.get(allSubjectByGradeCodeApi+params)
	},
	getBookType(params){
		return axios.get(getBookTypeByGradSubjectApi+params)
	},
	getCourseScene(){
		return axios.get(getSceneByResourceIdApi)
	},
	getCourseOrigin(){
		return axios.get(getResourceOriginApi)
	},
	getCourseCategory(){
		return axios.get(allSubjectApi)
	},
	getBigCourse(params){
		return axios.post(allBigCoursApi,params)
	},
	getSmallCourseByBigId(params){
		return axios.get(getSmallCourseByBigIdApi+params)
	}
}
