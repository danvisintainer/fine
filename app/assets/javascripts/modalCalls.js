$(document).ready(function() {
  $("#tweet-list-table").on('click', 'tr', function(e) {
    e.preventDefault();
    word = $(this).children('td').children('h4').children('a').text();

    $.ajax({
      url: '/word/' + word,
      success: function(r){
        callModalFromCloud(r, word);
      }});
    });

});

function callModalFromCloud(body, title) {
  $('#global-modal').modal({
    keyboard: true
  });
  $('div#tweet-area').empty();
  $('div#tweet-area').append(body);
  $('.modal-title').empty();
  $('.modal-title').append('feeling <b>' + title + '</b>');


$('#global-modal').on('shown.bs.modal',function(){
  $('div#chart-area').empty();
  $('div#chart-area').append('<canvas id="line-chart" width="700" height="250"></canvas>');
  showPastWeekChart(gon.this_past_week);
});

}

