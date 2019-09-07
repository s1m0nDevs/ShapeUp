let scrollHeader = ()=>{
  if (window.pageYOffset > 50)
    document.querySelector('.header').classList.add('top-nav-collapse')
  else
    document.querySelector('.header').classList.remove('top-nav-collapse')
}

document.addEventListener("DOMContentLoaded", () => {
  scrollHeader()
});

document.querySelectorAll('nav li').forEach(s=>{
  s.addEventListener('click', event => {
    event.preventDefault();
    let target = event.target.parentElement.dataset.value;

    document.querySelector(`section[data-value='${target}']`).scrollIntoView({
       block: "center",
       behavior: "smooth"
     })
  })
})

let removeClassAttr = (el)=>{
  let classAv = el.getAttribute('class');
  if(classAv == null || classAv == '')
    el.removeAttribute('class');
}


// Nav header get info start
var bodyRect = document.body.getBoundingClientRect(),
  navLis = document.querySelectorAll('nav li'),
  outPutValue = [],
  heightSections = [],
  numSec = 0;
  console.log(navLis)

for (var i = 0; i < navLis.length; i++)
{
  outPutValue[i] = navLis[i].dataset.value;
  heightSections[i] = document.querySelector(`section[data-value='${outPutValue[i]}']`).getBoundingClientRect().top - bodyRect.top-115;
  console.log(heightSections[i])
}
// Nav header get info end

// Nav active by section scroll start
document.addEventListener('scroll',(e)=>{
  var navLiActive = document.querySelector('nav li.active');

  scrollHeader()

  while (numSec < Object.keys(heightSections).length)
  {
    if (pageYOffset < heightSections[numSec+1])
    {
      if (navLiActive.dataset.value != outPutValue[numSec])
      {
        navLiActive.classList.remove('active');
        removeClassAttr(navLiActive);
        navLis[numSec].classList.add('active');
      }

      numSec = heightSections.length;
    }
    else
    {
      if(pageYOffset > heightSections[Object.keys(heightSections).length-1])
      {
        numSec = Object.keys(heightSections).length;
        navLiActive.classList.remove('active');
        removeClassAttr(navLiActive);
        navLis[numSec-1].classList.add('active');
      }
      numSec++;
    }
  }

  numSec = 0;
});
// Nav active by section scroll end



AOS.init({
  // Global settings:
  disable: 'phone', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 100, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 800, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});