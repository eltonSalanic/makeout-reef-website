fetch('../partials/header.html')
            .then(res => res.text())
            .then(htmlText =>{
                document.querySelector('.header').innerHTML = htmlText;
            })