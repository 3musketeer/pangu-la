
//定义引擎
load("./engine/LaEngine.js")

//定义插件
ls("./plugins").forEach(function(item){
	if (item.substr(-3) == ".js") {
		load(item)
	}
})

//加载脚本
db.loadServerScripts()

