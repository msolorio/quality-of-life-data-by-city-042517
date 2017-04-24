function displayData(data, searchTerm, dom) {
  var resultString = (
    '<h1 class="cityName">' + searchTerm + '</h1>\
    <p class="description">' + data.summary + '</p>'
  );

  scoresByCategory = data.categories.reduce(function(total, category) {
    return total + (
      '<h3 class="category">' + category.name + '</h3>\
      <p class="score">' + Math.round(category.score_out_of_10 * 100) / 100 + '</p>'
    );
  }, '<div class="scoresByCategory">') + '</div>';

  resultString += scoresByCategory;

  $('.results').html(resultString);
}

function getData(formattedTerm, searchTerm, dom) {
  var settings = {
    url: 'https://api.teleport.org/api/urban_areas/slug:' + formattedTerm + '/scores/',
    type: 'GET',
    dataType: 'json',
  };

  $.ajax(settings, searchTerm)
    .done(function(data) {
      console.log('HTTP GET request successful. data:', data);
      displayData(data, searchTerm, dom);
    })
    .fail(function(error) {
      console.log('error:', error);
    })
    .always(function() {
      //
    });
};

function formatTerm(searchTerm) {
  return searchTerm.trim().toLowerCase().replace(/ /g, '-');
};

function getInput(dom) {
  return $(dom.inputSearch).val().trim();
};

////////////////////////////////////////////////////////////////
// EVENT LISTENERS
////////////////////////////////////////////////////////////////
function listenForFormSubmit(dom) {
  $('.js-form').submit(function(event) {
    event.preventDefault();
    var searchTerm = getInput(dom);
    var formattedTerm = formatTerm(searchTerm);
    getData(formattedTerm, searchTerm, dom);
  });
};

////////////////////////////////////////////////////////////////
// WINDOW LOAD
////////////////////////////////////////////////////////////////
$(function() {
  var dom = {
    inputSearch: '.js-input-search'
  };

  listenForFormSubmit(dom);
});