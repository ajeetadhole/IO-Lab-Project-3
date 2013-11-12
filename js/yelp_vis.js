function d3succ(data) {
    var diameter = 1024,
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
   $(".cuisines").show();
   $('#nav').find('input, ul, li, div, a').attr('disabled',true);
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
		}			
		ycatsToS();
		refreshVis();
	}
});

$("#neighborhoodList").on("click", "a", function(event) {
		_ycats[$("#neighborhoods").val()]=true;		
		ycatsToS();
		refreshVis();
});

$("#cuisineList").on("click", "a", function(event) {
		$.each($("#tags").val().split(","), function(index, item) {
			if(!(item in _ycats)){
				_ycats[item]=true;
			}			
		});
		ycatsToS();
		sendRequest();
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
			sendRequest();
       }
    }
});