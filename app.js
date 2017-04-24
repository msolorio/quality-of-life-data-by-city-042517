function displayData(data) {
  var citiesList = data._embedded['city:search-results'].map(function(city) {
    return (
      '<div>' + city.matching_full_name + '</div>'
    );
  });
  $('.results').html(citiesList);
};

function getData(searchTerm, dom) {
  var settings = {
    url: 'https://api.teleport.org/api/cities/',
    type: 'GET',
    dataType: 'json',
    data: {
      search: searchTerm
    }
  };

  $.ajax(settings)
    .done(function(data) {
      console.log('HTTP GET request successful. data:', data);
      displayData(data);
    })
    .fail(function(error) {
      console.log('error:', error);
    })
    .always(function() {
      //
    });
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
    getData(searchTerm, dom);
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