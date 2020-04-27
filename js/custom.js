$(function() {
    var template = new EJS({
        text: $('#template').html()
    });
    if(localStorage.getItem("books")){
		let booksArray = JSON.parse(localStorage.getItem('books'));
		console.log(booksArray);
		$('#list').html(template.render({list:booksArray}));
	}
});

const detailsModal = document.querySelector('#modalBookDetails');
$("#addBtn").click(function (){
	$("#bookModal").show();
})
$("#cancelBtn").click(function (){
	$("#bookModal").hide();
})
$("#close-window").click(function (){
	$("#modalBookDetails").hide();
})

function Book(title, pub, pages, yearPub, coverImgURL,bokPrice,bokAuthor,bokLanguage,bokCountry,bokExtract) {
	this.title = title;
	this.pub = pub;
	this.pages = pages;
	this.yearPub = yearPub;
	this.coverImgURL = coverImgURL;
	this.price= bokPrice;
	this.author= bokAuthor;
	this.language=bokLanguage;
	this.country=bokCountry;
	this.extract=bokExtract;
	this.read = "maroon";
}


function closeModalBox(){
	detailsModal.style.display = 'none';
}
const bookRow = document.getElementById('bookRow');

$("#newBookBtn").click(function (){
	addToELibrary();
})


function addToELibrary() {
	if (validateInput()) {
		let title = $("#txtTitle").val();
		let pub =  $("#txtPub").val();
		let pages = $("#txtPages").val();
		let coverImgURL = $("#txtCoverURL").val();
		let yearPub = $("#txtPubYear").val();
		let price = $("#bookPrice").val();
		let author = $("#bookAuthor").val();
		let language = $("#language").val();
		let country = $("#bookCountry").val();
		let extract = $("#bookExtract").val();
		let book = new Book(title, pub, pages, yearPub, coverImgURL,price,author,language,country,extract);
		saveBook(book);
		location.reload();
	} else {
		alert('Sorry, all fields are required');
	}
}
function validateInput() {
	if ($("#txtTitle").val() == '' || $("#txtPub").val() == '' || $("#txtPages").val() == '' || $("#txtCoverURL").val() == '' || $("#txtPubYear").val()== "" || $("#bookPrice").val() =="" || $("#bookAuthor").val() ==""||$("#language").val() =="") {
		return false;
	}
	return true;
}
// function render() {
// 	if (localStorage.getItem('books') != null) {
// 		let booksArray = JSON.parse(localStorage.getItem('books'));
// 		for (var i = 0; i < booksArray.length; i++) {
// 		 bookRow.innerHTML += 
// 			`

// 			 `;
// 		}
// 	} else {
// 		console.log('No books yet');
// 	}
// }
function saveBook(bookObj) {
	let booksArray = [];
	if (localStorage.getItem('books') == null) {
		booksArray.push(bookObj);
		localStorage.setItem('books', JSON.stringify(booksArray));
		alert('New book added to the eLibrary!');
	} else {
		booksArray = JSON.parse(localStorage.getItem('books'));
		booksArray.push(bookObj);
		localStorage.setItem('books', JSON.stringify(booksArray));
		alert('New book added to the eLibrary');
	}
}





function deleteBook(bookID) {
	if (localStorage.getItem('books') !== null) {
		booksArray = JSON.parse(localStorage.getItem('books'));
		booksArray.splice(bookID, 1);
		localStorage.setItem('books', JSON.stringify(booksArray));
		alert('book deleted');
		location.reload();
	}
}

