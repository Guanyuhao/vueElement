//配置 借口公共地址 即根地址
var config = {
	//ip
	site: '/apis',
	site2:'/api',
	test:'/test',
	zb:'/zb',
	//端口
	method:'/jeecg/rest'
}
//export const API_ROOT = 'http://'.concat( config.site, config.method )
export const API_ROOT = ''.concat( config.site, config.method )
export const NODE_ROOT = ''.concat(config.site2)
export const TEST_ROOT = ''.concat(config.test)
export const ZB_ROOT = ''.concat(config.zb,'/data/v1')