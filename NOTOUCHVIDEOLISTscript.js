document.querySelectorAll('.draggable').forEach(item => {
    // Common start drag function
    function startDrag(event) {
        event.preventDefault();  // Prevent default behavior (like scrolling and zooming on touch devices)

        // Determine initial touch point and adjust if it's a touch event
        const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
        const clientY = event.type.includes('touch') ? event.touches[0].clientY : event.clientY;

        const rect = item.getBoundingClientRect();
        let shiftX = clientX - rect.left;
        let shiftY = clientY - rect.top;

        // Assuming the element is rotated, adjust these values
        const rotationDegrees = 15;  // Example rotation angle
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
        let adjusted = adjustMouseForRotation(shiftX + rect.left, shiftY + rect.top, rotationDegrees, center.x, center.y);
        shiftX = adjusted.x - rect.left;
        shiftY = adjusted.y - rect.top;

        item.style.position = 'absolute';
        item.style.zIndex = 1000;
        document.body.append(item);

        // Adjust initial coordinates considering rotation for the first move
        let initialAdjusted = adjustMouseForRotation(clientX, clientY, rotationDegrees, center.x, center.y);
        moveAt(initialAdjusted.x, initialAdjusted.y);

        function moveAt(pageX, pageY) {
            item.style.left = pageX - shiftX + 'px';
            item.style.top = pageY - shiftY + 'px';
        }

        function onMove(event) {
            const moveX = event.type.includes('touch') ? event.touches[0].pageX : event.pageX;
            const moveY = event.type.includes('touch') ? event.touches[0].pageY : event.pageY;
            let moveAdjusted = adjustMouseForRotation(moveX, moveY, rotationDegrees, center.x, center.y);
            moveAt(moveAdjusted.x, moveAdjusted.y);
            item.style.cursor = 'grabbing';
        }

        // Generalize event names
        const moveEvent = event.type.includes('touch') ? 'touchmove' : 'mousemove';
        const endEvent = event.type.includes('touch') ? 'touchend' : 'mouseup';

        document.addEventListener(moveEvent, onMove);

        function onEnd(event) {
            document.removeEventListener(moveEvent, onMove);
            document.removeEventListener(endEvent, onEnd);
            item.style.cursor = 'grab';
        }

        document.addEventListener(endEvent, onEnd);
    }

    // Attach both mouse and touch event listeners
    item.addEventListener('mousedown', startDrag);
    item.addEventListener('touchstart', startDrag);
});

function adjustMouseForRotation(mouseX, mouseY, angle, centerX, centerY) {
    let angleRad = -angle * (Math.PI / 180);
    mouseX -= centerX;
    mouseY -= centerY;
    let newX = mouseX * Math.cos(angleRad) - mouseY * Math.sin(angleRad);
    let newY = mouseX * Math.sin(angleRad) + mouseY * Math.cos(angleRad);
    newX += centerX;
    newY += centerY;
    return {x: newX, y: newY};
}
