var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var date = new Date();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var currentTime = 100*year + month;
var monthOffset = 11;
var firstDayCurrentMonth = new Date(year, month, 1);
var firstDayStartMonth =  new Date(new Date(firstDayCurrentMonth).setMonth(firstDayCurrentMonth.getMonth() - monthOffset));
var hash = '';

if(window.location.hash) {
      hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
}

var row = new Array();
var j = -1; 
row[++j] = '<tr><th>Cloud</th>';
for (var d = new Date(firstDayStartMonth); d < firstDayCurrentMonth; d.setMonth(d.getMonth() + 1)) {
    row[++j] = '<th>';
    row[++j] = monthNames[d.getMonth()] + '-' + d.getFullYear().toString().substr(2,2);
    row[++j] = '</th>';    
}
row[++j] = '</tr>';
$('#status_table').append(row.join(''));

$.getJSON( "https://mf11api02.azurewebsites.net/api/deployments?sla=true&unit=month", function( data ) {
    
    $.each(data, function( key, deployment ) {
        var row = new Array();
        var j = -1;
        if (deployment.name == hash) {
            row[++j] = '<tr class="highlight">'
        }
        else {
            row[++j] = '<tr>'
        }
        row[++j] ='<td class="cloud">' + deployment.name + '</td>';
        slaValue = ''
        for (var d = new Date(firstDayStartMonth); d < firstDayCurrentMonth; d.setMonth(d.getMonth() + 1)) {
            yearMonth = d.getFullYear() * 100 + d.getMonth() +1;
            status = 'none';
            $.each(deployment.sla, function (key1, sla) {
                if (sla.time == yearMonth) {
                    slaValue = ((sla.uptime / (sla.uptime + sla.downtime)) * 100).toFixed(2);
                    if (slaValue > 99.5) {
                        status = 'great';
                    }
                    else if (slaValue > 99) {
                        status = 'good';
                    }
                    else {
                        status = 'outage';
                    }
                }
            });
            row[++j] ='<td class="' + status + '">' + slaValue.toString() + '</td>';
            //row[++j] ='<td class="' + status + '"></td>';
        }
        row[++j] ='</tr>'; 
        $('#status_table').append(row.join(''));
        
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