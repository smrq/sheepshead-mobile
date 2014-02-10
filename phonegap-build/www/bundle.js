(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app;

app = {
  initialize: function() {
    return this.bindEvents();
  },
  bindEvents: function() {
    return document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    return app.receivedEvent('deviceready');
  },
  receivedEvent: function(id) {
    var listeningElement, parentElement, receivedElement;
    parentElement = document.getElementById(id);
    listeningElement = parentElement.querySelector('.listening');
    receivedElement = parentElement.querySelector('.received');
    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
    return console.log('Received Event: ' + id);
  }
};

app.initialize();


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvZ3JlZ3NtL2NvZGUvc2hlZXBzaGVhZC1tb2JpbGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2dyZWdzbS9jb2RlL3NoZWVwc2hlYWQtbW9iaWxlL3NyYy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLEdBQUE7O0FBQUEsR0FBQSxHQUNDO0FBQUEsRUFBQSxVQUFBLEVBQVksU0FBQSxHQUFBO1dBQ1gsSUFBQyxDQUFBLFVBQUQsQ0FBQSxFQURXO0VBQUEsQ0FBWjtBQUFBLEVBR0EsVUFBQSxFQUFZLFNBQUEsR0FBQTtXQUNYLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixhQUExQixFQUF5QyxJQUFDLENBQUEsYUFBMUMsRUFBeUQsS0FBekQsRUFEVztFQUFBLENBSFo7QUFBQSxFQU1BLGFBQUEsRUFBZSxTQUFBLEdBQUE7V0FDZCxHQUFHLENBQUMsYUFBSixDQUFrQixhQUFsQixFQURjO0VBQUEsQ0FOZjtBQUFBLEVBU0EsYUFBQSxFQUFlLFNBQUMsRUFBRCxHQUFBO0FBQ2QsUUFBQSxnREFBQTtBQUFBLElBQUEsYUFBQSxHQUFnQixRQUFRLENBQUMsY0FBVCxDQUF3QixFQUF4QixDQUFoQixDQUFBO0FBQUEsSUFDQSxnQkFBQSxHQUFtQixhQUFhLENBQUMsYUFBZCxDQUE0QixZQUE1QixDQURuQixDQUFBO0FBQUEsSUFFQSxlQUFBLEdBQWtCLGFBQWEsQ0FBQyxhQUFkLENBQTRCLFdBQTVCLENBRmxCLENBQUE7QUFBQSxJQUlBLGdCQUFnQixDQUFDLFlBQWpCLENBQThCLE9BQTlCLEVBQXVDLGVBQXZDLENBSkEsQ0FBQTtBQUFBLElBS0EsZUFBZSxDQUFDLFlBQWhCLENBQTZCLE9BQTdCLEVBQXNDLGdCQUF0QyxDQUxBLENBQUE7V0FPQSxPQUFPLENBQUMsR0FBUixDQUFZLGtCQUFBLEdBQXFCLEVBQWpDLEVBUmM7RUFBQSxDQVRmO0NBREQsQ0FBQTs7QUFBQSxHQW9CRyxDQUFDLFVBQUosQ0FBQSxDQXBCQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJhcHAgPVxuXHRpbml0aWFsaXplOiAtPlxuXHRcdEBiaW5kRXZlbnRzKClcblxuXHRiaW5kRXZlbnRzOiAtPlxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2RldmljZXJlYWR5JywgQG9uRGV2aWNlUmVhZHksIGZhbHNlXG5cblx0b25EZXZpY2VSZWFkeTogLT5cblx0XHRhcHAucmVjZWl2ZWRFdmVudCAnZGV2aWNlcmVhZHknXG5cblx0cmVjZWl2ZWRFdmVudDogKGlkKSAtPlxuXHRcdHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBpZFxuXHRcdGxpc3RlbmluZ0VsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IgJy5saXN0ZW5pbmcnXG5cdFx0cmVjZWl2ZWRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yICcucmVjZWl2ZWQnXG5cblx0XHRsaXN0ZW5pbmdFbGVtZW50LnNldEF0dHJpYnV0ZSAnc3R5bGUnLCAnZGlzcGxheTpub25lOydcblx0XHRyZWNlaXZlZEVsZW1lbnQuc2V0QXR0cmlidXRlICdzdHlsZScsICdkaXNwbGF5OmJsb2NrOydcblxuXHRcdGNvbnNvbGUubG9nICdSZWNlaXZlZCBFdmVudDogJyArIGlkXG5cbmFwcC5pbml0aWFsaXplKCkiXX0=
