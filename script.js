document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('mousedown', function(event) {
        event.preventDefault();
        
        const rect = item.getBoundingClientRect();
        let shiftX = event.clientX - rect.left;
        let shiftY = event.clientY - rect.top;

        // Applying rotation logic (as before)
        const rotationDegrees = 15;
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

        let initialAdjusted = adjustMouseForRotation(event.pageX, event.pageY, rotationDegrees, center.x, center.y);
        moveAt(initialAdjusted.x, initialAdjusted.y);

        function moveAt(pageX, pageY) {
            item.style.left = pageX - shiftX + 'px';
            item.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            let adjustedMouse = adjustMouseForRotation(event.pageX, event.pageY, rotationDegrees, center.x, center.y);
            moveAt(adjustedMouse.x, adjustedMouse.y);
            item.style.cursor = 'grabbing';
        }

        document.addEventListener('mousemove', onMouseMove);

        function onMouseUp(event) {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            item.style.cursor = 'grab';
        }

        document.addEventListener('mouseup', onMouseUp);
    });
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
