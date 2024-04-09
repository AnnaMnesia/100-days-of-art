import {items} from './items.js'

document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.items');
    const itemsCols = document.querySelectorAll('.items-col');
    const filters = document.querySelectorAll('.filter');
    const defaultFontSize = '75px'
    const activeFontSize = '250px'
    

    function splitTextIntoSpans(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) =>{
            const text = element.innerText;
            element.innerHTML = text
            .split('')
            .map((char) => `<span>${char}</span>`)
            .join('')
        });
    }

    function animateFontSize(target, fontSize){
        const spans = target.querySelectorAll('span');
        gsap.to(spans, {
            fontSize: fontSize,
            stagger: 0.025,
            duration: 0.5,
            ease: 'power2.out',
        });
    }

    function clearItems() {
        itemsCols.forEach((col) => {
            col.innerHTML = '';
        });
    }

    function addItemsToCols(filter = 'all') {
        let colIndex = 0;
        const filteredItems = items.filter(
            (item) => filter === 'all' || item.tag.includes(filter)
        );

        filteredItems.forEach((item) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
            <div class="item-img">
                <img src="${item.img}" alt="">
            </div>
            <div class="item-copy"><p>${item.title}</p></div>
            `;
            itemsCols[colIndex % itemsCols.length].appendChild(itemElement);
            colIndex++;
        });
    }

    function animateItems(filter){
        gsap.to(itemsContainer, {
            opacity: 0,
            duration: 0.25,
            onComplete: () =>{
                clearItems();
                addItemsToCols(filter);
                gsap.to(itemsContainer, {
                    opacity: 1,
                    duration: 0.25,
                });
            },
        });
    }


    splitTextIntoSpans('.filter h1');
    animateFontSize(document.querySelector('.filter.active h1'), activeFontSize);
    addItemsToCols();

    filters.forEach((filter) =>{
        filter.addEventListener('click', function (){
            if (this.classList.contains('active')){
                return;
            }

            const previousActiveFilterH1 = document.querySelector('.filter.active h1');
            animateFontSize(previousActiveFilterH1, defaultFontSize);

            filters.forEach((f) => f.classList.remove('active'));
            this.classList.add('active');

            const newActiveFilterH1 = this.querySelector('h1');
            animateFontSize(newActiveFilterH1, activeFontSize);

            const filterValue = this.getAttribute('data-filter');
            animateItems(filterValue);
        });
    });
});


const clipTop = document.querySelectorAll('.clip-top');
const clipBottom = document.querySelectorAll('.clip-bottom');
const marquee = document.querySelectorAll('.marquee');

gsap.from('.clip-top, .clip-bottom', 2, {
    delay: 1,
    height: '50vh',
    ease: 'power4.inOut',
});

gsap.to('.marquee', 3.5, {
    delay: 0.75,
    top: '50%',
    ease: 'power4.inOut',
});

gsap.from('.clip-top .marquee, .clip-bottom .marquee', 5, {
    delay: 1,
    left: '100%',
    ease: 'power3.inOut',
});

gsap.from('.clip-center .marquee', 5, {
    delay: 1,
    left: '-50%',
    ease: 'power3.inOut',
});


gsap.to('.clip-top', 2, {
    delay: 6,
    clipPath: 'inset(0 0 100% 0)',
    ease: 'power4.inOut',
});

gsap.to('.clip-bottom', 2, {
    delay: 6,
    clipPath: 'inset(100% 0 0 0)',
    ease: 'power4.inOut',
});

gsap.to('.clip-center', 2, {
    delay: 6,
    clipPath: 'inset(0 0 0 100%)',
    // opacity: 0,
    ease: 'power4.inOut',
});

// gsap.to('.clip-top .marquee, .clip-bottom .marquee, .clip-center .marquee span', 2, {
//     delay: 6,
//     opacity: 0,
//     ease: 'power2.inOut',
//     background: 'none',
// });


