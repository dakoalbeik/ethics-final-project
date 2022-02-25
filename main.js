// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");


// get the papers from the DOM
const papers = [...document.querySelectorAll('.paper')];

/* Paper stack order */
papers.forEach((paper, idx)=>{
    paper.style.zIndex = papers.length - idx;
})

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = papers.length;
let maxLocation = numOfPapers + 1;


function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}


function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                // if it's the first page, then open the book
                // and add class flipped to first page
                openBook();
                papers[0].classList.add("flipped");
                papers[0].style.zIndex = 1;
                break;
            case papers.length:
                // if it's the last page, then add the flipped class
                // to the last page and close the book
                papers[papers.length - 1].classList.add("flipped");
                papers[papers.length - 1].style.zIndex = papers.length;
                closeBook(false);
                break;
            default:
                // if any other page in between, add the flipped class
                // to the particular page and change the zIndex
                papers[currentLocation - 1].classList.add('flipped');
                papers[currentLocation - 1].style.zIndex = currentLocation;
                break;
        }
        currentLocation++;
    }

}


function goPrevPage() {
    // if currentLocation is 1 then we can't go back
    if(currentLocation > 1) {
        switch(currentLocation) {
            
            case 2:
                // if location is 2, then we close the book
                // and remove the flipped class from the first page
                closeBook(true);
                papers[0].classList.remove("flipped");
                papers[0].style.zIndex = papers.length;
                break;
            case papers.length + 1:
                // if location is the last paper + 1
                // then we open the book and remove the flipped class
                // from the last page
                openBook();
                papers[papers.length - 1].classList.remove("flipped");
                papers[papers.length - 1].style.zIndex = 1;
                break;
            default:
                // if location is anywhere in between, we remove
                // the flipped class from the corresponding page
                papers[currentLocation - 2].classList.remove("flipped");
                // set the z-index of the element to the amount of pages - the index of the page in the array
                papers[currentLocation - 2].style.zIndex = papers.length - (currentLocation - 2);
                break;
        }

        currentLocation--;
    }
}