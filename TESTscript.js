// DOM
const swiper = document.querySelector('#swiper');

// constants
const urls = [
    'https://res.cloudinary.com/simpleview/image/upload/v1661991294/clients/indy/Indy_About_Indianapolis_f90e9a53-b251-498a-b424-d3e885bad890.jpg', 
    'https://www.worldatlas.com/r/w1200-q80/upload/3e/a7/15/shutterstock-1227763954.jpg', 
    'https://www.travelandleisure.com/thmb/wwUPgdpCUuD5sAPFLQf4YasjH0M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicago-illinois-CHITG0221-e448062fc5164da0bba639f9857987f6.jpg', 
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/47/66/40/caption.jpg?w=700&h=500&s=1https://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2021/07/20205450/Speedhunters_R34roller-3.jpg', 
    'https://upload.wikimedia.org/wikipedia/commons/3/31/Minneapolis_Skyline_looking_south.jpg',

    'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
    'https://media.cntraveler.com/photos/607e2bd6469bfa79798ab7ed/16:9/w_2560%2Cc_limit/951973848',
    'https://bdc2020.o0bc.com/wp-content/uploads/2022/03/Boston-Harbor-scaled-1-6307fa615b6ba.jpg',
    'https://www.travelandleisure.com/thmb/G_kw973Jia4EWv-baF0YPLMjK-E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/portland-maine-PORTLANDME0815-2000-b8031817d6f24a7bb2f953059e9eaa02.jpg',
    'https://resortsac.com/wp-content/uploads/2019/07/resorts-north-beach-atlantic-city-casino-900x357.jpg',

    'https://www.travelandleisure.com/thmb/DCQ5PIzBVcgmRVxG-i3psgmWiWE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-nashville-NASHVILLETMOG0723-2b95531d62b24c3fa0d4de045f35a247.jpg',
    'https://i.natgeofe.com/n/5de6e34a-d550-4358-b7ef-4d79a09c680e/aerial-beach-miami-florida_16x9.jpg',
    'https://innonwestliberty.com/wp-content/uploads/2020/08/savannah-river-front-slide-2920x1600.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0e/ChrisLitherlandBourbonSt.jpg',
    'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/gatlinburgtn/Anakeesta-Gatlinburg-Overview_99F2572E-5056-A36F-232967ED35DE7332-99f23ff65056a36_99f267ca-5056-a36f-2393c82b387d6ffe.jpg',

    'https://traveler.marriott.com/wp-content/uploads/2022/02/downtown-austin-texas.jpg',
    'https://vegasexperience.com/wp-content/uploads/2023/01/Photo-of-Las-Vegas-Downtown-1920x1280.jpg',
    'https://visitutahkenticoprod.blob.core.windows.net/cmsroot/visitutah/media/site-assets/winter-photography/wasatch-metro/salt-lake-city/salt-lake-city_downtown-2_winter_visit-salt-lake_pulsipher-douglas_2007.jpg',
    'https://a.cdn-hotels.com/gdcs/production13/d377/69a90c80-b69c-11e8-a439-0242ac110006.jpg?impolicy=fcrop&w=800&h=533&q=medium',
    'https://www.redfin.com/blog/wp-content/uploads/2023/05/GettyImages-1372658426.jpg',

    'https://kenmoreair.com/wp-content/uploads/2019/11/Seattle-during-the-winter-1030x687.jpg',
    'https://www.visittheusa.com/sites/default/files/styles/hero_l/public/images/hero_media_image/2017-01/Getty_515070156_EDITORIALONLY_LosAngeles_HollywoodBlvd_Web72DPI_0.jpg?h=0a8b6f8b&itok=lst_2_5d',
    'https://a.cdn-hotels.com/gdcs/production115/d1331/b57d0557-7b71-423a-803f-c92c98a03889.jpg',
    'https://www.travelandleisure.com/thmb/pY4RFYpZ4Je81EnNwZZMmUyINSM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/header-SANFRAN1121-eb3b40fea0de4cb5aa346d00eb66f16f.jpg',
    'https://www.extraspace.com/wp-content/uploads/2019/03/things-to-know-san-diego.jpg'
];

const cities = [
    'Indianapolis',
    'Detroit',
    'Chicago',
    'Kansas City',
    'Minneapolis',

    'New York City',
    'Pittsburgh',
    'Boston',
    'Portland',
    'Atlantic City',

    'Nashville',
    'Miami',
    'Savannah',
    'New Orleans',
    'Gatlinburg',

    'Austin',
    'Las Vegas',
    'Salt Lake City',
    'San Antonio',
    'Albuquerque',

    'Seattle',
    'Los Angeles',
    'San Jose',
    'San Francisco',
    'San Diego'
];

// variables
let cardCount = 0;

// functions
function appendNewCard() {
    const card = new Card({
        imageUrl: urls[cardCount % urls.length],
        text: cities[cardCount % cities.length],
        onDismiss: appendNewCard
    });
    swiper.append(card.element);
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing');
    cards.forEach((card, index)=>{
        card.style.setProperty('--i', index);
    });
}
function getCurrentCity() {
    const displayedCard = swiper.querySelector('.card:not(.dismissing)');
    if (displayedCard) {
        const cardInstance = displayedCard.cardInstance; // Assuming you store the card instance on the card element
        if (cardInstance instanceof Card) {
            return cardInstance.getCurrentCity();
        }
    }
    return null;
}


// first 5 cards
for(let i = 0; i < 5; i++) {
    appendNewCard();
}