function drawPie(tweets){

  content = [];

  tweets.forEach(function(e) {
    content.push({
      "label": e[0],
      "value": e[1],
      "color": '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    });
  });

  var pie = new d3pie("pieChart", {
    "header": {
      "title": {
        "text": "",
        "fontSize": 24,
        "font": "helvetica"
      },
      "subtitle": {
        "color": "#999999",
        "fontSize": 12,
        "font": "open sans"
      },
      "titleSubtitlePadding": 9
    },
    "footer": {
      "color": "#999999",
      "fontSize": 10,
      "font": "open sans",
      "location": "bottom-left"
    },
    "size": {
      "canvasHeight": 700,
      "canvasWidth": 700
    },
    "data": {
      "sortOrder": "value-desc",
      "content": content
    },
    "labels": {
    "outer": {
      "hideWhenLessThanPercentage": 1,
      "pieDistance": 32
    },
    "inner": {
      "hideWhenLessThanPercentage": 3
    },
    "mainLabel": {
      "fontSize": 11
    },
    "percentage": {
      "color": "#ffffff",
      "decimalPlaces": 0
    },
    "value": {
      "color": "#adadad",
      "fontSize": 11
    },
    "lines": {
      "enabled": true
    }
  },
  "effects": {
    "pullOutSegmentOnClick": {
      "effect": "linear",
      "speed": 400,
      "size": 8
    }
  },
  "misc": {
    "gradient": {
      "enabled": true,
      "percentage": 100
    }
  },
  "callbacks": {
    "onClickSegment": function(e){
      // window.location.replace('/word/' + e.data.label);
      $.ajax({
        url: '/word/' + e.data.label,
        success: function(r){
          callModalFromCloud(r, e.data.label);
        }
      });
    } 
  }
});
}