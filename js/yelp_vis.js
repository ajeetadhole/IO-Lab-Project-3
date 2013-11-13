function d3succ(data) {
    var diameter = 800,
        format = d3.format(",d");
	
	
    var pack = d3.layout.pack()
                .size([diameter - 4, diameter - 4])
                .value(function(d) {
		console.log(d);
		return d.size;
		//return d["rating"];
    });

    var svg = d3.select("#content-inner").append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .append("g")
            .attr("transform", "translate(2,2)");

    root = JSON.parse(JSON.stringify(parseYelp(data)));
    console.log(root);
    var node = svg.datum(root).selectAll(".node")
            .data(pack.nodes)
            .enter().append("g")
            .attr("class", function(d) {
        //console.log(d);
				return d.children ? "node" : "leaf node";
    }).attr("transform", function(d) {
        //console.log('transform', d);
        return "translate(" + d.x + "," + d.y + ")";
    }).on("click", function(d) {
        console.log('clicked');
        if(!d.children){
        console.log('no c');    
        popup(d);
        }
    });

    node.append("title")
            .text(function(d) {
                    //console.log('title', d);
                    return d.name + (d.children ? "" : ": " + format(d.size));
            });
    node.append("circle")
            .attr("r", function(d) {
                    //console.log("r", d);
                    return d.r;
            });
    node.filter(function(d) {
        return !d.children;
    }).append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                    return d.name.substring(0, d.r / 3);
            });
//});

    d3.select(self.frameElement).style("height", diameter + "px");
}

function refreshVis(){
   document.getElementById("content-inner").innerHTML="";
}

function sendRequest(){
   document.getElementById("content-inner").innerHTML="";
   $_search_yelp(d3succ);
}

$("#neighborhoods").on('keydown',function(event) {
      if (event.keyCode === 13) {
        var input_value = this.value;
        if(input_value !== ''){
            _ycats[input_value]=true;           
            ycatsToS();
            refreshVis();
            $("#nav").delay(100).animate({
                left:-300,
                opacity:0,
            },400);
            $(".cuisines").delay(500).animate({
                left:0,
                opacity:1,
            },300);
        } 
    }
});

$("#neighborhoodList").on("click", "a", function(event) {
        _ycats[$("#neighborhoods").val()]=true;     
        ycatsToS();
        refreshVis();
        $("#nav").delay(100).animate({
            left:-300,
            opacity:0,
        },400);
        $(".cuisines").delay(500).animate({
            left:0,
            opacity:1,
        },300);
});

$("#cuisineList").on("click", "a", function(event) {
        $.each($("#tags").val().split(","), function(index, item) {
            if(!(item in _ycats)){
                _ycats[item]=true;
            }           
        });
        ycatsToS();
        refreshVis();
        sendRequest();
        $(".cuisines").delay(100).animate({
            left:-300,
            opacity:0,
        },400);
        $("#buttonContainer").delay(500).animate({
            left:0,
            opacity:1,
        },300);
        $("#legend").delay(1000).animate({
                left:0,
                opacity:1,
            },500);
        $("#content-inner").delay(1000).animate({
            opacity:1,
        },500);
        $("#content").delay(1000).animate({
            opacity:1,
        },500);
});

$("#tags").on('keydown',function(event) {
      if (event.keyCode === 13) {
        console.log('Enter was pressed');
        console.log(this.value);
        var input_value = this.value;
        if(input_value !== ''){
            $.each(input_value.split(","), function(index, item) {
                if(!(item in _ycats)){
                    _ycats[item]=true;
                }           
            });
            ycatsToS();
            refreshVis();
            sendRequest();
            $(".cuisines").delay(100).animate({
                left:-300,
                opacity:0,
            },400);
            $("#buttonContainer").delay(500).animate({
                left:0,
                opacity:1,
            },300);
            $("#legend").delay(1000).animate({
                left:0,
                opacity:1,
            },500);
            $("#content-inner").delay(1000).animate({
                opacity:1,
            },500);
            $("#content").delay(1000).animate({
                opacity:1,
            },500);
       }
    }
});
$('#searchButton').click(
    function(){
        $("#popup").animate({
            left:-300,
            opacity:0,
        },100);

        $("#legend").delay(100).animate({
            left:-300,
            opacity:0,
        },500);

        $("#buttonContainer").delay(500).animate({
            left:-300,
            opacity:0,
        },300);

        $("#nav").delay(500).animate({
            left:0,
            opacity:1,
        },300);
        $("#neighborhoods").value='';
        $("#tags").value='';
        $("#content-inner").delay(600).animate({
            opacity:0,
        },500);
        $("#content").delay(600).animate({
            opacity:0,
        },500);

    }
);

function popup(d){
    console.log('popup');
	$("#popup").remove();
    var w = $(window).width()/8;
    var x = ($(window).width()/2)-w/2, y=$(window).height()/2;
    var ret ='<div id="popup">';
    ret+='<ul>';
    ret+='<li><h5>'+d['name']+'<h5></li>';
    ret+='<li><h6>'+'Rating: '+d['rating']+' stars'+'</h6></li>';
    ret+='<li><b><a target="_blank" href="'+d['url']+'">'+'Yelp Page'+'</a></b></li>';
    
//    for (var k in d){
//        ret+=(k==='url')?
//        '<li><a href="'+d[k]+'">'+k+'</a></li>':
//                '<li><h4>'+k+'</h4>'+d[k]+'</li>';
//    }
    ret+='</ul>';
    ret+="</div>";
    $('body').append(ret);
    $("#popup").animate({
        left:0,
    },50);

	//console.log(d['address']);
    
}

function removePopup(){
    $("#popup").remove();
}

