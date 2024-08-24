const imageContainer = document.getElementById("image-container");


const imageUrls = [
    {image: "https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {image: "https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {image: "https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {image: "https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {image: "https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {image: "https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {image: "https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {image: "https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {image: "https://images.pexels.com/photos/2112713/pexels-photo-2112713.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"},
    {image: "https://images.pexels.com/photos/2168257/pexels-photo-2168257.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"},
    {image: "https://images.pexels.com/photos/4100276/pexels-photo-4100276.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"},
    {image: "https://images.pexels.com/photos/1549437/pexels-photo-1549437.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"},
    {image: "https://images.pexels.com/photos/3190033/pexels-photo-3190033.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"},
    {image: "https://images.pexels.com/photos/955413/pexels-photo-955413.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"},
    {image: "https://images.pexels.com/photos/1868925/pexels-photo-1868925.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"},
    {image: "https://images.pexels.com/photos/2661536/pexels-photo-2661536.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"}
];

imageUrls.forEach(({ image }) => {
    imageContainer.innerHTML += `
        <div class="col image">
            <img src="${image}" class="object-fit-cover img-fluid">
        </div>
    `;
});