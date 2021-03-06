function d3succ(data) {
    var diameter = 900,
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
    }).on("mouseover", function(d) {
        console.log('clicked');
        if(!d.children && $('#legend').css("opacity")==1){
            console.log('no c');    
            popup(d).delay(500);
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
                opacity:1,
            },500);
        $("#mainInfo").delay(1000).animate({
                opacity:0,
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
                opacity:1,
            },500);
            $("#mainInfo").delay(1000).animate({
                opacity:0,
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
        $("#legend").delay(300).animate({
            opacity:0,
        },500);
        $("#popup").animate({
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
        $("#content-inner").css({
            zIndex:30,
        });
    }
);


function popup(d){
    console.log('popup');
	$("#popup").remove();
    var ret ='<div id="popup">';
    ret+='<ul>';
    ret+='<li id="name"><h5><a target="_blank" href="'+d['url']+'">'+d['name']+'</a><h5></li>';
    ret+='<li id="rating"><h6>'+'Rating: '+d['rating']+' stars'+'</h6></li>';
    ret+='</ul>';
    ret+="</div>";
    $('body').append(ret);
    $("#popup").css({
        left: d.x + 180,
        top: d.y + 20,
    });
}

$('body').click(
    function(){
        $("#popup").remove().delay(5000);
    }
);



