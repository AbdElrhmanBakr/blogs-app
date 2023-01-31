// Selecting All Section from HTML
const sectionsArray = document.querySelectorAll('section');
const ulNavElement = document.querySelector('#navbar__list');

// Function that Called Once at first run to Build the NavBar
const navBuilder = () => {
    //Creating Virtual DOM to add all of 4 'li' sections to it to append it to parent 'ul'
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < sectionsArray.length; i++) {
        let nameOfSection = sectionsArray[i].getAttribute('data-nav');
        let secId = sectionsArray[i].getAttribute('id');
        const newli = document.createElement('li');
        const anchNav = document.createElement('a');
        newli.appendChild(anchNav);
        anchNav.classList.add('menu__link');
        anchNav.setAttribute('href', `#${secId}`);
        anchNav.textContent = `${nameOfSection}`;
        //Another Way to add innerHTML to lo directly Using Template Literals (String)
        // newli.innerHTML = `<a class='menu__link' href="#${secId}">${nameOfSection}</a>`;

        //Appending Every li Element to => VirtualDom 
        fragment.appendChild(newli);
    }
    //Appending VirtualDom => to the ul Element
    ulNavElement.appendChild(fragment);
}

const smoothClickScroll = (event) => {
    if (event.target.hash) { // <---Prevent home button from scrolling
        const sectionId = document.querySelector(event.target.hash);
        event.preventDefault();
        sectionId.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
        //Next Comment is a code used to set active section when clicking on any section in NavBar
        //but since we did it by another listener (while scrolling), We don't need it any more
        // for(let sec of sectionsArray){
        //     sec.classList.remove('your-active-class');
        // }
        // sectionId.classList.add('your-active-class');
    }
}
// Checking Have we viewed enough part of the section or not
function checkViewDim(sectAct) {
    const rectangular = sectAct.getBoundingClientRect();
    return (
        rectangular.top >= 0 &&
        rectangular.top <= (window.innerHeight)-400
        // rectangular.top >= 0 &&
        // rectangular.left >= 0 &&
        // rectangular.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        // rectangular.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
// If we veiwed enough part of the section => adding active class to highlight the Viewed Section
function activeScroll(event) {
    const liNavElements = document.querySelectorAll('.menu__link');
    for (let i = 0; i < sectionsArray.length; i++) {
        if (checkViewDim(sectionsArray[i])) {
            //HighLighting Section
            sectionsArray[i].classList.add("your-active-class");
            liNavElements[i].classList.add("link__active");

        } else {
            sectionsArray[i].classList.remove("your-active-class");
            liNavElements[i].classList.remove("link__active");
        }
    }
}


// Order to build the Nav using Fuction above
navBuilder();

// Adding Event Listener for Smooth Scroll going to directed Section
ulNavElement.addEventListener("click", smoothClickScroll);

// Adding Event Listener for Setting Active Class CSS to viewed Section
document.addEventListener('scroll', activeScroll);