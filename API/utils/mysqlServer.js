/**
 * Created by guosen on 2015/7/2.
 */
var orm = require('orm');
var sqlConfig = require('./mysqlConfig')
module.exports = function (app) {

  //  console.log(orm.settings.get('connection'))
    orm.settings.set('connection.pool',true);
    //console.log(orm.settings.get('connection'))//instance
    //console.log(orm.settings.get('instance'))//instance
    //orm.settings.set('instance.autoFetch',true);
    //orm.settings.set('instance.autoFetchLimit',10);
    //orm.settings.set('instance.returnAllErrors',true);
    //console.log(orm.settings.get('instance'))//instance

    app.use(orm.express(global.sqlStr, {
        define: function (db, models, next) {
            models.subject = db.define("subjects", {
                name:String,
                code:String,
                isdelete:Boolean
            },{
                cache:false
               // autoSave:true
            });
            models.stage = db.define("stages", {
                name:String,
                code:String,
                isdelete:Boolean
            },{
                cache:false
                //autoSave:true
            });
            models.userinfo = db.define("userinfo", {
                name:String,
                username:String,
                password:String,
                platform:String,
                isdelete:Boolean
            },{
                autoFetch : true,
                cache:false
              //  autoSave:true
            });

            models.role=db.define('role',{
                name:String,
                isdelete:Boolean
            },{
                cache:false
               // autoSave:true
            });

            models.userinfo.hasMany('stage',models.stage);
            models.userinfo.hasMany('subject',models.subject);
            models.userinfo.hasMany('role',models.role);
            models.subject.sync();
            models.stage.sync();
            models.role.sync();
            models.userinfo.sync();
            //return next();
            next();
        }
    }));
}