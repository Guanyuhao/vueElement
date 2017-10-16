let mysqlConfig={
    host:'127.0.0.1',
    user:'root',
    database:'e-eduspace-service-web',
    password:'123456',
    port:'3306'
};
exports.sqlStr = 'mysql://'+mysqlConfig.user+':'+mysqlConfig.password+'@'+mysqlConfig.host+':'+mysqlConfig.port+'/'+mysqlConfig.database;
