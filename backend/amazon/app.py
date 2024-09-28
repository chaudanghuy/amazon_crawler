from flask import Flask, request, jsonify, send_file
import requests
import scrapy
import spiders.amazon_search_product as amazon_search_product
import subprocess
import os
import glob

app = Flask(__name__)

@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.get_json()    
    url = data['url']    

    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    try:
        # execute command 
        subprocess.check_output(
            f"python -m scrapy crawl amazon_search_one_product -a url={url}", 
            shell=True,
            stderr=subprocess.STDOUT
        )
        return jsonify({'message': 'Scraping started successfully'}), 200
    except subprocess.CalledProcessError as e:
        return jsonify({"status": "error", "message": e.output.decode()}), 500
    
@app.route('/scrape/collection', methods=['POST'])
def scrape_collection():
    data = request.get_json()    
    url = data['url']    
    from_page = data['fromPage']
    to_page = data['toPage']
    thread = data['thread']
    delay = data['delay']

    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    try:
        # execute command 
        check_output("python -m scrapy crawl amazon_search_product -a url=" + url + " -a from_page=" + from_page + " -a to_page=" + to_page + " -a thread=" + thread + " -a delay=" + delay, shell=True)
        return jsonify({'message': 'Scraping started successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/scrape/product_list', methods=['POST'])
def scrape_product_list():
    data = request.get_json()
    file = data['file']

    if not file:
        return jsonify({'error': 'No file provided'}), 400

    try:
        # execute command
        check_output("python -m scrapy crawl amazon_search_product -a file=" + file, shell=True)    
        return jsonify({'message': 'Scraping started successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        
@app.route('/scrape/get-result', methods=['GET'])
def get_result():
    try:
        files = glob.glob(os.path.join('amazon/data', '*.xlsx'))

        if not files:
            return jsonify({'error': 'No files found'}), 404
        
        latest_file = max(files, key=os.path.getmtime)

        return send_file(latest_file, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)