var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
$("#eventTable").click(function(){
    if(event.target.tagName == "TD")
        if($(event.target).attr('class') != "span")
          modal.style.display="block";
});
