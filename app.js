function buildScoresList(categoriesArray) {
  return categoriesArray.reduce(function(categories, category) {
    var categoryTemplate = (
      '<li class="category">\
        <h3 class="categoryName">' + category.name + '</h3>\
        <p class="categoryScore">' + Math.round(category.score_out_of_10 * 100) / 100 + '</p>\
      </li>'
    );
    return categories + categoryTemplate;
  }, '<ul class="scores">') + '</ul>';
};

function getUrbanArea(data) {
  return data._embedded['city:search-results'][0]._embedded['city:item']._embedded['city:urban_area'];
};

function getUrbanAreaScores(data) {
  return getUrbanArea(data)._embedded['ua:scores'];
};

function displayData(data, searchTerm, dom) {
  var result = (
    '<h2 class="urbanArea_name">' + getUrbanArea(data).full_name + '</h2>\
     <p class="urbanArea_description">' + getUrbanAreaScores(data).summary + '</p>'
  );

  result += buildScoresList(getUrbanAreaScores(data).categories);

  $('.js-results').html(result);
}

function getData(searchTerm, dom) {
  var settings = {
    url: 'https://api.teleport.org/api/cities/',
    type: 'GET',
    dataType: 'json',
    data: {
      search: searchTerm,
      embed: 'city:search-results/city:item/city:urban_area/ua:scores'
    }
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

// normalization
// never trust user inpput
function formatTerm(searchTerm) {
  return searchTerm.trim().toLowerCase();
};

function getInput(dom) {
  return $(dom.inputSearch).val().trim().toLowerCase();
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