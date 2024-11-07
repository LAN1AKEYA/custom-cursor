const currentSrc = document.currentScript.src;

fetch(new URL('config.json', currentSrc))
.then(response => {
    return response.json();
})
.then((config) => {


    if (config.removeDefaultCursor) {
        document.querySelector('html').style.cursor = 'none';
    }
    
    function getRandomCursor(type) {
        return `url(${new URL(type[Math.ceil(Math.random() * (type.length - 1))], currentSrc).href})`
    }

    const defaultCursor = getRandomCursor(config.cursorSrc);
    const defaultStyles = `width: 32px; height: 32px; background-image: ${defaultCursor}; position: fixed; transition: opacity ${config.opacityIn}s; pointer-events: none;`;
    const cursor = document.createElement('div');
    cursor.style.cssText = defaultStyles;

    cursor.style.opacity = '0';
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
        setInterval(() => {
            i++;
            if (i == lastMove + config.lossTime) {
                hideCursor();
            }
        }, 1000)        
    }

    function moveCursor(clientX, clientY) {
        cursor.style.left = `${clientX + config.padding.X}px`;
        cursor.style.top = `${clientY + config.padding.Y}px`;
        showCursor();
        lastMove = i;
    }

    document.addEventListener('mousemove', (event) => {
        requestAnimationFrame(() => {   moveCursor(event.clientX, event.clientY)  })
    })

    let changeSwith = true;

    function changeCursor(clientX, clientY) {
        if (changeSwith) {
            
            if (config.click.clickStyles != '') {
                cursor.style.cssText += config.click.clickStyles;
            }
            if (config.click.clickCursorSrc != '') {
                cursor.style.backgroundImage = getRandomCursor(config.click.clickCursorSrc);
            }
        }
        else {
            if (config.click.clickStyles != '') {
                cursor.style.cssText = defaultStyles;
                moveCursor(clientX, clientY);
            }
            if (config.click.clickCursorSrc != '') {
                if (config.click.randomCursorAfterClick) {
                    cursor.style.backgroundImage = getRandomCursor(config.cursorSrc);
                }
                else {
                    cursor.style.backgroundImage = defaultCursor;
                }
            }
        }
        changeSwith = !changeSwith;
    }

    document.addEventListener('mousedown', changeCursor)

    document.addEventListener('mouseup', (event) => {    
        changeCursor(event.clientX, event.clientY)    })


    })