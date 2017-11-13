// 数据请求
import axios from 'axios'
axios.defaults.headers.token = '402882c55fa3808b015fa38dfe580007';
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
// import obj from './StrToOutWord'
// var StrToOutWord = obj.StrToOutWord
// var params = {
// 	booktype: 'NitS7WyRyZrwDhEyYDdQz4ixrimCEHwN',
// 	pageSize: 100,
// 	gradeCode: 24,
// 	subjectCode: 3,
// 	groupId: 1,
// 	openness: 1,
// 	cp: 2,
// }
// function stringRemoveHtml(str) {
// 	return str.replace(/<\/?div[^<]*?>/g, "").replace(/<\/?p[^<]*?>/g, "").replace(/<\/?span[^<]*?>/g, "").replace(/<\/?strong[^<]*?>/g, "").replace(/<br[^<]*?>/g, "").replace(/<[a-z]:[a-z]><\/[a-z]:[a-z]>/g, "");
// }
// function examDataToHtml(examdata) {
// 	let fileName = examdata.paperBean.paperName || "";
// 	while (fileName.match(/[*/\\?"<>:|%#]/g)) {
// 		fileName = prompt('文件名不能包含(*/\\?"<>:|%#),请重新输入导出word文件名', examdata.paperBean.paperName) || "";
// 	}
// 	if (fileName) {
// 		let params = {
// 			evalStr: 'var pObj = null;',
// 			imgUrl: [],
// 			fileName: encodeURI(fileName),
// 			leng: 0
// 		};
// 		let html = examHtml(examdata);
// 		html = filterDate(html);
// 		let outWord = new StrToOutWord(html);
// 		params.evalStr += outWord.str;
// 		if (outWord.imgUrl) params.imgUrl = params.imgUrl.concat(outWord.imgUrl);
// 		if (params.imgUrl.length > 0) params.imgUrl = params.imgUrl.join(',');
// 		return params;
// 	} else {
// 		$('#outWordExam').prop("disabled", false).css("background", "#3388ff").text('导出word');
// 		return false;
// 	}
// }
// function filterDate(html) {
// 	// 样式过滤
// 	html = html.replace(/<div.*?>/g, "").replace(/<\/div>/g, "");
// 	html = html.replace(/<label.*?>/g, "");
// 	html = html.replace(/<\/label>/g, "");
// 	html = html.replace(/<input.+?>/g, "");
// 	return html;
// }
// function questionHtml(q, index, fuhe, details) {
// 	var html = "";
// 	// 标题
// 	// var title = details ? "" : '<label class="title"><input type="checkbox" class="checkboxQustItem"/>';
// 	// if (!fuhe) html += '<p style="text-align: center;"><span style="font-weight: bold;">' + title + q.title + '</label></span></p>';
// 	// 题干
// 	var stemClassName = details ? ' class="stem"' : "";
// 	var questinIndex = index ? index : "1";
// 	var indent = fuhe ? 1 : 0;
// 	if (fuhe) {
// 		//去除可能自带的题号
// 		q.stem = q.stem.replace(/^(1．|2．|3．|4．|5．|6．|7．|8．|9．|10．|1\.|2\.|3\.|4\.|5\.|6\.|7\.|8\.|9\.|10\.|1、|2、|3、|4、|5、|6、|7、|8、|9、|10、|\(1\)|\(2\)|\(3\)|\(4\)|\(5\)|\(6\)|\(7\)|\(8\)|\(9\)|\(10\)|\(11\)|⑴|⑵|⑶|⑷|⑸|⑹|⑺|⑻|⑼|⑽|（1）|（2）|（3）|（4）|（5）|（6）|（7）|（8）|（9）|（10）|①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩ )/g, "");
// 		html += '<p' + stemClassName + ' style="indent: ' + indent + ';word-break: break-all;padding-left: 10px">' + filterHtml("<span>" + questinIndex + ").</span>" + q.stem) + '(' + q.score + '分)' + '</p>';

// 	} else {
// 		html += '<p' + stemClassName + ' style="indent: ' + indent + ';word-break: break-all;">' + filterHtml("<span>" + questinIndex + "、</span>" + q.stem) + '(' + q.score + '分)' + '</p>';
// 	}
// 	// 选项
// 	var ques_optionHtml = "";
// 	indent++;
// 	if (q.quesOption.substr(0, 1) === "[") {
// 		var quesOptions = JSON.parse(q.quesOption);
// 		quesOptions.forEach(function (item) {
// 			var key = "";
// 			if (item.optionKey) key = item.optionKey + "、";
// 			ques_optionHtml += filterHtml(key + item.optionValue, true, indent);
// 		});
// 	}
//     /* else {
//      ques_optionHtml += filterHtml(q.optionValue, true, indent);
//      }*/
// 	html += '<div class="questionOption"  style="padding-left: 20px">' + ques_optionHtml + '</div>';
// 	html += examAnswer(q, indent);
// 	return html;
// }
// function examAnswer(q, indent) {
// 	var html = "";
// 	// 答案
// 	var answerHtml = "";
// 	if (q.answer.substr(0, 1) == "[") {
// 		var answer = JSON.parse(q.answer);
// 		answer.forEach(function (item) {
// 			answerHtml += item.answerValue;
// 		});
// 	} else {
// 		answerHtml = q.answer;
// 	}
// 	html += '<div class="questionAnswer"  style="padding-left: 20px"><p style="indent: ' + indent + ';"><span style="color: #00a0e9;">答案：</span>' + filterHtml(answerHtml) + '</p></div>';
// 	// 解析
// 	if (q.quesAnalyze) {
// 		html += '<div class="questionAnalyze" style="padding-left: 20px"><p style="indent: ' + indent + ';"><span style="color: #00a0e9;">解析：</span>';
// 		var quesAnalyze = JSON.parse(q.quesAnalyze);
// 		if (quesAnalyze.length < 1) {
// 			html += '</p>';
// 		}
// 		quesAnalyze.forEach(function (item, i) {
// 			var key = "";
// 			if (item.analyzeKey) key = item.analyzeKey + "、";
// 			if (i == 0) {
// 				html += filterHtml(key + item.analyzeValue) + '</p>';
// 			} else {
// 				html += filterHtml(key + item.analyzeValue, i, indent);
// 			}
// 		});
// 		html += '</div>';
// 	}
// 	return html;
// }

// function examHtml(data) {
// 	var str = "";
// 	var arr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
// 	str += examHeaderView(data.paperBean);
// 	data.bigQuestionDatas.forEach(function (item, index) {

// 		var bigQuesInfor = item.bigQuestionInforEntity;
// 		str += '<div>' +
// 			'<p>' + filterHtml("<span>" + arr[index] + "、</span>") + '<span name="name">' + bigQuesInfor.itemContent + '</span>' +
// 			'<span>(分数：</span><span name="score">' + bigQuesInfor.itemScore + ',</span>' +
// 			'<span>时间：</span><span name="time">' + bigQuesInfor.itemTime + '分钟)</span></p>' +
// 			'</div>';
// 		item.smallQuestionDatas.forEach(function (value, index) {
// 			var smallQuestion = value.subjectQuestionBean;
// 			smallQuestion.questionEntity.score = value.smallQuestionBean.score;
// 			if (smallQuestion.componentQuestions) {
// 				// 题干
// 				str += '<p style="indent:1">' + filterHtml("<span class=\"questionIndex\">" + (index + 1) + "、</span>" + smallQuestion.questionEntity.stem) + '( ' + smallQuestion.questionEntity.score + '分)</p>';
// 				smallQuestion.componentQuestions.forEach(function (q, i) {
// 					str += questionHtml(q, i + 1, true, true);
// 				});
// 			} else {
// 				str += questionHtml(smallQuestion.questionEntity, index + 1, false, true);
// 			}
// 		})


// 	})
// 	str = str.replace(/<p[^<]*?>(\n)<\/p>/g, "");
// 	return str;
// }
// function examHeaderView(item) {

// 	var str = '<div id="examHead" class="panel-heading">' +
// 		'<p class="text-center" style="text-align:center;"><span style="font-size:20px;font-weight:bold;" name="name">' + item.paperName + '</span></p>' +
// 		'<div class="form-inline" style="text-align:center;">' +
// 		'<p class="form-group">' +
// 		'<span>年级:</span><span name="grade" style="padding:0 20px 0 0;">' + item.gradeName + '&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
// 		'<span>学科:</span><span name="subject" style="padding:0 20px 0 0;">' + item.subjectName + '&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
// 		'<span>教材:</span><span name="bookType" style="padding:0 20px 0 0;">' + item.bookName + '&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
// 		'<span>试卷类型:</span><span name="type" style="padding:0 20px 0 0;">' + item.typeName + '&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
// 		'<span>总分:</span><span name="score" style="padding:0 20px 0 0;">' + item.totalScore + '&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
// 		'<span>考试时间:</span><span name="time">' + item.totalTime + '分钟</span>' +
// 		'</p>' +
// 		'</div>' +
// 		'</div>';
// 	return str;
// }
// // 字符串支持导出word
// function filterHtml(html, questionIndex, indentVal) {
// 	html = html.replace(/http:\/\/.+?\.(png|jpg|jpeg|gif)/g, function (url) {
// 		return '<img  style="max-width: 968px;" src="' + url + '"/>';
// 	});
// 	if (questionIndex) {
// 		if (indentVal == 0) {
// 			html = "<p>" + html + "</p>";
// 		} else {
// 			html = "<p style=\"indent: " + indentVal + ";\">" + html + "</p>";
// 		}
// 	}
// 	return html;
// }
// axios.post('/apis/jeecg/rest/examination/datagrid',params)
// .then(res=>{
// 	let arr = res.data.rows;
// 	let arrs = arr.map(function (currentValue, index, arr) {
// 		return currentValue.id
// 	})
// 	arrs.forEach(function(element) {
// 		axios.get('/apis/jeecg/rest/papers/export/importPaper?id='+element)
// 		.then(ress=>{
// 			let examData = ress.data
// 			examData = JSON.stringify(examData)
			
// 			examData = JSON.parse(stringRemoveHtml(examData)).paperData;
// 			//Object.assign(examData.paperBean, examHead)
// 			let params = examDataToHtml(examData);
			
// 			if (params) {
// 				axios.post('/test/outWord', params)
// 				.then(data=>{
// 					console.log(data)
// 				})
// 			}
// 		})
// 	});
// })
