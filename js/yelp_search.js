var neighborhoods = [];
var arr =[];
var YSV = {
    get: (function(d, s) {
        var cat = "categories",
			nei = "neighborhoods",
			lo = "location";
        if (s[0] === 'c') {
            return d[cat] || ["no_category"];
        }
        if (s[0] === 'n' && s[1] === 'e') {
            var t = d[lo];
            if (typeof t === 'undefined') {
                return ["no_neighborhood"];
            } else {
                return t[nei] || ["no_neighborhood"];
            }
        }
        if (s[0] === 'n' && s[1] === 'o') {
//         console.log(d["rating"],);
            return {
                "name": d["name"], 
                "rating": d["rating"], 
                "review_count": d["review_count"],
                "size": d["rating"] * 10 + (d["review_count"] / 10)};
//            return {"name": d["name"], "rating": d["rating"], "review_count": d["review_count"]};
        }
    })
};
function parseYelp(rdata) {	
    var ret = {"children": []}, allCat = {}, allNei = {}, allBus = {}, bus = rdata["businesses"];
    for (var i = 0; i < bus.length; i++) {
        var b = bus[i];
        var node = YSV.get(b, "node");
        var cats = YSV.get(b, "ca");
        var nei = YSV.get(b, "nei");
        allBus[node.name] = node;
        for (var j = 0; j < cats.length; j++) {
            var tc = cats[j];
            if (typeof allCat[tc] === 'undefined') {
                allCat[tc] = {'children': {}};
            }
            for (var k = 0; k < nei.length; k++) {
                var tn = nei[k];
                if (typeof allNei[tn] === 'undefined') {
                    allNei[tn] = {'children': {}};
                }

                allNei[tn][node.name] = true;
                allCat[tc]['children'][tn] = true;
            }
        }
	}
        var i = 0;
        for (var c in allCat) {
            ret["children"][i] = {"name": c, "children": []};
            var j = 0;
            for (var cc in allCat[c]['children']) {
                var nl = [];
                for (var nk in allNei[cc]) {
                    if (typeof allBus[nk] !== 'undefined' && allBus[nk] !== undefined) {
                        nl.push(allBus[nk]);
                    }
                }
//                console.log(nl);
                ret["children"][i]["children"].push({"name": cc, "children": nl});
            }
            i += 1;
        }

//        for(var j = 0; j < cats.length; j++){
//            var tc=cats[j];
//            allCat[tc] = true;
//        }
//        for(var j = 0; j < nei.length; j++){
//            var tc=nei[j];
//            allNei[tc] = true;
//        }
    //}
    return {"name": "root", "children": ret["children"]};

}
//
////var $search_yelp = (function($){
//
//var auth = {
//    consumerKey: "dve2gEXa5TJvTjBiFAtFIg",
//    consumerSecret: "x2cn1fFQf-t2ZMuMgOYfWFf_37s",
//    accessToken: "iph4yho5RjuCNffMy8ti9cXOsNJLHpPr",
//    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
//    // You wouldn't actually want to expose your access token secret like this in a real application.
//    accessTokenSecret: "kT8vlGOwYodXzJBJuGjX7Hb3dbE",
//    serviceProvider: {
//        signatureMethod: "HMAC-SHA1"
//    }
//};
//
//var terms = 'food';
//var near = 'San+Francisco';
//
//var accessor = {
//    consumerSecret: auth.consumerSecret,
//    tokenSecret: auth.accessTokenSecret
//};
//
//parameters = [];
//parameters.push(['term', terms]);
//parameters.push(['location', near]);
//parameters.push(['callback', 'cb']);
//parameters.push(['oauth_consumer_key', auth.consumerKey]);
//parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
//parameters.push(['oauth_token', auth.accessToken]);
//parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
//
//var message = {
//    'action': 'http://api.yelp.com/v2/search',
//    'method': 'GET',
//    'parameters': parameters
//};
//
//OAuth.setTimestampAndNonce(message);
//OAuth.SignatureMethod.sign(message, accessor);
//
//var parameterMap = OAuth.getParameterMap(message.parameters);
//parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
//console.log(parameterMap);
///////////////
//
//var ret;
//
//ret = (function(succ){
//if (succ === 'undefined') {
//    succ = (function(data, textStats, XMLHttpRequest) {
//            console.log(data);
//        });
//}
//
//$.ajax({
//        'url': message.action,
//        'data': parameterMap,
//        'cache': true,
//        'dataType': 'jsonp',
//        'jsonpCallback': 'cb',
//        'success': succ
//    });
//});
////
//return ret;
//
//})($);

var auth = {
    //
    // Update with your auth tokens.
    //
    consumerKey: "dve2gEXa5TJvTjBiFAtFIg",
    consumerSecret: "x2cn1fFQf-t2ZMuMgOYfWFf_37s",
    accessToken: "iph4yho5RjuCNffMy8ti9cXOsNJLHpPr",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret: "kT8vlGOwYodXzJBJuGjX7Hb3dbE",
//    serviceProvider: {
//        signatureMethod: "HMAC-SHA1"
//    }
};

var terms = 'food,restaraunts';
var near = 'San+Francisco';
var parameterMap = "";

//
var _categories=[], _neighborhoods=[];
//

var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
};

	_ycats = {};

	parameters = [];
	parameters.push(['term', terms]);
	parameters.push(['location', near]);
	parameters.push(['callback', 'cb']);
	//
	//parameters.push(['sort', 2]);
	//parameters.push(['offset', 20]);
	//parameters.push(['limit', 20]);

	parameters.push(['oauth_consumer_key', auth.consumerKey]);
	parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	parameters.push(['oauth_token', auth.accessToken]);
	//parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
	//parameters.push(['limit',"100"]);
	//parameters.push(["category_filter",""]);
	function arrayObjectMatch(){
		if(arr.length){
			var arrayElement = arr[0];
			for (var i in _ycats){
				if(_ycats[i] !== arrayElement){
					delete _ycats[i];
				}
			}
			ret = "";
		}
	}
	
	function ycatsToS(){
		console.log(parameters);
		var ret = "", tags = ""; //arr = _ycats.keys();
		for (var k in _ycats){
			if($.inArray(k, arr) === -1){
				arr.push(k);
			}
		}

		for(var i = 0; i < arr.length; i++){
			ret += ""+arr[i]+",";
		}
		// for(var i in Object.keys(_ycats)){
			// ret += Object.keys(_ycats)[i] + ",";
		// }

		ret = ret.slice(0,-1);
		var p = -1;

		// for(var i = 0; i <= parameters.length; i++){
			// if(parameters[i] === "category_filter"){			
				// p = i;
				// break;
			// }
		// }
		if(parameters[parameters.length - 1][0] === "category_filter"){
			p = parameters.length - 1;
		}

		if (p === -1){
			for(var i = 0; i <= parameters.length; i++){
				if(parameters[i][0] === "term"){			
					parameters[i][1] = ret;
					console.log("Ret: ", ret);
					$.each(ret.split(","), function(index, item) {
						if($.inArray(item, neighborhoods) === -1){
							tags += item + ",";					
						}else{
							tags = "";
						}
					});
					$("#tags").val(tags);			
					break;
				}
			}
		}else{
/*			OAuth.setTimestampAndNonce(message);
			OAuth.SignatureMethod.sign(message, accessor);
			parameterMap = OAuth.getParameterMap(message.parameters);
			parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);*/
			for(var i = 0; i <= parameters.length; i++){
				if(parameters[i][0] === "term"){			
					parameters[i][1] = ret;
					$.each(ret.split(","), function(index, item) {
						item = "'" + item + "'";

						if($.inArray(item, neighborhoods) !== -1)
							tags += item + ",";
					});
					$("#tags").val(tags);
					break;
				}
			}
		}
	}

	var message = {
		'action': 'http://api.yelp.com/v2/search',
		'method': 'GET',
		'parameters': parameters
	};

/*	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);

	var parameterMap = OAuth.getParameterMap(message.parameters);
	parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);*/

        var $_search_yelp = (function(succ, yjson) {
				OAuth.setTimestampAndNonce(message);
				OAuth.SignatureMethod.sign(message, accessor);
				parameterMap = OAuth.getParameterMap(message.parameters);
				parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);		
                var succ = succ || (function(data) {
                        window.console.log("No specified success function", data);
                });

                var yjson = {
                        'url': message.action,
                        'data': parameterMap,
                        'cache': true,
                        'dataType': 'jsonp',
                        'jsonpCallback': 'cb',
                        'success': succ
                };
                $.ajax(yjson);
        });

		var clFn = (function() {
			$.ajax({
				'url': message.action,
				'data': parameterMap,
				'cache': true,
				'dataType': 'jsonp',
				'jsonpCallback': 'cb',
/*				'success': function(data, textStats, XMLHttpRequest) {
					//console.log(data);
				}*/
			});
		});


$(function() {
    var availableTags = [
        "food",
        "bagels",
        "bakeries",
        "beer_and_wine",
        "breweries",
        "bubbletea",
        "butcher",
        "csa",
        "coffee",
        "convenience",
        "desserts",
        "diyfood",
        "donuts",
        "farmersmarket",
        "fooddeliveryservices",
        "foodtrucks",
        "gelato",
        "grocery",
        "icecream",
        "internetcafe",
        "juicebars",
        "pretzels",
        "shavedice",
        "gourmet",
        "candy",
        "cheese",
        "chocolate",
        "ethnicmarkets",
        "markets",
        "healthmarkets",
        "herbsandspices",
        "meats",
        "seafoodmarkets",
        "streetvendors",
        "tea",
        "wineries",
        "restaurants",
        "afghani",
        "african",
        "senegalese",
        "southafrican",
        "newamerican",
        "tradamerican",
        "arabian",
        "argentine",
        "armenian",
        "asianfusion",
        "australian",
        "austrian",
        "bangladeshi",
        "bbq",
        "basque",
        "belgian",
        "brasseries",
        "brazilian",
        "breakfast_brunch",
        "british",
        "buffets",
        "burgers",
        "burmese",
        "cafes",
        "cafeteria",
        "cajun",
        "cambodian",
        "caribbean",
        "dominican",
        "haitian",
        "puertorican",
        "trinidadian",
        "catalan",
        "cheesesteaks",
        "chicken_wings",
        "chinese",
        "cantonese",
        "dimsum",
        "shanghainese",
        "szechuan",
        "comfortfood",
        "creperies",
        "cuban",
        "czech",
        "delis",
        "diners",
        "ethiopian",
        "hotdogs",
        "filipino",
        "fishnchips",
        "fondue",
        "food_court",
        "foodstands",
        "french",
        "gastropubs",
        "german",
        "gluten_free",
        "greek",
        "halal",
        "hawaiian",
        "himalayan",
        "hotdog",
        "hotpot",
        "hungarian",
        "iberian",
        "indpak",
        "indonesian",
        "irish",
        "italian",
        "japanese",
        "korean",
        "kosher",
        "laotian",
        "latin",
        "colombian",
        "salvadoran",
        "venezuelan",
        "raw_food",
        "malaysian",
        "mediterranean",
        "mexican",
        "mideastern",
        "egyptian",
        "lebanese",
        "modern_european",
        "mongolian",
        "moroccan",
        "pakistani",
        "persian",
        "peruvian",
        "pizza",
        "polish",
        "portuguese",
        "russian",
        "salad",
        "sandwiches",
        "scandinavian",
        "scottish",
        "seafood",
        "singaporean",
        "slovakian",
        "soulfood",
        "soup",
        "southern",
        "spanish",
        "steak",
        "sushi",
        "taiwanese",
        "tapas",
        "tapasmallplates",
        "tex-mex",
        "thai",
        "turkish",
        "ukrainian",
        "vegan",
        "vegetarian",
        "vietnamese"
    ];
    $("#tags").autocomplete({
        source: availableTags
    });

});

$(function() {
    neighborhoods = [
        "Alamo Square",
        "Anza Vista",
        "Ashbury Heights",
        "Balboa Terrace",
        "Bayview-Hunters Point",
        "Bernal Heights",
        "Castro",
        "Chinatown",
        "Civic Center",
        "Cole Valley",
        "Corona Heights",
        "Crocker-Amazon",
        "Diamond Heights",
        "Dogpatch",
        "Duboce Triangle",
        "Embarcadero",
        "Excelsior",
        "Fillmore",
        "Financial District",
        "Fisherman&#39;s Wharf",
        "Forest Hill",
        "Glen Park",
        "Hayes Valley",
        "Ingleside",
        "Ingleside Heights",
        "Ingleside Terraces",
        "Inner Richmond",
        "Inner Sunset",
        "Japantown",
        "Lakeshore",
        "Lakeside",
        "Laurel Heights",
        "Lower Haight",
        "Lower Pacific Heights",
        "Marina/Cow Hollow",
        "Merced Heights",
        "Merced Manor",
        "Miraloma Park",
        "Mission",
        "Mission Bay",
        "Mission Terrace",
        "Monterey Heights",
        "Mount Davidson Manor",
        "NoPa",
        "Nob Hill",
        "Noe Valley",
        "North Beach/Telegraph Hill",
        "Oceanview",
        "Outer Mission",
        "Outer Richmond",
        "Outer Sunset",
        "Pacific Heights",
        "Parkmerced",
        "Parkside",
        "Portola",
        "Potrero Hill",
        "Presidio",
        "Presidio Heights",
        "Russian Hill",
        "Sea Cliff",
        "Sherwood Forest",
        "SoMa",
        "St Francis Wood",
        "Stonestown",
        "Sunnyside",
        "Tenderloin",
        "The Haight",
        "Twin Peaks",
        "Union Square",
        "Visitacion Valley",
        "West Portal",
        "Western Addition",
        "Westwood Highlands",
        "Westwood Park"
    ];
    $("#neighborhoods").autocomplete({
        source: neighborhoods
    });
});