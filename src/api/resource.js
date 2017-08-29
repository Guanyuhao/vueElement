//导出借口地址
import {
    API_ROOT,
    NODE_ROOT
} from './config.js';

const apiResource = {
   // recommendActicleList: '/api/recommendations/posts',  // 获取推荐文章
   registerApi:'/register',
   loginApi:'/login',
   allStageApi:'/stage?all',
   allGradApi:'/baseGrade?all',
   allSubjectByGradeCodeApi:'/course/getGrade'
};

//export const RecommendActicleListResource = API_ROOT.concat(apiResource.recommendActicleList);
export const registerApi = NODE_ROOT.concat(apiResource.registerApi);
export const loginApi = NODE_ROOT.concat(apiResource.loginApi);
//资源库

export const allStageApi = API_ROOT.concat(apiResource.allStageApi)
export const allGradApi = API_ROOT.concat(apiResource.allGradApi)
export const allSubjectByGradeCodeApi = API_ROOT.concat(apiResource.allSubjectByGradeCodeApi)