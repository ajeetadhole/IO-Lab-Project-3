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
    serviceProvider: {
        signatureMethod: "HMAC-SHA1"
    }
};

var terms = 'food';
var near = 'San+Francisco';

var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
};

parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = {
    'action': 'http://api.yelp.com/v2/search',
    'method': 'GET',
    'parameters': parameters
};

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);
parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
console.log(parameterMap);

$.ajax({
    'url': message.action,
    'data': parameterMap,
    'cache': true,
    'dataType': 'jsonp',
    'jsonpCallback': 'cb',
    'success': function(data, textStats, XMLHttpRequest) {
        console.log(data);
        dd=data;
        //var output = prettyPrint(data);
        //var output = $.parseJSON(data);
        var mli = (function(s){
            return "<li>"+s+"<li>";
        });
        var ret;
        ret +="<ul>";
        for(var i = 0; i < data["businesses"].length; i++){
            var bus = data["businesses"][i];
            ret+="<li><ul>";
            ret+="<a href='"+bus["id"]+'>'+bus["name"]+"</a>";
            ret+=mli("rating: "+bus["rating"]);
             ret+="</ul></li>";
        }
                    ret+="</ul>";

        $("body").append(ret);
    }
});

$.ajax({
    url: "yelp_categories.json",
    dataType: 'json',
    async: false,
    success: function(data) {
//        console.log("____________\n"+data);
    }
});

$.ajax({
    url: "yelp_locations.json",
    dataType: 'json',
    async: false,
    success: function(data) {
//        console.log("____________\n"+data);
    }
});


$(function() {
    var availableTags =[
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
    var availableTags =[
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
                                "Westwood Park",
];
    $("#neighborhoods").autocomplete({
        source: availableTags
    });
});