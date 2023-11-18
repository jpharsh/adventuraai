// DOM
const swiper = document.querySelector('#swiper');
const yes = document.querySelector('#yes');
const no = document.querySelector('#no');

// constants
const urls = [
    'https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/20180221133754/iStock-155388926-1024x683.jpg', 
    'https://a.cdn-hotels.com/gdcs/production153/d1371/e6c1f55e-51ac-41d5-8c63-2d0c63faf59e.jpg', 
    'https://media.cntraveler.com/photos/64c2a8052e6469f8103691aa/4:3/w_4920,h_3690,c_limit/Amsterdam-Took-a-Big-Step-Toward-Banning-Cruise-Ships-From-the-City-Center_GettyImages-1394428970.jpg', 
    'https://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2021/07/20205450/Speedhunters_R34roller-3.jpg', 
    'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2d/06/5e.jpg'
];

// variables
let cardCount = 0;

// functions
function appendNewCard() {
    const card = new Card({
        imageUrl: urls[cardCount % urls.length],
        onDismiss: appendNewCard
    });
    //card.element.style.setProperty('--i', cardCount % urls.length);
    swiper.append(card.element);
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing');
    cards.forEach((card, index)=>{
        card.style.setProperty('--i', index);
    });
}

// first 5 cards
for(let i = 0; i < urls.length; i++) {
    appendNewCard();
}