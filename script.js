document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('mousedown', function(event) {
        event.preventDefault();
        let shiftX = event.clientX - item.getBoundingClientRect().left;
        let shiftY = event.clientY - item.getBoundingClientRect().top;

        item.style.position = 'absolute';
        item.style.zIndex = 1000;
        document.body.append(item);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            item.style.left = pageX - shiftX + 'px';
            item.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            item.style.cursor = 'grabbing'; // Change cursor to grabbing while moving
        }

        document.addEventListener('mousemove', onMouseMove);

        item.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            item.onmouseup = null;
            item.style.cursor = 'grab'; // Change cursor back to grab
        };
    });
});
