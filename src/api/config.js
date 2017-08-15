//配置 借口公共地址 即根地址
var config = {
	site: 'ip',
	method: '/'
}
export const API_ROOT = 'http://'.concat( config.site, config.method )