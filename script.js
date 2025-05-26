// script.js
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeButton = document.querySelector('.close-button');

    // 從 JSON 檔案載入圖片資料
    fetch('images.json')
        .then(response => response.json())
        .then(images => {
            images.forEach(image => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                // 為圖片創建一個包裹容器
                const imageWrapper = document.createElement('div');
                imageWrapper.classList.add('image-wrapper');

                const img = document.createElement('img');
                img.src = image.path;
                img.alt = image.title;

                imageWrapper.appendChild(img); // 將圖片放入包裹容器

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('image-info');

                const titleH3 = document.createElement('h3');
                titleH3.textContent = image.title;

                const descriptionP = document.createElement('p');
                descriptionP.textContent = image.description;

                infoDiv.appendChild(titleH3);
                infoDiv.appendChild(descriptionP);

                galleryItem.appendChild(imageWrapper); // 將圖片包裹容器添加到藝廊項目
                galleryItem.appendChild(infoDiv);

                galleryItem.addEventListener('click', () => {
                    lightbox.style.display = 'block';
                    lightboxImg.src = image.path;
                    lightboxImg.alt = image.title;
                    lightboxCaption.innerHTML = `<h3>${image.title}</h3><p>${image.description}</p>`;
                });

                galleryContainer.appendChild(galleryItem);
            });
        })
        .catch(error => console.error('Error loading the images:', error));

    // 點擊關閉按鈕關閉 lightbox
    closeButton.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // 點擊 lightbox 外部區域關閉 lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});
