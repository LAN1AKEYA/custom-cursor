const currentSrc = document.currentScript.src;
document.querySelector('html').style.cursor = 'none';

fetch(new URL('config.json', currentSrc))
    .then(response => {
        return response.json();
    })
    .then(function(config) {

        const cursor = document.createElement('div');
        cursor.style.width = '32px';
        cursor.style.height = '32px';
        cursor.style.backgroundImage = `url(${new URL(config.cursorSrc[Math.ceil(Math.random() * (config.cursorSrc.length - 1))], currentSrc).href}`;
        cursor.style.position = 'fixed';
        cursor.style.opacity = '0';
        cursor.style.transition = `opacity ${config.opacityIn}s`;
        document.body.appendChild(cursor);
        let i = lastMove = 0;

        function showCursor() {
            cursor.style.transition = `opacity ${config.opacityIn}s`;
            cursor.style.opacity = '1';
        }

        function hideCursor() {
            cursor.style.transition = `opacity ${config.opacityOut}s`;
            cursor.style.opacity = '0';
        }

        if (config.opacity) {          
            setInterval(function() {
                i++;
                if (i >= lastMove + config.lossTime) {
                    hideCursor();
                }
            }, 1000)        
        }

        function moveCursor() {
            cursor.style.left = `${event.clientX + 1}px`;
            cursor.style.top = `${event.clientY + 1}px`;
            showCursor();
            lastMove = i;
        }

        document.addEventListener('visibilitychange', function() {
            console.log(document.hidden);
        })

        document.addEventListener('mousemove', function(event) {
            moveCursor();
        })

    })


