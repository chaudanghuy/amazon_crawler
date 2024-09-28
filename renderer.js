const { ipcRenderer } = require('electron');
const ScrapeService = require('./services/scrapeService');
let scrapeService;
let productURL;

document.getElementsByName('searchType').forEach((input) => {
    input.addEventListener('change', () => {
        // Hide all input line2Input class
        document.querySelectorAll('.line2Input').forEach((input) => {
            input.classList.add('d-none');
        });
        document.getElementById('pageInput').classList.add('d-none');
        document.getElementById('threadInput').classList.add('d-none');

        // Hide the results box if the user changes the search type
        // document.getElementById('resultsBox').style.display = 'none';

        // Clear the input field if the user changes the search type
        document.getElementById('inputSearch').value = '';

        // toggle field depends on the search type
        if (document.getElementById('productUrl').checked) {
            document.getElementById('productUrlInput').classList.remove('d-none');
        } else if (document.getElementById('collectionUrl').checked) {
            document.getElementById('productUrlInput').classList.remove('d-none');
            document.getElementById('pageInput').classList.remove('d-none');
            document.getElementById('threadInput').classList.remove('d-none');
        } else if (document.getElementById('productList').checked) {
            document.getElementById('collectionUrlInput').classList.remove('d-none');
        } else if (document.getElementById('asin').checked) {
            document.getElementById('asinInput').classList.remove('d-none');
        }
    });
});

document.getElementById('searchBtn1').addEventListener('click', async () => {
    startSearch();
});

document.getElementById('stopBtn').addEventListener('click', () => {
    stopSearch();
});

async function startSearch() {
    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    productUrl = document.getElementById('inputSearch').value;

    if (productUrl === '') {
        alert('Vui lòng nhập đầu vào');
        return;
    }


    scrapeService = new ScrapeService('http://127.0.0.1:5000/scrape');
    if (searchType === 'productUrl') {
        scrapeService = new ScrapeService('http://127.0.0.1:5000/scrape');
    } else if (searchType === 'collectionUrl') {
        scrapeService = new ScrapeService('http://127.0.0.1:5000/scrape-collection');
    } else if (searchType === 'productList') {
        scrapeService = new ScrapeService('http://127.0.0.1:5000/scrape-product-list');
    } else if (searchType === 'asin') {
        scrapeService = new ScrapeService('http://127.0.0.1:5000/scrape-asin');
    }

    document.getElementById('statusText').textContent = 'Đang xử lý...';
    document.getElementById('resultsBox').style.display = 'block';
    document.getElementById('resultsBox').innerHTML = '<p>Bắt đầu tiến trình...</p>';

    // Ensure that the user has selected productUrl as the search type
    if (searchType === 'productUrl' && productUrl) {
        scrapeProduct();
    }
}

async function scrapeProduct() {
    const startMessage = await scrapeService.startScraping(productUrl);

    // Check if scraping started successfully
    document.getElementById('resultsBox').innerHTML += `
            <p>Lấy dữ liệu từ URL ${productUrl} hoàn tất</p>
        `;

    if (startMessage === 'Scraping started successfully') {
        document.getElementById('statusText').textContent = 'Hoàn tất';

        // Display the download link
        document.getElementById('resultsBox').innerHTML += `
                <p>Xem kết quả trong thư mục backend/amazon/data</p>
                `;
    }

    // Add an event listener to the download link
    document.getElementById('downloadLink').addEventListener('click', async (e) => {
        e.preventDefault();

        const resultBlob = await scrapeService.getResult();

        // Create a link to download the result file
        const url = window.URL.createObjectURL(new Blob([resultBlob.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'result.xlsx');
        document.body.appendChild(link);
        link.click();

        link.remove();
    });
}

async function scrapeProductCollection() {
    const startMessage = await scrapeService.startScraping(productUrl);

    // Check if scraping started successfully
    document.getElementById('resultsBox').innerHTML += `
            <p>Lấy dữ liệu từ URL ${productUrl} hoàn tất</p>
        `;

    if (startMessage === 'Scraping started successfully') {
        document.getElementById('statusText').textContent = 'Hoàn tất';

        // Display the download link
        document.getElementById('resultsBox').innerHTML += `
                <p><a href="#" id="downloadLink">Tải kết quả (Excel)</a></p>
                `;
    }

    // Add an event listener to the download link
    document.getElementById('downloadLink').addEventListener('click', async (e) => {
        e.preventDefault();

        const resultBlob = await scrapeService.getResult();

        // Create a link to download the result file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'result.xlsx';  // Name of the file to be downloaded
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
}

async function scrapeProductAsin() {
    const startMessage = await scrapeService.startScraping(productUrl);

    // Check if scraping started successfully
    document.getElementById('resultsBox').innerHTML += `
            <p>Lấy dữ liệu từ URL ${productUrl} hoàn tất</p>
        `;

    if (startMessage === 'Scraping started successfully') {
        document.getElementById('statusText').textContent = 'Hoàn tất';

        // Display the download link
        document.getElementById('resultsBox').innerHTML += `
                <p><a href="#" id="downloadLink">Tải kết quả (Excel)</a></p>
                `;
    }

    // Add an event listener to the download link
    document.getElementById('downloadLink').addEventListener('click', async (e) => {
        e.preventDefault();

        const resultBlob = await scrapeService.getResult();

        // Create a link to download the result file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'result.xlsx';  // Name of the file to be downloaded
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
}

async function scrapeProduct() {
    const startMessage = await scrapeService.startScraping(productUrl);

    // Check if scraping started successfully
    document.getElementById('resultsBox').innerHTML += `
            <p>Lấy dữ liệu từ URL ${productUrl} hoàn tất</p>
        `;

    if (startMessage === 'Scraping started successfully') {
        document.getElementById('statusText').textContent = 'Hoàn tất';

        // Display the download link
        document.getElementById('resultsBox').innerHTML += `
                <p><a href="#" id="downloadLink">Tải kết quả (Excel)</a></p>
                `;
    }

    // Add an event listener to the download link
    document.getElementById('downloadLink').addEventListener('click', async (e) => {
        e.preventDefault();

        const resultBlob = await scrapeService.getResult();

        // Create a link to download the result file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'result.xlsx';  // Name of the file to be downloaded
        document.body.appendChild(a);
        a.click();
        a.remove();
    });
}

function stopSearch() {
    document.getElementById('statusText').textContent = 'Ready';
    document.getElementById('resultsBox').style.display = 'none';
}

// Handle Explore Button Click to open the folder dialog
document.getElementById('exploreBtn').addEventListener('click', () => {
    ipcRenderer.send('open-folder-dialog');
});

// Receive the selected folder path and set it to the input field
ipcRenderer.on('selected-folder', (event, path) => {
    document.getElementById('saveFolder').value = path;
});