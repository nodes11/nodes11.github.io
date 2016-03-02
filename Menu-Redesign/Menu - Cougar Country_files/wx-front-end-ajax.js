/* global wp */
/* global data */
/* global count */
jQuery(document).ready(function($) { 
	
	//Function to grab the data from a search form and put it somewhere else.
	$('.wovax-search-submit').click(function(event) {
		var query = {};
		$('.wovax-search-filter').each(function() {
		  query[$(this).attr('name')] = $(this).val();
		});
		
		data = {
        action: 'wx_get_search_results',
        data: query,
      };
  
      $.post(myAjax.ajaxurl, data, function(response) {
        console.log(response);
      });
	});
	
    //Fix for safari number validation bug, where invalid characters would cause the value to be blank.
    // @since 2.3.6
    $('.wovax-search-section input[type|="number"]').keyup(function(){
        var obj = $(this);
        if (obj[0].checkValidity() === false) {
            obj[0].value = this[obj[0].getAttribute("name")];
        } else {
            this[obj[0].getAttribute("name")] = obj[0].value;
        }
    });
});