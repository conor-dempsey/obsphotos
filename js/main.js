// Scroller animation
const scrollers = document.querySelectorAll('.scroller');

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    addAnimation();

// const animationHeightQuery = window.matchMedia('(max-width: 768px)')

// function handleMobileChange(e) {
//     if(e.matches) {
//         addAnimation();
//         console.log('media query matched')
//     }
// };

// animationHeightQuery.addEventListener("resize", handleMobileChange)
// handleMobileChange(animationHeightQuery)

}

// addDragable();

function addDragable() {
    scrollers.forEach(scroller => {
        const scrollerInner = scroller.querySelector(".scroll__track");
        
        let pressed = false;
        let startx;
        let x;

        scroller.addEventListener("mousedown", (e) => {
            pressed = true;
            startx = e.offsetX - scrollerInner.offsetLeft;
            scroller.style.cursor = 'grabbing';
        });

        scroller.addEventListener('mouseenter', () => {
            scroller.style.cursor = 'grab';
        });

        scroller.addEventListener('mouseup', ()=>{
            scroller.style.cursor = 'grab';
            pressed = false;
        });

        document.addEventListener('mouseup', ()=>{
            pressed = false;
        });

        scroller.addEventListener('mousemove', (e)=>{
            if (!pressed) return;
            e.preventDefault();
            x = e.offsetX;
            // scrollerInner.style.left;
            console.log(scrollerInner)
        });


    });
};

function addAnimation() {
    scrollers.forEach(scroller => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroll__track");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
};


// Add draggable movement to scroller




// Nav link corresponding to current page stays highlighted
const navLinkEls = document.querySelectorAll(".nav__link");
const windowPathname = window.location.pathname;

navLinkEls.forEach(navLinkEl => {
    const navLinkPathname = new URL(navLinkEl.href).pathname;
    if (windowPathname === navLinkPathname) {
        navLinkEl.classList.add('active');
    }
})



