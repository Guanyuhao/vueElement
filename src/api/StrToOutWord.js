/*
 *   pObj.addText(text, [style]);    添加文本
 *   pObj.addImage(path);            添加图片
 *   pObj.addOmml(omml);             添加公式
 *   docx.createP();                 添加p标签
 *   pObj.options.align = 'center'   居中
 *   docx.createIndentList(num)      缩进值（0无效）
 *   docx.createLists(5位区别码, 类型(一、1.1、a）A)等), 宽度(num));    自动添加列表数字、字母
 * */
function StrToOutWord(str) {
    this.str = str;
    this.imgUrl = str.match(/http:\/\/.+?\.(png|jpg|jpeg|gif)/g);   // 获取所有图片的地址
    this.transformSpecialCharacters();//转换很特殊的符号
    this.transformDom();    // 文本添加标签，latex转换成mathml
    this.toOfficegen();     // 文本转换成officegen代码
}
StrToOutWord.prototype = {
    //增加对特殊符号的处理
    transformSpecialCharacters: function () {
        this.str = this.str.replace(/⇌/g, '<span style="SpecialCharacters:reversibleReaction;">⇌</span>');
    },
    // 文本添加标签，latex转换成omml
    transformDom: function () {
        // latex转换成mathml
        this.latexToWord();
        // 文本转换成支持导出word的html
        this.str = this.str.replace(/<p.*?>[\s\S]+?<\/p>/g, function (p) {
            var startP = p.match(/^<p.*?>/)[0];
            p = p.outBoth('<p.*?>', '<\\/p>');
            return startP + p.stringToHtml() + '</p>';
        });
        // lists
        this.str = this.str.replace(/lists:.+?><span.*?>(一、|\d{1,2}[\.\)、）]|[a-zA-Z][\.\)、）])/g, function (word) {
            return word.match(/lists:.+?><span.*>/)[0];
        });
    },
    // 文本转换成officegen代码
    toOfficegen: function () {
        // ascll码转换成字符
        this.ascllToSymbol();
        // img
        this.officegenImg();
        // span
        this.officegenSpan();
        // p
        this.officegenP();
        // 处理块级latex
        this.officegenBlockMath();
    },
    // latex
    latexToWord: function () {
        // 从html获取
        this.str = this.str.replace(/<span class="MathJax_Preview".+?<\/script>/g, function (word) {
            return word.match(/<math.+?<\/math>/)[0];
        });
    },
    // img转换成office代码
    officegenImg: function () {
        this.str = this.str.replace(/<img.+?\.(png|jpg|jpeg|gif)"\s*\/>/g, function (img) {
            const wordWidth = 566;
            var url = img.match(/http:\/\/.+?\.(png|jpg|jpeg|gif)/)[0];
            var width = Math.floor(parseInt($("img[src='" + url + "']").width()));
            var pi = wordWidth / width;
            //width = width>wordWidth?wordWidth:width;
            var height = Math.floor(parseInt($("img[src='" + url + "']").height()));
            //height = width==wordWidth?Math.floor(height*pi):height;
            var size = width > wordWidth ? '{ cx: ' + wordWidth + ', cy: ' + Math.floor(height * pi) + ' }' : '{cy: ' + height + '}';
            //url = url.substring(url.lastIndexOf('/') + 1).replace(/"/g, '\\"'); //获得图片名称
            url = url.match(/\/[^/]+\/[^/]+\.(png|jpg|jpeg|gif)/g)[0].replace(/\//g, "_"); //获得图片名称
            return 'pObj.addImage(path.resolve(__dirname,"../../public/outWord/' + url + '" ),  ' + size + '); ';
        });
    },
    // 添加文本（处理span标签样式）
    officegenSpan: function () {
        var _this = this;
        this.str = this.str.replace(/<span[\s\S]+?<\/span>/g, function (word) {
            var span = word.match(/<span.*?>/)[0];
            var text = word.replace(/^<span.*?>/, '').replace(/<\/span>$/, '');
            // span带样式   <span style="font-weight: bold;">  font-weight: bold;
            if (/style=/.test(span)) {
                var style = span.match(/style=".+?"/)[0].replace(/^style="/, "").replace(/"$/, "");
                // 处理style样式
                style = _this.style(style);
                return _this.officegenMath(text, style);
            } else {
                return _this.officegenMath(text, "");
            }
        });
    },
    // 添加文本（处理math标签）
    officegenMath: function (text, style) {
        var _this = this;
        if (/<\/math>/.test(text)) {
            // 文本（在math前面）
            text = text.replace(/[\s\S]*?<math/, function (word) {
                if (word === '<math') {
                    return word;
                } else {
                    var span = word.replace(/<math$/, '');
                    if (style === '') return _this.addText(span) + '<math';
                    return _this.addText(span, style) + '<math';
                }
            });
            // 文本（在math中间）
            text = text.replace(/<\/math>[\s\S]*?<math/g, function (word) {
                if (word === '</math><math') {
                    return word;
                } else {
                    var span = word.replace(/^<\/math>/, '').replace(/<math$/, '');
                    if (style === '') return '</math>' + _this.addText(span) + '<math';
                    return '</math>' + _this.addText(span, style) + '<math';
                }
            });
            // 文本（在math后面）
            var endMath = text.lastIndexOf('</math>');
            text = text.replace(/<\/math>/g, function (word, index) {
                if (index >= endMath) {
                    return '</endMath>';
                } else {
                    return word;
                }
            });
            text = text.replace(/<\/endMath>[\s\S]*/, function (word) {
                if (word === '</endMath>') {
                    return '</math>';
                } else {
                    word = word.replace(/<\/endMath>/, "");
                    if (style === '') return '</math>' + _this.addText(word);
                    return '</math>' + _this.addText(word, style);
                }
            });
            // mathml转换成omml
            text = text.replace(/<math.+?<\/math>/g, function (mathml) {
                var omml = new MathmlToOmml(mathml).mml.replace(/'/g, "\\'");
                return "pObj.addOmml('" + omml + "'); "
            });
            return text;
        } else {
            if (style === '') {
                return _this.addText(text);
            }
            return _this.addText(text, style);
        }
    },
    // span样式处理
    style: function (style) {
        var styleObj = {};
        //化学可逆反应符号
        if (/SpecialCharacters:.+?;/.test(style)) {
            styleObj.SpecialCharacters = style.match(/SpecialCharacters:.+?;/)[0].outBoth('SpecialCharacters:', ';');
        }
        // 字体颜色
        if (/color:.+?;/.test(style)) {
            styleObj.color = style.match(/color:.+?;/)[0].outBoth('color:', ';').replace('#', '');
        }
        // 背景颜色
        if (/background:.+?;/.test(style)) {
            styleObj.back = style.match(/background:.+?;/)[0].outBoth('background:', ';').replace('#', '');
        }
        // 下划线
        if (/text-decoration:\s*underline;/.test(style)) {
            styleObj.underline = true;
        }

        // 大小
        if (/font-size:.+?;/.test(style)) {
            styleObj.font_size = parseInt(style.match(/font-size:.+?;/)[0].outBoth('font-size:', ';').replace('px', '')) * 0.7;
        }
        // 斜体
        if (/font-style:\s*italic;/.test(style)) {
            styleObj.italic = true;
        }
        // 粗体
        if (/font-weight:\s*bold;/.test(style)) {
            styleObj.bold = true;
        }
        // 上标
        if (/vertical-align:\s*super;/.test(style)) {
            styleObj.sup = true;
        }
        // 下标
        if (/vertical-align:\s*sub;/.test(style)) {
            styleObj.sub = true;
        }
        // 字体
        if (/font-family:.+?;/.test(style)) {
            styleObj.font_face = style.match(/font-family:.+?;/)[0].outBoth('font-family:', ';');
        }
        styleObj = JSON.stringify(styleObj);
        return styleObj == {} ? "" : styleObj;
    },
    // 添加文本（处理换行符）
    addText: function (text, style) {
        if (/\n/.test(text)) {
            // 换行符
            text = text.replace(/\n/g, 'pObj.addLineBreak(); ');
            // 文本（在\n前面）
            text = text.replace(/.*?pObj.addLi/, function (word) {
                if (word === 'pObj.addLi') {
                    return word;
                } else {
                    var span = word.replace(/pObj.addLi$/, '').replace(/"/g, '\\"');
                    if (style) {
                        return 'pObj.addText("' + span + '",' + style + '); pObj.addLi';
                    }
                    return 'pObj.addText("' + span + '"); pObj.addLi';
                }
            });
            // 文本（在\n中间）
            text = text.replace(/eBreak\(\);.*?pObj.addLi/g, function (word) {
                if (word === 'eBreak(); pObj.addLi') {
                    return word;
                } else {
                    var span = word.outBoth('eBreak\\(\\);', 'pObj.addLi').replace(/"/g, '\\"');
                    if (style) return 'eBreak(); pObj.addText("' + span + '",' + style + '); pObj.addLi';
                    return 'eBreak(); pObj.addText("' + span + '"); pObj.addLi';
                }
            });
            // 文本（在最后一个\n后面）
            var endN = text.lastIndexOf('pObj.addLineBreak(); ');
            text = text.replace(/pObj.addLineBreak\(\); /g, function (word, index) {
                if (index >= endN) {
                    return 'endN';
                } else {
                    return word;
                }
            });
            text = text.replace(/endN.*/, function (word) {
                if (word === 'endN') {
                    return 'pObj.addLineBreak(); ';
                } else {
                    word = word.replace(/^endN/, "").replace(/"/g, '\\"');
                    if (style) return 'pObj.addLineBreak(); pObj.addText("' + word + '",' + style + '); ';
                    return 'pObj.addLineBreak(); pObj.addText("' + word + '"); ';
                }
            });
        } else {
            text = text.replace(/"/g, '\\"');
            if (style) {
                text = 'pObj.addText("' + text + '",' + style + '); '
            } else {
                text = 'pObj.addText("' + text + '"); '
            }
        }
        return text;
    },
    // p转换成office代码
    officegenP: function () {
        this.str = this.str.replace(/<p.*?>/g, function (word) {
            // 缩进
            if (/indent:.+?;/.test(word)) return 'pObj = docx.createIndentList("' + parseInt(word.match(/indent:.+?;/)[0].outBoth('indent:', ';')) + '"); ';
            // lists
            if (/lists:.+?;/.test(word)) return 'pObj = docx.createLists("' + word.match(/lists:.+?;/)[0].outBoth('lists:\\s*', ';') + '"); ';
            // 对齐方式
            if (/text-align:.+?;/.test(word)) return 'pObj = docx.createP(); pObj.options.align = "' + word.match(/text-align:.+?;/)[0].outBoth('text-align:', ';') + '"; ';
            // 不带样式的p标签
            return 'pObj = docx.createP(); ';
        });
        this.str = this.str.replace(/<\/p>/g, '');
    },
    // 处理块级latex
    officegenBlockMath: function () {
        this.str = this.str.replace(/.{8}pObj.addOmml\('<m:oMathPara>.+?<\/m:oMathPara>'\);.{10}/g, function (word) {
            var start = word.match(/^.{8}/)[0];
            var end = word.match(/.{10}$/)[0];
            word = word.outBoth('.{8}', '.{10}');
            var blockOmml = '';
            if (!/teP\(\);/.test(start)) blockOmml += 'pObj = docx.createP(); ';
            blockOmml += word;
            if (!/pObj = /.test(end)) blockOmml += 'pObj = docx.createP(); ';
            return start + blockOmml + end;
        });
    },
    // ascll码转换成字符
    ascllToSymbol: function () {
        this.str = this.str.replace(/&[A-z\d#]{2,6};/g, function (ascll) {
            return $('<p>' + ascll + '</p>').text();
        });
    }
};

// mathml转换成omml
function MathmlToOmml(mml) {
    this.mml = mml;
    this.domArr = ['msup', 'msub', 'mfrac', 'msqrt', 'mroot', 'msubsup', 'munderover', 'mover', 'mtable', 'munder'];
    this.symbol = { "^": "", "~": "̃", "←": "⃖", "→": "⃗" };
    this.ctrlPr = '<m:ctrlPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math"/></w:rPr></m:ctrlPr>';
    this.rPr = '<m:rPr><m:sty m:val="p"/></m:rPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math"/></w:rPr>';
    this.smallRpr = '<w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math"/></w:rPr>';
    this.domAddNum();   // 给所有mathml标签添加数字
    this.replaceMath(); // 替换math标签
    this.replaceMtable(); // 替换mtable标签
    this.replaceSinglebracket(); // 替换单括号
    this.replaceBrackets(); // 替换各种括号 ([|{
    this.replaceMfrac(); // 替换mfrac标签
    this.replaceMsup(); // 替换msup标签
    this.replaceMsub(); // 替换msub标签
    this.replaceMsqrt(); // 替换msqrt标签
    this.replaceMroot(); // 替换mroot标签
    this.replaceMunderover(); // 替换munderover标签
    this.replaceMsubsup(); // 替换msubsup标签
    this.replaceMunder(); // 替换munder标签
    this.replaceMover(); // 替换mover标签
    this.replacemMspace(); // 替换空格
    this.multipleText(); // 合并多个连续文本
    this.otherDom(); // 处理其他标签
    this.lowercaseToCapital();  // 小写标签改成大写标签
}

MathmlToOmml.prototype = {
    // 给所有mathml标签添加数字
    domAddNum: function () {
        var _this = this;
        this.domArr.forEach(function (dom) {
            var domIndex = 0;
            // 标签开始部分添加数字
            _this.mml = _this.mml.replace(eval('/<' + dom + '\\s*[\\sA-z\\d="]*>/g'), function (word) {
                if (dom === 'msub' && /^<msubsup/.test(word)) {
                    return word;
                } else if (dom === 'munder' && /^<munderover/.test(word)) {
                    return word;
                }
                domIndex++;
                return word.replace(eval('/^<' + dom + '/'), '<' + dom + domIndex);
            });
            // 标签结尾部分添加数字
            var mathleng = _this.mml.match(eval('/<\\/' + dom + '>/g'));
            if (mathleng) {   // 判断是否有改标签
                mathleng.forEach(function () {
                    _this.mml = _this.mml.replace(eval('/<\\/' + dom + '>/'), function (word, index) {
                        var str = _this.mml.substring(0, index);
                        // 查找 str 中所有的 dom 标签
                        var domNum = str.match(eval('/<\\/?' + dom + '\\d+\\s*[A-z\\d\\s="]*>/g'));
                        domNum = domNum.map(function (item) {
                            return item.match(/\d+/)[0];
                        });
                        domNum = domNum.replaceOut();
                        return word.replace(eval('/^<\\/' + dom + '/'), '</' + dom + domNum[domNum.length - 1]);
                    });
                });
            }
        })
    },
    // 获取标签数字的最大值
    getDomMaxIndex: function (dom) {
        dom = this.mml.match(eval('/<' + dom + '\\d+>/g'));
        if (dom) {
            dom = parseInt(dom[dom.length - 1].match(/\d+/)[0]);
        } else {
            dom = 0;
        }
        return dom;
    },
    // 去除前后mrow标签
    removeMrow: function (html) {
        return html.replace(/^<mrow[\sA-z=\-"]*>/, "").replace(/<\/mrow>$/, "");
    },
    // 特殊符号处理
    symbolToWord: function (html) {
        var value = "";
        var _this = this;
        if (/&[#A-z\d]+;/.test(html)) {
            html = html.replace(/&[#A-z\d]+;/g, function (word) {
                word = $('<p>' + word + '</p>').text();
                for (var k in _this.symbol) {
                    if (k === word) {
                        value = _this.symbol[k];
                    }
                }
                return value;
            });
        } else if (/<(mo|mi|me)>.+?<\/(mo|mi|me)>/.test(html)) {
            html = html.replace(/<(mo|mi|me)>.+?<\/(mo|mi|me)>/g, function (word) {
                word = word.replace(/<\/?(mo|mi|me)>/g, "");
                for (var k in _this.symbol) {
                    if (k === word) {
                        value = _this.symbol[k];
                    }
                }
                return value;
            });
        } else {
            html = html.replace(/./g, function (word) {
                value = word;
                for (var k in _this.symbol) {
                    if (k === word) {
                        value = _this.symbol[k];
                    }
                }
                return value;
            });
        }
        return html;
    },
    // math
    replaceMath: function () {
        this.mml = this.mml.replace(/.+/, function (mml) {
            var mathStart = mml.match(/^<math.+?>/)[0];
            var mathEnd = '';
            if (/display="block"/.test(mathStart)) {
                mathStart = '<m:oMathPara><m:oMath>';
                mathEnd = '</m:oMath></m:oMathPara>'
            } else {
                mathStart = '<m:oMath>';
                mathEnd = '</m:oMath>';
            }
            return mml.replace(/^<math.+?>/, mathStart).replace(/<\/math>$/, mathEnd);
        });
    },
    // 堆栈
    replaceMtable: function () {
        var mtable = this.getDomMaxIndex('mtable');
        var _this = this;
        for (var i = 1; i <= mtable; i++) {
            _this.mml = _this.mml.replace(eval('/<mo[A-z\\d="\\s]*>.*?<\\/mo><mtable' + index + '[A-z\\d="\\s]*>.+<\\/mtable' + index + '><mo[A-z\\d="\\s]*>.*?<\\/mo>/'), function (word) {
                var begChr = word.match(/^<mo[A-z\d="\s]*>.*?<\/mo>/)[0].replace(/<\/?mo[A-z\d="\s]*>/g, "");         // 括号类型
                var endChr = word.match(/<mo[A-z\d="\s]*>.{1,10}<\/mo>$/)[0].replace(/<\/?mo[A-z\d="\s]*>/g, "");         // 括号类型
                word = word.replace(/^<mo[A-z\d="\s]*>.*?<\/mo><mtable\d+[A-z\d="\s]*>/, "").replace(/<\/mtable\d+><mo[A-z\d="\s]*>.*?<\/mo>$/, "");    // 获取里面的内容
                word = $(word);
                var me = "";
                word.each(function (index, mtr) {
                    mtr = $(mtr);
                    mtr.each(function (i, mtd) {  //  &amp;为分栏标志
                        mtd = mtd.innerHTML.replace(/^<mtd>/, "").replace(/<\/mtd>$/, "").replace(/<\/mtd><mtd>/g, '  &amp;');
                        me += "<m:e>" + mtd + "</m:e>";
                    });
                });
                return '<m:d><m:dPr><m:begChr m:val="' + begChr + '"/><m:endChr m:val="' + endChr + '"/>' + _this.ctrlPr + '</m:dPr><m:e><m:eqArr><m:eqArrPr>' + _this.ctrlPr + '</m:eqArrPr>' + me + '</m:eqArr></m:e></m:d>';
            });
        }
    },
    // 替换单括号
    replaceSinglebracket: function () {
        var _this = this;
        this.mml = this.mml.replace(/(<mo\sfence="true"\sstretchy="true"\ssymmetric="true"><\/mo>.+?<mo[\sA-z="]*>(\||\}|\)|\])<\/mo>|<mo[\sA-z="]*>(\||\{|\(|\[)<\/mo>.+?<mo\sfence="true"\sstretchy="true"\ssymmetric="true"><\/mo>)/g, function (word) {
            word = $(word);
            var begChr = "",
                ctn = "",
                endChr = "";
            word.each(function (index, item) {
                switch (index) {
                    case 0: // 括号类型
                        begChr = item.innerHTML;
                        break;
                    case word.length - 1: // 括号类型
                        endChr = item.innerHTML;
                        break;
                    default:   // 内容
                        item = $(item);
                        // 单括号特殊处理
                        item.children('mn').addClass('smallRpr');
                        item.children('mi').addClass('smallRpr');
                        item.children('mo').addClass('smallRpr');
                        ctn += _this.removeMrow(item[0].outerHTML);
                }
            });
            // 紧跟着上下标时特殊处理
            var msup = "";
            if (/<(msup|msub)\d+>$/.test(ctn)) {
                msup = ctn.match(/<(msup|msub)\d+>$/)[0];
                ctn = ctn.replace(/<(msup|msub)\d+>$/, "");
            }
            return msup + '<m:d><m:dPr><m:begChr m:val="' + begChr + '"/><m:endChr m:val="' + endChr + '"/>' + _this.ctrlPr + '</m:dPr><m:e>' + ctn + '</m:e></m:d>';
        });
    },
    // 替换各种括号 ([|{
    replaceBrackets: function () {
        var _this = this;
        this.mml = this.mml.replace(/(<mo[\sA-z="]*>\(<\/mo>.+?<mo[\sA-z="]*>\)<\/mo>|<mo[\sA-z="]*>\[<\/mo>.+?<mo[\sA-z="]*>\]<\/mo>|<mo[\sA-z="]*>\{<\/mo>.+?<mo[\sA-z="]*>\}<\/mo>|<mo[\sA-z="]*>\|<\/mo>.+?<mo[\sA-z="]*>\|<\/mo>)/g, function (word) {
            word = $(word);
            var begChr = "",
                ctn = "",
                endChr = "";
            word.each(function (index, item) {
                switch (index) {
                    case 0: // 括号类型
                        begChr = item.innerHTML;
                        break;
                    case word.length - 1: // 括号类型
                        endChr = item.innerHTML;
                        break;
                    default:   // 内容
                        ctn += _this.removeMrow(item.outerHTML);
                }
            });
            // 紧跟着上下标时特殊处理
            var msup = "";
            if (/<(msup|msub)\d+>$/.test(ctn)) {
                msup = ctn.match(/<(msup|msub)\d+>$/)[0];
                ctn = ctn.replace(/<(msup|msub)\d+>$/, "");
            }
            return msup + '<m:d><m:dPr><m:begChr m:val="' + begChr + '"/><m:endChr m:val="' + endChr + '"/>' + _this.ctrlPr + '</m:dPr><m:e>' + ctn + '</m:e></m:d>';
        });
    },
    // 分数
    replaceMfrac: function () {
        var mfrac = this.getDomMaxIndex('mfrac');
        var _this = this;
        for (var i = 1; i <= mfrac; i++) {
            _this.mml = _this.mml.replace(eval('/<mfrac' + i + '>.+<\\/mfrac' + i + '>/'), function (word) {
                word = word.replace(/^<mfrac\d+>/, "").replace(/<\/mfrac\d+>$/, "");
                var top = "";
                var bottom = "";
                word = $(word);
                word.each(function (index, item) {
                    switch (index) {
                        case 0: // 上面
                            top = _this.removeMrow(item.outerHTML);
                            break;
                        case 1: // 下面
                            bottom = _this.removeMrow(item.outerHTML);
                            break;
                    }
                });
                return '<m:f><m:fPr>' + _this.ctrlPr + '</m:fPr><m:num>' + top + '</m:num><m:den>' + bottom + '</m:den></m:f>';
            });
        }
    },
    // 上标
    replaceMsup: function () {
        var msup = this.getDomMaxIndex('msup');
        var _this = this;
        for (var i = 1; i <= msup; i++) {
            _this.mml = _this.mml.replace(eval('/<msup' + i + '>.+<\\/msup' + i + '>/'), function (word) {
                word = word.replace(/^<msup\d+>/, "").replace(/<\/msup\d+>$/, "");
                var sup = "";       // 上标
                var me = "";        // 正常显示的
                word = $(word);
                word.each(function (index, item) {
                    item = $(item);
                    switch (index) {
                        case 0:
                            if (item.attr('class')) {
                                me = item.html();
                            } else {
                                me = item[0].outerHTML;
                            }
                            break;
                        case 1:
                            if (item.attr('class')) {
                                sup = item.html();
                            } else {
                                sup = item[0].outerHTML;
                            }
                            break;
                    }
                });
                return '<m:sSup><m:sSupPr>' + _this.ctrlPr + '</m:sSupPr><m:e>' + me + '</m:e><m:sup>' + sup + '</m:sup></m:sSup>';
            });
        }
    },
    // 下标
    replaceMsub: function () {
        var msub = this.getDomMaxIndex('msub');
        var _this = this;
        for (var i = 1; i <= msub; i++) {
            _this.mml = _this.mml.replace(eval('/<msub' + i + '>.+<\\/msub' + i + '>/'), function (word) {
                word = word.replace(/^<msub\d+>/, "").replace(/<\/msub\d+>$/, "");
                var sub = "";       // 下标
                var me = "";        // 正常显示的
                word = $(word);
                word.each(function (index, item) {
                    item = $(item);
                    switch (index) {
                        case 0:
                            if (item.attr('class')) {
                                me = item.html();
                            } else {
                                me = item[0].outerHTML;
                            }
                            break;
                        case 1:
                            if (item.attr('class')) {
                                sub = item.html();
                            } else {
                                sub = item[0].outerHTML;
                            }
                            break;
                    }
                });
                return '<m:sSub><m:sSubPr>' + _this.ctrlPr + '</m:sSubPr><m:e>' + me + '</m:e><m:sub>' + sub + '</m:sub></m:sSub>';
            });
        }
    },
    // 开方
    replaceMsqrt: function () {
        var msqrt = this.getDomMaxIndex('msqrt');
        var _this = this;
        for (var i = 1; i <= msqrt; i++) {
            _this.mml = _this.mml.replace(eval('/<msqrt' + i + '>.+<\\/msqrt' + i + '>/'), function (word) {
                word = word.replace(/^<msqrt\d+>/, "").replace(/<\/msqrt\d+>$/, "");
                return '<m:rad><m:radPr><m:degHide m:val="on"/>' + _this.ctrlPr + '</m:radPr><m:deg/><m:e>' + word + '</m:e></m:rad>';
            });
        }
    },
    // 开n次方
    replaceMroot: function () {
        var mroot = this.getDomMaxIndex('mroot');
        var _this = this;
        for (var i = 1; i <= mroot; i++) {
            _this.mml = _this.mml.replace(eval('/<mroot' + i + '>.+<\\/mroot' + i + '>/'), function (word) {
                word = word.replace(/^<mroot\d+>/, "").replace(/<\/mroot\d+>$/, "");
                var deg = "";
                var me = "";
                word = $(word);
                word.each(function (index, item) {
                    item = $(item);
                    switch (index) {
                        case 0:
                            me = item[0].outerHTML;
                            break;
                        case 1:
                            deg = item[0].outerHTML;
                            break;
                    }
                });
                return '<m:rad><m:radPr>' + _this.ctrlPr + '</m:radPr><m:deg>' + deg + '</m:deg><m:e>' + me + '</m:e></m:rad>';
            });
        }
    },
    // 积分
    replaceMunderover: function () {
        var munderover = this.getDomMaxIndex('munderover');
        var _this = this;
        for (var i = 1; i <= munderover; i++) {
            _this.mml = _this.mml.replace(eval('/<munderover' + i + '>.+<\\/munderover' + i + '>/'), function (word) {
                word = word.replace(eval('/^<munderover' + i + '>/'), "").replace(eval('/<\\/munderover' + i + '>/'), "");
                word = $(word);
                var chr = '',   // 符号
                    sub = "",   // 下标
                    sup = "",   // 上标
                    limLoc = 'undOvr';  // 上下标类型
                word.each(function (index, item) {
                    item = $(item);
                    switch (index) {
                        case 0:
                            chr = item.text();
                            break;
                        case 1:
                            if (/^<mpadded/.test(item[0].outerHTML)) {
                                sub = item[0].innerHTML;
                                //limLoc = 'undOvr'
                            } else {
                                sub = _this.removeMrow(item[0].outerHTML);
                            }
                            break;
                        case 2:
                            if (/^<mpadded/.test(item[0].outerHTML)) {
                                sup = item[0].innerHTML;
                                //limLoc = 'undOvr'
                            } else {
                                sup = _this.removeMrow(item[0].outerHTML);
                            }
                            break;
                    }
                });
                return '<m:nary><m:naryPr><m:chr m:val="' + chr + '"/><m:limLoc m:val="' + limLoc + '"/>' + _this.ctrlPr + '</m:naryPr><m:sup>' + sup + '</m:sup><m:sub>' + sub + '</m:sub><m:e><mo> </mo></m:e></m:nary>';
            });
        }
    },
    // 上标下标
    replaceMsubsup: function () {
        var msubsup = this.getDomMaxIndex('msubsup');
        var _this = this;
        for (var i = 1; i <= msubsup; i++) {
            _this.mml = _this.mml.replace(eval('/<msubsup' + i + '>.+<\\/msubsup' + i + '>/'), function (word) {
                word = word.replace(eval('/^<msubsup' + i + '>/'), "").replace(eval('/<\\/msubsup' + i + '>/'), "");
                word = $(word);
                var me = '',   // 符号
                    sub = "",   // 下标
                    sup = "";   // 上标
                word.each(function (index, item) {
                    item = $(item);
                    switch (index) {
                        case 0:
                            me = _this.removeMrow(item[0].outerHTML);
                            break;
                        case 1:
                            item.children('mn').addClass('smallRpr');
                            item.children('mi').addClass('smallRpr');
                            item.children('mo').addClass('smallRpr');
                            sub = _this.removeMrow(item[0].outerHTML);
                            break;
                        case 2:
                            item.children('mn').addClass('smallRpr');
                            item.children('mi').addClass('smallRpr');
                            item.children('mo').addClass('smallRpr');
                            sup = _this.removeMrow(item[0].outerHTML);
                            break;
                    }
                });
                // sup为空时
                if (/^<mspace/.test(sup)) {
                    sup = '<m:sup><mo> </mo></m:sup>';
                } else {
                    sup = '<m:sup>' + sup + '</m:sup>';
                }
                // sub为空时
                if (/^<mspace/.test(sub)) {
                    sub = '<m:sub><mo> </mo></m:sub>';
                } else {
                    sub = '<m:sub>' + sub + '</m:sub>';
                }
                return '<m:sSubSup><m:sSubSupPr>' + _this.ctrlPr + '</m:sSubSupPr><m:e>' + me + '</m:e>' + sub + sup + '</m:sSubSup>';
            });
        }
    },
    // 函数
    replaceMunder: function () {
        var munder = this.getDomMaxIndex('munder');
        var _this = this;
        for (var i = 1; i <= munder; i++) {
            _this.mml = _this.mml.replace(eval('/<munder' + i + '[A-z\\d="\\s]*>.+<\\/munder' + i + '>/'), function (word) {
                word = word.replace(/^<munder\d+[A-z\d="\s]*>/, "").replace(/<\/munder\d+>$/, "");      // 获取里面的内容
                word = $(word);
                var fName = "", // 函数名
                    lim = "";   // 函数参数
                word.each(function (index, item) {
                    switch (index) {
                        case 0:
                            fName = item.outerHTML;
                            break;
                        case 1:
                            lim = item.innerHTML;
                            break;
                    }
                });
                return '<m:func><m:funcPr>' + _this.ctrlPr + '</m:funcPr><m:fName><m:limLow><m:limLowPr>' + _this.ctrlPr + '</m:limLowPr><m:e>' + fName + '</m:e><m:lim>' + lim + '</m:lim></m:limLow></m:fName><m:e><mo> </mo></m:e></m:func>';
            });
        }
    },
    // mover
    replaceMover: function () {
        var mover = this.getDomMaxIndex('mover');
        var _this = this;
        for (var i = 1; i <= mover; i++) {
            _this.mml = _this.mml.replace(eval('/<mover' + i + '>.+<\\/mover' + i + '>/'), function (word) {
                word = word.replace(/^<mover\d+>/, "").replace(/<\/mover\d+>$/, "");
                word = $(word);
                var chr = '',   // 符号
                    me = '';    // 内容
                word.each(function (index, item) {
                    item = $(item);
                    var outerHtml = item[0].outerHTML;
                    switch (index) {
                        case 0:
                            // 判断是否是化学式
                            if (/^<mpadded/.test(word.eq(1)[0].outerHTML)) {
                                chr = _this.symbolToWord(item.text());
                            } else {
                                me = outerHtml;
                            }
                            break;
                        case 1:
                            // 判断是否是化学式
                            if (/^<mpadded/.test(outerHtml)) {
                                me = item[0].innerHTML;
                            } else {
                                chr = _this.symbolToWord(item.text());
                            }
                            break;
                    }
                });
                // 判断是否是化学式
                if (/^<mpadded/.test(word.eq(1)[0].outerHTML)) {
                    return '<m:box><m:boxPr><m:opEmu m:val="on"/>' + _this.ctrlPr + '</m:boxPr><m:e><m:groupChr><m:groupChrPr><m:chr m:val="' + chr + '"/><m:vertJc m:val="bot"/>' + _this.ctrlPr + '</m:groupChrPr><m:e>' + me + '</m:e></m:groupChr></m:e></m:box>';
                } else {
                    return '<m:acc><m:accPr><m:chr m:val="' + chr + '"/>' + _this.ctrlPr + '</m:accPr><m:e>' + me + '</m:e></m:acc>';
                }
            });
        }
    },
    // 空格
    replacemMspace: function () {
        this.mml = this.mml.replace(/<mspace.+?\/>/g, function (space) {
            space = space.match(/width=".+?"/)[0].outBoth('width="', '"');
            space = parseInt(space) * 4;
            var preserve = '';
            for (var i = 0; i < space; i++) {
                preserve += ' ';
            }
            return '<w:r><w:rPr><w:rFonts w:hint="eastAsia"/><w:lang w:eastAsia="zh-CN"/></w:rPr><w:t xml:space="preserve">' + preserve + '</w:t></w:r>';
        })
    },
    // 合并多个文本
    multipleText: function () {
        var _this = this;
        this.mml = this.mml.replace(/((<(mi|mo|mn|mtext)[\sA-z="]*>.+?<\/(mi|mo|mn|mtext)>)|\s+&amp;)+/g, function (word) {
            var pr = _this.rPr;
            if (/class="smallRpr"/.test(word)) pr = _this.smallRpr;
            word = word.replace(/<\/?(mi|mo|mn|mtext)[\sA-z="]*>/g, "");
            return '<m:r>' + pr + '<m:t>' + word + '</m:t></m:r>';
        });
    },
    // 处理其他标签
    otherDom: function () {
        this.mml = this.mml.replace(/<\/?mrow[\sA-z=\-"]*>/g, "");
        this.mml = this.mml.replace(/<\/?mpadded[\sA-z\d=\-"+\.]*>/g, "");
        this.mml = this.mml.replace(/&#[A-z\d]+;/g, function (word) {
            return $('<p>' + word + '</p>').text();
        });
    },
    // 小写标签改成大写标签
    lowercaseToCapital: function () {
        this.mml = this.mml.replace(/<?\/?(m:ssub|m:ssup|m:ssubsup|m:[a-z]+pr|m:[a-z]+chr|w:rfonts|w:hansi|m:opemu|m:vertjc|m:fname|m:limlow|m:deghide)>?/g, function (word) {
            var dom = word.replace(/<|\/|>/g, "");
            switch (dom) {
                case 'm:ssubsup': word.replace(/m:ssubsup>?$/, 'm:sSubSup');
                    break;
                case 'm:ssub': word.replace(/m:ssub>?$/, 'm:sSub');
                    break;
                case 'm:ssup': word.replace(/m:ssup>?$/, 'm:sSup');
                    break;
                case 'w:rfonts': word.replace(/w:rfonts>?$/, 'w:rFonts');
                    break;
                case 'w:hansi': word.replace(/w:hansi>?$/, 'w:hAnsi');
                    break;
                case 'm:vertjc': word.replace(/m:vertjc>?$/, 'm:vertJc');
                    break;
                case 'm:fname': word.replace(/m:fname>?$/, 'm:fName');
                    break;
                case 'm:limlow': word.replace(/m:limlow>?$/, 'm:limLow');
                    break;
                case 'm:deghide': word.replace(/m:deghide>?$/, 'm:degHide');
                    break;
                default:
                    word = word.replace(/pr/, 'Pr');
                    word = word.replace(/chr/, 'Chr');
            }
            return word;
        });
    }
};


// 文本转换成支持导出word的html
String.prototype.stringToHtml = function () {
    var str = this;
    // em strong sub sup
    str = str.replace(/<(em|strong|sub|sup|font).*?>.+?<\/(em|strong|sub|sup|font)>/g, function (word) {
        var dom = word.match(/[a-z]+/)[0];
        var style = "";
        word = word.replace(/<\/?(em|strong|sub|sup|font)>/g, '').replace(/<(em|strong|sub|sup|font).*?>/g, '');
        switch (dom) {
            case "em":
                return '<span style="font-style: italic;">' + word + '</span>';
                break;
            case "strong":
                return '<span style="font-weight: bold;">' + word + '</span>';
                break;
            case "sup":
                return '<span style="vertical-align: super;">' + word + '</span>';
                break;
            case "sub":
                return '<span style="vertical-align: sub;">' + word + '</span>';
                break;
            case "font":
                var style = "";
                if (/style=".*?"/g.test(word)) {
                    style = word.match(/style=".*?"/g)[0];
                }
                return '<span ' + style + '>' + word + '</span>';
                break;
        }
    });
    // 没有标签的文本
    // 处理img标签
    str = str.replace(/<img/g, '<spanimg');
    str = str.replace(/\.(png|jpg|jpeg|gif)"\s*\/>/g, function (img) {
        return img.replace(/\/>$/, '<img/span>');
    });
    // 处理文本
    // 最前面
    str = str.replace(/[\s\S]*?<span/, function (word) {
        if (word === '<span') {
            return word;
        } else {
            word = word.replace(/<span$/, "");
            return '<span>' + word + '</span><span'
        }
    });
    // span 里面包含有 img
    str = str.replace(/<span(?!img).*?>[\s\S]*?<\/span>/g, function (word) {
        if (/<spanimg/.test(word)) {
            var span = word.match(/^<span(?!img).*?>/)[0];
            word = word.replace(/^<span(?!img).*?><spanimg/, '<spanimg');       // img 在span标签最前面
            word = word.replace(/<img\/span><\/span>$/, '<img/span>');       // img 在span标签最后面
            word = word.replace(/[\s\S]+?<spanimg/g, function (text) {        // img 前面的内容添加</span>
                return text.replace(/<spanimg$/, '</span><spanimg');
            });
            word = word.replace(/<img\/span>.+?/g, function (text) {           // img 后面的内容添加<span>
                return text.replace(/<img\/span>/, '<img/span>' + span);
            });
        }
        return word;
    });
    // 中间(</span>与<span>之间)
    str = str.replace(/<(img)?\/span>[\s\S]*?<span/g, function (word) {
        if (/^<(img)?\/span>\s*<span$/.test(word)) {  // 中间没有内容时，或者是是空字符时
            return word;
        } else {
            word = word.replace(/\/span>/, '/span><span>').replace(/<span$/, '</span><span');
            return word;
        }
    });
    // 最后
    var endSpan = str.lastIndexOf('/span>');
    // 把最后的span标签替换成endSpan
    str = str.replace(/\/span>/g, function (word, index) {
        if (index >= endSpan) {
            return '/endSpan>';
        } else {
            return word;
        }
    });
    str = str.replace(/\/endSpan>[\s\S]*$/, function (word) {
        if (/^\/endSpan>$/.test(word)) {
            return word.replace(/endSpan/, 'span');
        } else {
            word = word.replace(/\/endSpan>/, '/span><span>');
            return word + '</span>';
        }
    });
    // 复原
    str = str.replace(/<spanimg/g, '<img');
    str = str.replace(/<img\/span>/g, '/>');
    // 没有任何标签的
    if (str.indexOf('<span') === -1 && str.indexOf('<img') === -1) {
        str = '<span>' + str + '</span>';
    }
    //处理span套span
    if (str.match(/<span/g).length > 1) {
        str = str.replace(/<\/span>/g, "<span>").replace(/<span/g, "</span><span").replace(/^<\/span>/, "").replace(/<span>$/, "").replace(/<span><img/g, "<img").replace(/\/><\/span>/g, "/>").replace(/<span><\/span>/g, "").replace(/<span[^<]*?><span>/g, "<span>").replace(/<\/span><\/span>/g, "</span>");
    }
    //console.log(str);
    return str;
};


// 字符串掐头去尾
String.prototype.outBoth = function (a, b) {
    return this.replace(eval('/^' + a + '/'), '').replace(eval('/' + b + '$/'), '')
};

// 数组出去重复值（包括本身）
Array.prototype.replaceOut = function () {
    var replaceObj = {};
    var arr = this;
    var deleteArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (replaceObj[arr[i]]) {
            deleteArr.push(arr[i]);
        } else {
            replaceObj[arr[i]] = 1;
        }
    }
    deleteArr.forEach(function (item) {
        for (var i = 0; i < arr.length; i++) {
            if (item === arr[i]) {
                arr.splice(i, 1);
                i--;
            }
        }

    });
    return arr;
};

export default {
    StrToOutWord 
}