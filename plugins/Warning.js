var funcs = [
	{
		_id:'WarningParser',
		value: function(host) {
			return function(data,next) {
				//data = JSON.parse(data)
				var obj = {};
                obj.detail = data.data;
                obj.type = "level-300";
                obj.state = "0";
                obj.time = new Date().toString() ;

				//printjson(obj)

				obj.host = host
				data.data = obj
				data.date = obj.time

				next();
			}
		}
	},
	{
		_id: "WarningLoader",
		value: function(data, host) {
			var engine = new LaEngine()
			engine.add(WarningParser(host)) //解析字串
                  .add(engine.warn(function(data){
                                        return data;
                                        
                                    }))
				  .add(engine.showError())//显示错误
				  .run(data,"Warning");
		}
	}
]

funcs.forEach(function(item){
	db.system.js.save(item);
})

