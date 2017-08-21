//导出借口地址
import {
    API_ROOT
} from './config.js';

const apiResource = {
   // recommendActicleList: '/api/recommendations/posts',  // 获取推荐文章
   registerApi:'/register'
};

//export const RecommendActicleListResource = API_ROOT.concat(apiResource.recommendActicleList);
export const registerApi = API_ROOT.concat(apiResource.registerApi);