# nodejs_study
1.npm模組
2.
安裝
express{
    None : npm install express@3.4.8
},
nodejs{
    Linux : apt-get install nodejs
    Mac : brew install node
},
第三方模組{
    npm install async
},
mongodb{
    Linux : sudo apt-get install mongodb
    Mac : {
    Step-1 : crul http://xxx.mongodb-osx-x86_64-2.4.8.tgz >> mongodb-osx-x86_64-2.4.8.tgz
    Step-2 : tar -zxvf mongodb-osx-x86_64-2.4.8.tgz
    Step-3 : sudo mv mongodb-osx-x86_64-2.4.8/ /usr/local/bin
    Step-4 : sudo mkdir -p /data/db
    Step-5 : sudo chown 'id -u' /data/db
        Done
    Step-6 : mongod(進入mongodb指令模式)
    }
}


===============================
//啟用伺服器port
node example.js 0.0.0.0 
http://learn.koding.com/guides/what-happened-to-127-0-0-1/
===============================

#ex1.js
基本

#ex2.js
繼承

#ex3.js
觸發事件

#ex4
簡單自訂模組

#ex5
讀,寫檔案
1: callback範例
http://dreamerslab.com/blog/tw/node-js-basics/
http://dreamerslab.com/blog/tw/javascript-callbacks/

#ex6

1: listen more port
2: listen port & url path

#ex7
client listen 網站跟port

1 : client 連線伺服器
2 : client 連線伺服器, 傳送資料至伺服器 

P.S
    Step-1 : 必須先node app_server.js 0.0.0.0(啟用伺服器)
    Step-2 : node app.js(執行連線)

#ex8
執行外部程式

1: server 指令
2: client下指令, server 回傳結果

#ex9
(未完成)下載網頁程式

#ex10
路由
1 : 基本路由
2 : 參數路由(QueryString) ex:?id=1
3 : 參數路由(Restful) ex:/1
4 : 參數路由(Restful & QueryString & bodyParser) ex:/1?id=2 input txt
    {
        Step-1 : node app4.js
        Step-2 : http://domain/app4.html
    }
(未完成)5 : Cookie & Session
https://github.com/expressjs/session
(未完成)6 : HTTP狀態碼


http通訊協定,錯誤代碼
  200 - 正常
  404 - 找不到指定內容
  400 - 錯誤請求
  401 - 未認證
  403 - 存取拒絕

    Step-1 : npm install 

參考:
1.http://expressjs.com/api.html

#ex11
資料庫連結
sample1 : mongodb(官方原生)
{
連線
mongodb://[username]:[password]@[host]:[port]/[database]
開啟集合(資料表)
db.collection([collection name])
新增資料
collection.insert(docs[, options][,callback])
查詢資料
collection.find(query[, options], callback)
刪除資料
collection.remove([selector][, options], [callback])
修改資料
collection.update(selector, document[, options][, callback])
}

sample2 : mongoose(整合ORM/ODM的mongodb)
{
連線
connect(uri(s), [options], [callback])
修改
Model.update(conditions, update, [options], [callback])
刪除
Model.remove(conditions, [callback])
查詢
Model.find(conditions, [fields], [options], [callback])
資料表和欄位型別設計
var model = mongoose.model('Cat', {
	name: String,
	age: Number,
	created: Date
})
資料表預設欄位初始
var model = mongoose.model('Cat', {
	name: String,
	age: { type: Number, default: 2 },
	created: { type: Date, default: Date.now}
})
}

#ex12
簡單部落格建置
sample1 : 純網頁導向
sample2 : 結合mongoose

Step-1 : 安裝mongodb
Step-2 : npm install


