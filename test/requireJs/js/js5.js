define(function(){
	return {
		"fruit":[
			{
				"name":"apple",
				"price":100
			},
			{
				"name":"banana",
				"price":98
			}
		],
		"fruit2":{
			"apple":{
				"price":100,
				"weight":200
			},
			"banana":{
				"price":90,
				"weight":100
			}
		},
		buy:function(){
			console.log("go to the supermarket")
		}
	}
});