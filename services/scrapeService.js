// scrapeService.js

const { default: axios } = require("axios");

class ScrapeService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    // Method to start the scraping process
    async startScraping(url) {
        try {
            const response = await fetch(`${this.apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }), // Send the product URL to the API
            });

            const data = await response.json();
            if (data.message === 'Scraping started successfully') {
                return 'Scraping started successfully';
            } else {
                throw new Error('Scraping failed to start');
            }
        } catch (error) {
            console.error('Error in startScraping:', error);
            throw error;
        }
    }

    // Scrape by collection
    async startCollectionScraping(url, fromPage, toPage, thread, delay) {
        try {
            const response = await fetch(`${this.apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    url,
                    fromPage,
                    toPage,
                    thread,
                    delay
                 }), 
            });

            const data = await response.json();
            if (data.message === 'Scraping started successfully') {
                return 'Scraping started successfully';
            } else {
                throw new Error('Scraping failed to start');
            }
        } catch (error) {
            console.error('Error in startScraping:', error);
            throw error;
        }
    }

    // Scrape by product list
    async startProductListScraping() {
        try {
            const formData = new FormData();
            formData.append('file', document.getElementById('inputFile').files[0]);            
            const response = await fetch(`${this.apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formData
            });

            const data = await response.json();
            if (data.message === 'Scraping started successfully') {
                return 'Scraping started successfully';
            } else {
                throw new Error('Scraping failed to start');
            }
        } catch (error) {
            console.error('Error in startScraping:', error);
            throw error;
        }
    }

    // Scrape by ASIN
    async startAsinScraping(asin) {
        try {
            const response = await fetch(`${this.apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ asin }), // Send the product URL to the API
            });

            const data = await response.json();
            if (data.message === 'Scraping started successfully') {
                return 'Scraping started successfully';
            } else {
                throw new Error('Scraping failed to start');
            }
        } catch (error) {
            console.error('Error in startScraping:', error);
            throw error;
        }
    }

    // Method to get the scraping result (Excel file)
    async getResult() {
        try {
            const response = await axios.get({
                url: `${this.apiUrl}/get-result`,
                responseType: 'blob',
                method: 'GET',                
            })
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'result.xlsx');
            document.body.appendChild(link);
            link.click();

            link.remove();
        } catch (error) {
            console.error('Error in getResult:', error);
            throw error;
        }
    }
}

module.exports = ScrapeService;  