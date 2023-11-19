class Card{
    constructor({
        imageUrl,
        onDismiss,
        text
    }) {
        this.imageUrl = imageUrl;
        this.onDismiss = onDismiss;
        this.text = text;
        this.#init();
    }

    // private properties
    #startPoint;
    #offsetX;
    #offsetY;

    // private methods
    #init = () => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.cardInstance = this;
        const img = document.createElement('img');
        img.src= this.imageUrl;
        card.append(img);

        // Create a div for the text
        const textContainer = document.createElement('div');
        textContainer.textContent = this.text; // Set the text content
        textContainer.style.position = 'absolute'; // Position the text container
        textContainer.style.bottom = '10px'; // Adjust the vertical position as needed
        textContainer.style.left = '0'; // Center the text horizontally
        textContainer.style.right = '0'; // Center the text horizontally
        textContainer.style.color = 'white'; // Set text color
        textContainer.style.textAlign = 'center'; // Center the text
        card.append(textContainer);

        this.element = card;
        this.#listenToMouseEvents();
    }
    
    #listenToMouseEvents = () => {
        //mousedown
        this.element.addEventListener('mousedown', e => {
            const { clientX, clientY } = e;
            this.#startPoint = { x: clientX, y: clientY };
            //no transition when moving
            this.element.style.transition = '';
            document.addEventListener('mousemove', this.#handleMouseMove);
        });
        
        //mouseup
        document.addEventListener('mouseup', this.#handleMouseUp);

        //prevent drag
        this.element.addEventListener('dragstart', e => {
            e.preventDefault();
        });

    }

    #handleMouseMove = (e) => {
        if (!this.#startPoint) return;
        const {clientX, clientY} = e;
        this.#offsetX = clientX - this.#startPoint.x;
        this.#offsetY = clientY - this.#startPoint.y;

        const rotate = this.#offsetX * 0.1;

        this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;

        // dismiss card when moving far away
        if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
            const direction = this.#offsetX > 0 ? 1: -1;
            this.#dismiss(direction);
        }
    }

    #handleMouseUp = (e) => {
        this.#startPoint = null;
        document.removeEventListener('mousemove', this.#handleMouseMove);
        //transition when move back
        this.element.style.transition = 'transform 0.5s';
        this.element.style.transform = '';
    }

    #dismiss = (direction) => {
        this.#startPoint = null;
        document.removeEventListener('mouseup', this.#handleMouseUp);
        document.removeEventListener('mousemove', this.#handleMouseMove);

        this.element.style.transition = 'transform 0.5s';
        this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px rotate(${90 * direction}deg)`;
        this.element.classList.add('dismissing');

        setTimeout(() => {
            this.element.remove();
        }, 20); 

        if(typeof this.onDismiss === 'function'){
            this.onDismiss();
        }

    }
}
