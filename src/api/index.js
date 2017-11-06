// 数据请求
import axios from 'axios'
axios.defaults.headers.token = '402882c55f800de8015f8147bc470011';
import {
	registerApi,
	loginApi,
	officeWordApi,
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
	postOfficeWord(config){
		return axios.post(officeWordApi,config)
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
