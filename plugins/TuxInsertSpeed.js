var funcs = [
	{
		_id:'InsertSpeed',
		value: function(cname) {
		    var startC = db.getCollection(cname).count(),
                startT = new Date().getTime();
            sleep(1500);
            var endC = db.getCollections(cname).count(),
                endT = new Date().getTime();
            return (endC-startC)/(endT-startT)*1000;
        }
	}
]

funcs.forEach(function(item){
	db.system.js.save(item);
})

