const pagesNumbers = [...document.querySelectorAll('.page-number')];

// change the page number on each page to the page index + 1
pagesNumbers.forEach((pageNumber, idx)=>{
    pageNumber.innerText = idx + 1;
})
