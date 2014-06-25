var funcs = [
	{
		_id:'TuxQueParser',
		value: function(host) {
			return function(data,next) {
				//data = JSON.parse(data)
				var arr = data.data.split(";")
				var obj = {}
				for(var i=0; i<arr.length; ++i) {
					var item = arr[i].split("=");
					if (item.length == 2) {
						if (~['serve', 'queued'].indexOf(item[0])) {
							obj[item[0]] = parseInt(item[1]); 
						}else{
							obj[item[0]] = item[1];
						}
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
		_id: "TuxQueLoader",
		value: function(data, host) {
			var engine = new LaEngine()
			engine.add(TuxQueParser(host)) //解析字串
			      .add(engine.save("YYYYMMDD"))    //按天保存
				  .add(engine.sum("List", function(){return 1;}, {
				 			"exp" : function(data) {
										var obj={};obj.name=data.name;obj.queue=data.queue;obj.host=data.host;
										if (data.queued<5) {
											obj.type="lt_5";
										}else if (data.queued>=5&&data.queued<10){
											obj.type="m5-10";
										}else if (data.queued>=10&&data.queued<20) {
											obj.type="m10-20";
										}else if (data.queued>=20) {
											obj.type="ge20";
										}
										return obj;
									}
				  }, "day")) //按平均时间统计
				  .add(engine.showError())//显示错误
				  .run(data,"TuxQue");
		}
	}
]

funcs.forEach(function(item){
	db.system.js.save(item);
})
