document.addEventListener('DOMContentLoaded', function() {
    // Function to change video source
    function changeVideo() {
        var videoPlayer = document.getElementById('videoPlayer');
        var videoSelector = document.getElementById('videoSelector');
        videoPlayer.src = videoSelector.value;
    }

    // Initialize change video on selector change
    document.getElementById('videoSelector').addEventListener('change', changeVideo);

    // Function to add drag functionality
    function makeDraggable(element) {
        let shiftX, shiftY, posX, posY;

        function onMouseDown(event) {
            event.preventDefault();

            let clientX = event.clientX;
            let clientY = event.clientY;

            if (event.type === 'touchstart') {
                clientX = event.touches[0].clientX;
                clientY = event.touches[0].clientY;
            }

            const rect = element.getBoundingClientRect();
            shiftX = clientX - rect.left;
            shiftY = clientY - rect.top;

            posX = rect.left;
            posY = rect.top;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('touchmove', onMouseMove);
            document.addEventListener('touchend', onMouseUp);
        }

        function onMouseMove(event) {
            let clientX = event.clientX;
            let clientY = event.clientY;

            if (event.type === 'touchmove') {
                clientX = event.touches[0].clientX;
                clientY = event.touches[0].clientY;
            }

            element.style.left = clientX - shiftX + 'px';
            element.style.top = clientY - shiftY + 'px';
            element.style.position = 'absolute';
            element.style.zIndex = 1000;
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('touchend', onMouseUp);
        }

        element.addEventListener('mousedown', onMouseDown);
        element.addEventListener('touchstart', onMouseDown);
    }

    // Attach draggable functionality to all draggable elements
    document.querySelectorAll('.draggable').forEach(makeDraggable);
});
