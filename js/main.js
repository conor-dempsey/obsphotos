// Scroller animation
const scrollers = document.querySelectorAll('.scroller');

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {


    // the resize does two things, depending on whether a scroller is present

    // whenever the screen is small we add the class 'small-screen' to the body
    // we also add the class yscroll to the body, which allows vertical scrolling
    // if there are scrollers on the page, we remove the animation from the scroller

    // whenever the screen is large we remove the class 'small-screen' from the body
    // if we are on a page with scrollers, we remove yscroll from the body
    // if there are scrollers on the page, we add the animation to the scroller


    function resizeHandler(){

        const scrollersPresent = scrollers.length > 0;

        if (document.documentElement.clientWidth < 420) {
            // add the class 'small-screen' to the body
            document.querySelector('body').classList.add('small-screen');
            // add the class 'yscroll' to the body
            document.querySelector('body').classList.add('yscroll');

            // if we're on a page with scrollers, check if animation has been added
            // if so remove the animation
            if (scrollersPresent) {
                let animationAdded = scrollers[0].getAttribute("data-animated");
                if (animationAdded === "true") {
                    removeAnimation();
                };
            };
        } else { // case for large screens
            // if scrollers are present 
            if (scrollersPresent) {
                let animationAdded = scrollers[0].getAttribute("data-animated");
                if (animationAdded === "false" || animationAdded === null) {
                    addAnimation();

                    // scroll to the top
                    window.scrollTo(0, 0);

                    // remove yscroll from the body
                    document.querySelector('body').classList.remove('yscroll');
                };
            } else { // no scrollers present
                // make sure yscroll is on the document
                document.querySelector('body').classList.add('yscroll');
            };
               
            // remove the class 'small-screen' from the body
            document.querySelector('body').classList.remove('small-screen');

        };

    };
    
    // run the function on page load
    resizeHandler();    

    // run the function on resize
    window.addEventListener('resize', resizeHandler);
    
};

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
            // add a duplicate class to the duplicated item
            duplicatedItem.classList.add("duplicate");
            scrollerInner.appendChild(duplicatedItem);
        });
    });
};

function removeAnimation() {
    scrollers.forEach(scroller => {
        // check that data-animated is true and proceed if so, otherwise return
        if (scroller.getAttribute("data-animated") === "false") return;

        scroller.setAttribute("data-animated", false);

        const scrollerInner = scroller.querySelector(".scroll__track");
        const scrollerContent = Array.from(scrollerInner.children);

        // find all of the duplicated items and remove them
        const duplicatedItems = scrollerInner.querySelectorAll(".duplicate");
        duplicatedItems.forEach(item => item.remove());
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



