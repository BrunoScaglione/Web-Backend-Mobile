// container for jquery
$(document).ready(function() {
	// pra conseguir a api key tem que criar um projet, selecionar qual api a gente quer usar e criar uma key em:
	// https://console.developers.google.com/apis/dashboard?project=youtubeapp-267804&supportedpurview=project 
	var key ="AIzaSyDjBW7aCgMENlNE3W0gUOajcYoyfMqHlww";
	var playlistId ="PLWKjhJtqVAbmqFs83T4W-FZQ9kK983tZC";
	var URL ="https://www.googleapis.com/youtube/v3/playlistItems";
	// a URL é a solicitação http que achamos aqui:
	// https://developers.google.com/youtube/v3/docs/playlistItems/list?apix_params=%7B%22part%22%3A%22snippet%22%2C%22maxResults%22%3A20%2C%22playlistId%22%3A%22PLWKjhJtqVAbmqFs83T4W-FZQ9kK983tZC%22%7D
	// youtube  API expects an object for the request
	var options = {
		part: "snippet",
		key: key,
		maxResults: 20,
		playlistId:playlistId
	}

	loadVids();

	function loadVids() {
		$.getJSON(URL, options, function(data){
			console.log(data);
			// pra ver o resultado do pedido ir no chrome em inspecionar elemento e em log
			var id = data.items[0].snippet.resourceId.videoId;
			mainVid(id);
			resultsLoop(data);
		});
	}

function mainVid(id){
	$('#video').html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
}

function resultsLoop(data) {

	$.each(data.items, function(i, item){

		var thumb = item.snippet.thumbnails.medium.url;
		var title = item.snippet.title;
		var desc = item.snippet.description.substring(0, 100); // é um método para strings que corta só até 100 nesse caso
		vid = item.snippet.resourceId.videoId;

		$('main').append(`<article class="item" data-key="${vid}">
				<img src="${thumb}" alt="" class="thumb">
				<div class="details">
					<h4>${title}</h4>
					<p>${desc}</p>
				</div>
			</article>`);
	});

}


	$('main').on('click', 'article', function() {
		// alert('hello')
		var id = $(this).attr('data-key'); // this é tipo self no python
		mainVid(id);
	});





});
