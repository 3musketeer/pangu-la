var funcs = [
	{
		_id:'TuxMemParser',
		value: function(host) {
			return function(data,next) {
				//data = JSON.parse(data)
				var arr = data.data.split(";")
				var obj = {}
				for(var i=0; i<arr.length; ++i) {
					var item = arr[i].split("=");
					if (item.length == 2) {
						obj[item[0]] = item[1];
					}
				}

				//printjson(obj)

				obj.host = host
				data.data = obj
				data.date = obj.time

				next();
			}
		}
	},
	{
		_id: "TuxMemLoader",
		value: function(data, host) {
			var engine = new LaEngine()
			engine.add(TuxMemParser(host)) //解析字串
			      .add(engine.save("YYYYMMDD"))    //按天保存
				  .add(engine.showError())//显示错误
				  .run(data,"TuxMem");
		}
	}
]

funcs.forEach(function(item){
	db.system.js.save(item);
})
