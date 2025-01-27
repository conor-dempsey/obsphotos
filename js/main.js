// Scroller animation
const scrollers = document.querySelectorAll('.scroller');

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    function go(){
        // check if animation has been added
        let animationAdded = scrollers[0].getAttribute("data-animated");

        // check if the window is wider than 768px
        if (document.documentElement.clientWidth > 420) {
            // if so add the animation if it hasn't been added
            if (animationAdded === "false" || animationAdded === null) {
                addAnimation();
            };
            // remove the class 'small-screen' from the body
            document.querySelector('body').classList.remove('small-screen');

            // scroll to the top
            window.scrollTo(0, 0);
        } else {
            // check if animation has been added
            // if so remove the animation
            if (animationAdded === "true") {
                removeAnimation();
            };
            // add the class 'small-screen' to the body
            document.querySelector('body').classList.add('small-screen');   
        }
    };
    // run the function on page load
    go();

    // run the function on resize
    window.addEventListener('resize', go);
    
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
            console.log(scrollerInner)
        });


    });
};

function addAnimation() {
    scrollers.forEach(scroller => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroll__track");        
        const scrollerContent = Array.from(scrollerInner.children);
        console.log('adding animation');

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



