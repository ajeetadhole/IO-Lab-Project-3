var backgroundHeight = $(window).height();
var backgroundWidth = $(window).width();

	  
$(document).ready(function(){

     function showCheckmark(clickTarget){
        (clickTarget).children(':nth-child(3)').css({
            display:'block',
        });
        (clickTarget).children(':nth-child(3)').animate({
            opacity:1,
        },300);
    }
    
    //dynamic sizing      		
    $('#background').css({
    	height:backgroundHeight,
    });  

    $('#pinContainer').css({
        height:backgroundHeight,
    });

    $('#home').css({
        height:backgroundHeight,
    });



    $('#postButton').click(
        function(){
            $('#home').animate({
                left:-backgroundWidth,
                opacity:0,
            },400);
            $('#background').delay(300).css({
                display:'block',
            });
            $('#background').animate({
                opacity:1,
            },500);
        }
    );
    
        


    $('#menuButton').click(
            function(event){
                event.stopPropagation();
                $(this).animate({
                    opacity:0,
                },200);
                $('#leftSlider').filter(':not(:animated)').animate({
                    opacity:1,
                    left:0,
                },300);
            }
            
    );

    $('#background').click(
            function() {
                $('#leftSlider').animate({
                    opacity:0,
                    left:-260,
                },300);
                $('#menuButton').delay(300).animate({
                    opacity:1,
                },200);
            }
        );




    $('.interest').hover(
        function(){
            $(this).children(':nth-child(2)').css({
                display:'block',
            });
            $(this).children(':nth-child(2)').filter(':not(:animated)').animate({
                opacity:1,
            },300);
        },
        function() {
            $(this).children(':nth-child(2)').animate({
                opacity:0,
            },300);
            $(this).children(':nth-child(2)').css({
                display:'none',
            });
        }
    );

    $('.interest').click(
        function(){
            if($(this).children(':nth-child(3)').css("opacity")==1){
                //remove the tick symbol
                $(this).children(':nth-child(3)').css({"display":"none","opacity":"0"});
                
            }
            else{
                showCheckmark($(this));
                
            }
        }
    );

});


