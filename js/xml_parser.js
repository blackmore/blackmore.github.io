function readSingleFile(evt) {
  $("#schedule").empty();
  //Retrieve the first (and only!) File from the FileList object
  var f = evt.target.files[0]; 
  
  if (f) {
    var r = new FileReader();
  
    r.onload = function(e) { 
      var contents = e.target.result;
      var xml = contents,
      xmlDoc = $.parseXML( xml ),
      $xml = $( xmlDoc ), 
      prgspalte = $xml.find( "prgspalte");
      var results = []
      $.each(prgspalte, function (index, _prgspalte) {
        var sendedatum = $(_prgspalte).find('sendedatum:first').text(),
        sendername = $(_prgspalte).find('sendername:first').text();
        results.push("<h3>"+sendedatum+ " - " +sendername+ "</h3>");
        $.each($(_prgspalte).find('sendung'),
               function (i, el) {
                var sendung = $(el),
                sender = sendung.find('sender:first').text(),
                datum = sendung.find('datum:first').text(),
                zeit = sendung.find('zeit:first').text(),
                stereo = sendung.find('stereo:first').text(),
                breit = sendung.find('breit:first').text(),
                titel = sendung.find('titel:first').text(),
                folge = sendung.find('folge:first').text(),
                charakter  = sendung.find('charakter:first').text(),
                char  = sendung.find('char:first').text(),
                jahr  = sendung.find('jahr:first').text(),
                ut  = sendung.find('ut:first').text(),
                otepis  = sendung.find('otepis:first').text(),
                origt  = sendung.find('origt:first').text(),
                text  = sendung.find('text:first').text(),
                altersempfehlung  = sendung.find('altersempfehlung:first').text(),
                hintergrund  = sendung.find('hintergrund:first').text();
                results.push("<div class='row'>\
                                <div class='col-md-1'> <span class='time'>"+zeit.match(/\d\d:\d\d/)+"</span><br/><span class='date'>"+datum+"</span></div>\
                                <div class='col-md-11'>\
                                  <div class='row'>\
                                    <div class='col-md-12 prg-specs'>\
                                      <span class='title'>"+titel+"</span>\
                                      <span class='ut'>"+ut+"</span>\
                                      <span class='otepis'>("+origt+ " / " +otepis+ ")</span>\
                                      <span><strong>" +charakter+ "</strong></span>\
                                      <span>ep: <strong>" +folge+ "</strong></span>\
                                      <span>" +age(altersempfehlung)+ "</span>\
                                      <span><strong>" + audio(stereo) + "</strong></span>\
                                      <span><strong>" +breit+ "</strong></span>\
                                    </div>\
                                  </div>\
                                <div class='row'>\
                                  <div class='col-md-12'>"+text+"</div>\
                                </div>\
                                <div class='row'>\
                                  <div class='col-md-12 background-text'>"+hintergrund+"</div>\
                                </div>\
                              </div>\
                              </div><hr>");
              });
      });
  $( "#schedule" ).append(results.join("<br>"));
  }
  r.readAsText(f, 'CP1252');
  } else {
    alert("Failed to load file");
  }
};

function audio(au) {
  switch(au){
    case 'st':
      return '<span class="glyphicon glyphicon-sound-stereo"></span>'
  default:
  return ''
  }
};

function age(ag) {
  if (ag) {
    switch(ag){
    case '18':
      return "<span class='ag ag18'>"+ag+"</span>"
    case '16':
      return "<span class='ag ag16'>"+ag+"</span>"
    case '12':
      return "<span class='ag ag12'>"+ag+"</span>"
    case '6':
      return "<span class='ag ag6'>"+ag+"</span>"
    case '0':
      return "<span class='ag ag0'>"+ag+"</span>"
  };
  }else{
    return ""
  }
};


$(function() {
  //$('#fileinput')[0].addEventListener('change', readSingleFile, false);
  $('.fileinput').on('clear.bs.fileinput', function() {
   $("#schedule").empty();
  });
  $('#fileinput')[0].addEventListener('change', readSingleFile, false );
});


    