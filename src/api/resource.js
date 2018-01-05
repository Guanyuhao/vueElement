//导出借口地址
import {
    API_ROOT,
    NODE_ROOT,
    TEST_ROOT,
    ZB_ROOT
} from './config.js';

const apiResource = {
    // recommendActicleList: '/api/recommendations/posts',  // 获取推荐文章
    test1:'/read/topic/get',
    registerApi:'/register',
    loginApi:'/login',
    officeWordApi:'/office/word',
    allStageApi:'/stage?all',
    allGradApi:'/baseGrade?all',
    allSubjectByGradeCodeApi:'/course/getGrade',
    getBookTypeByGradSubjectApi:'/bookType/get',
    getSceneByResourceIdApi:'/tSceneController/getSceneByResourceId/5',
    getResourceOriginApi:'/rtResourceOriginController/getSceneByResourceId/5',
    allSubjectApi:'/subject/all',
    allBigCoursApi:'/courseBig/all',
    getSmallCourseByBigIdApi:'/courseBig/getSmallCourseByBigId',
    // zb
    getMarketsApi:'/markets',//市场信息
    getDepthApi:'/depth',//市场深度
    getTicketApi:'/ticket',//行情
    getTradesApi:'/trades', //历史成交
    getKlineApi:'/kline'
};
//test
export const DmXinTiao = TEST_ROOT.concat(apiResource.test1)

//export const RecommendActicleListResource = API_ROOT.concat(apiResource.recommendActicleList);
export const registerApi = NODE_ROOT.concat(apiResource.registerApi);
export const loginApi = NODE_ROOT.concat(apiResource.loginApi);
export const officeWordApi = NODE_ROOT.concat(apiResource.officeWordApi);
//资源库

export const allStageApi = API_ROOT.concat(apiResource.allStageApi)
export const allGradApi = API_ROOT.concat(apiResource.allGradApi)
export const allSubjectByGradeCodeApi = API_ROOT.concat(apiResource.allSubjectByGradeCodeApi)
export const getBookTypeByGradSubjectApi = API_ROOT.concat(apiResource.getBookTypeByGradSubjectApi)
export const getSceneByResourceIdApi = API_ROOT.concat(apiResource.getSceneByResourceIdApi)
export const getResourceOriginApi = API_ROOT.concat(apiResource.getResourceOriginApi)
export const allSubjectApi = API_ROOT.concat(apiResource.allSubjectApi)
export const allBigCoursApi = API_ROOT.concat(apiResource.allBigCoursApi)
export const getSmallCourseByBigIdApi = API_ROOT.concat(apiResource.getSmallCourseByBigIdApi)
//中币
export const getMarketsApi = ZB_ROOT.concat(apiResource.getMarketsApi)
export const getDepthApi = ZB_ROOT.concat(apiResource.getDepthApi)
export const getTicketApi = ZB_ROOT.concat(apiResource.getTicketApi)
export const getTradesApi = ZB_ROOT.concat(apiResource.getTradesApi)
export const getKlineApi = ZB_ROOT.concat(apiResource.getKlineApi)

