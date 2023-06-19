const ApiKey = "1t6WS4tAzH9Tbf5VToP5oV12N0Lnq8tlgHuM8iqH43DffDABPmNUwt1u";
const imageGalleryParent = document.querySelector(".gallery-wrap");
const ShowMoreImagesBtn = document.querySelector("#load");
const inputval = document.querySelector("#search-image");
const perPage = 15;
let currentPage = 1;
let getSearchVal = null;

// fetching the images from api and set to the html

function genrateDynamicHtml(images) {
  var x='';
   images.map(img => {
    x += `<li class="image-item">
         <img src="${img.src.large2x}" alt=""/>
         <div class="image-detail">
           <div class="photographer">
             <i class="fa fa-camera" aria-hidden="true"></i>
             <span class="name">${img.photographer}</span>
           </div>
           <div class="download-icon">
             <button  class="fa fa-download download-image" aria-hidden="true" onclick="downloadItem('${img.src.large2x}')"></button>
           </div>
         </div>
       </li>`
  });
  imageGalleryParent.innerHTML = x
  // imageGalleryParent.innerHTML = images.map((img) => 
  //     ''
    
  
  //     // `<li class="image-item">
  //     //    <img src="${img.src.large2x}" alt=""/>
  //     //    <div class="image-detail">
  //     //      <div class="photographer">
  //     //        <i class="fa fa-camera" aria-hidden="true"></i>
  //     //        <span class="name">${img.photographer}</span>
  //     //      </div>
  //     //      <div class="download-icon">
  //     //        <button  class="fa fa-download download-image" aria-hidden="true" onclick="downloadItem('${img.src.large2x}')"></button>
  //     //      </div>
  //     //    </div>
  //     //  </li>`
  // );
}

// fuction for fetching the images from the api
function getImages(apiURL) {
  ShowMoreImagesBtn.innerHTML = "Loading...";
  ShowMoreImagesBtn.classList.add("disable");
  fetch(apiURL, {
    headers: { Authorization: ApiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      genrateDynamicHtml(data.photos);
      ShowMoreImagesBtn.innerHTML = "Show More";
      ShowMoreImagesBtn.classList.remove("disable");
    });
}
getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);

// load button shoing more 15 images

ShowMoreImagesBtn.addEventListener("click", () => {
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  currentPage++;
  getImages(apiURL);
});

// fucntion for download the image

function downloadItem(imgUrl){
  fetch(imgUrl)
    .then((res) => res.blob())
    .then((file) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("failed to download image!...."));
}

// function for  searching the image form input box

inputval.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    currentPage = 1;
    getSearchVal = e.target.value;
    imageGalleryParent.innerHTML = "";
    getImages(
      `https://api.pexels.com/v1/search?query=${getSearchVal}?page=${currentPage}&per_page=${perPage}`
    );
  }
});

console.log(0.1 + 0.2 == 0.3);
// http://localhost/wordpress/wp-admin/