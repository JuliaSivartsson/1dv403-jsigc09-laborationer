// JavaScript Document

var dragObj;

document.addEventListener("mousedown", down, false);

function down(event) {
    if(~event.target.className.search(/drag/)) {
        dragObj = makeObj(event.parentNode);
        dragObj.element.style.zIndex="100";
        document.addEventListener("mousemove", freeMovement, false);
    }
}

function freeMovement(event) {

    if (typeof(dragObj.element.mouseup) == "undefined")
        document.addEventListener("mouseup", drop, false);
    //Prevents redundantly adding the same event handler repeatedly

dragObj.element.style.left = Math.max(dragObj.minBoundX, Math.min(event.clientX - dragObj.posX, dragObj.maxBoundX)) + "px";
dragObj.element.style.top = Math.max(dragObj.minBoundY, Math.min(event.clientY - dragObj.posY, dragObj.maxBoundY)) + "px";
}

function drop() {
    dragObj.element.style.zIndex="1";

    document.removeEventListener("mousemove", freeMovement, false);
    document.removeEventListener("mouseup", drop, false);
    //alert("DEBUG_DROP");
}

/*function makeBoundlessObj(e) {
    var obj = new Object();
    obj.element = e;

    obj.boundX = e.parentNode.offsetWidth - e.offsetWidth;
    obj.boundY = e.parentNode.offsetHeight - e.offsetHeight;

    obj.posX = event.clientX - e.offsetLeft;
    obj.posY = event.clientY - e.offsetTop;

    return obj;
}*/

function makeObj(e) {
    var obj = new Object();
    obj.element = e;

obj.minBoundX = 0;
obj.minBoundY = 0;

// the maximum is the bottom right corner of the container
// or.. the top left (x,y) + the height and width (h,y) - the size of the square
obj.maxBoundX = obj.minBoundX + e.parentNode.offsetWidth - e.offsetWidth;
obj.maxBoundY = obj.minBoundY + e.parentNode.offsetHeight - e.offsetHeight;

    obj.boundX = e.parentNode.offsetWidth - e.offsetWidth;
    obj.boundY = e.parentNode.offsetHeight - e.offsetHeight;

    obj.posX = event.clientX - e.offsetLeft;
    obj.posY = event.clientY - e.offsetTop;

    var curleft = curtop = 0;
    if (e.offsetParent) {
        do {
            curleft += e.offsetLeft;
            curtop += e.offsetTop;
            //alert(e.id + ":" + e.innerHTML);
            if(~e.className.search(/bound/)) {
                obj.boundX = curleft - obj.element.offsetLeft;
                obj.boundY = curtop - obj.element.offsetTop;
                return obj;
            }

        } while (e = e.offsetParent);
    }

    return obj;
}

function findPos(obj) { // Donated by `lwburk` on StackOverflow
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
}