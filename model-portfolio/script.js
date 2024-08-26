const imageContainer = document.getElementById("image-container");


const imageUrls = [
    {image: "images/image1.jpg"},
    {image: "images/image2.jpg"},
    {image: "images/image3.jpg"},
    {image: "images/image4.jpg"},
    {image: "images/image5.jpg"},
    {image: "images/image6.jpg"},
    {image: "images/image7.jpg"},
    {image: "images/image8.jpg"},
    {image: "images/image9.jpg"},
    {image: "images/image10.jpg"},
    {image: "images/image11.jpg"},
    {image: "images/image12.jpg"},
    {image: "images/image13.jpg"},
    {image: "images/image14.jpg"},
    {image: "images/image15.jpg"},
    {image: "images/image16.jpg"},
    {image: "images/image17.jpg"},
];

imageUrls.forEach(({ image }) => {
    imageContainer.innerHTML += `
        <div class="col image">
            <img src="${image}" class="object-fit-cover img-fluid w-100" style="border-radius: 5px;">
        </div>
    `;
});