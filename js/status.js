$.getJSON( "https://mf11api02.azurewebsites.net/api/deployments?sla=true", function( data ) {
    
    $.each(data, function( key, deployment ) {
        console.log(deployment.name)
        var items = [];
        var status = '';
        var row='<tr><td>' + deployment.name + '</td>';
        $.each(deployment.sla, function (key1, sla) {
            if (sla.downtime > 0) {
                row+='<td class="outage"></td>';
            }
            else {
                row+='<td class="ok"></td>';
            }
            
            
        })
        row+='</tr>'; 
        $('#status_table').append(row);
        
    });
    
    /*
  var items = [];
  var status = 'green';
  $.each( data.sla, function( key, val ) {
      console.log(val.time);
      console.log(val.downtime);
      if (val.downtime > 0) {
          console.log('red');
      }
      if (val.downtime > 0) {
          console.log('orange');
      }
      else {
         console.log('green');
      }
    items.push( "<li id='" + key + "'>" + status + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
 */ 
});