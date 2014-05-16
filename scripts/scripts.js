//删除所有日志表
db.getCollectionNames().forEach(function(name) {
	if (name.indexOf("TuxState")==0) {
		db.getCollection(name).drop()
	}
})

//[:data.data.host]20130618
//   /[:data\.(.+)]/
