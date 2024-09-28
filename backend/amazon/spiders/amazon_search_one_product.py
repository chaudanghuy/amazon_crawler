import json
import scrapy
from urllib.parse import urljoin
import re
import sys

class AmazonSearchOneProductSpider(scrapy.Spider):
    name = "amazon_search_one_product"

    custom_settings = {
        'FEEDS': { 'data/%(name)s_%(time)s.csv': { 'format': 'csv',}}
        }    
    
    def start_requests(self):
        # get url from command
        print("url: ", self.url)
        url = self.url
        yield scrapy.Request(url=url, callback=self.parse_product_data, meta={'keyword': 'ipad', 'page': 1})           

    def parse_product_data(self, response):
        image_data = json.loads(re.findall(r"colorImages':.*'initial':\s*(\[.+?\])},\n", response.text)[0])
        variant_data = re.findall(r'dimensionValuesDisplayData"\s*:\s* ({.+?}),\n', response.text)
        feature_bullets = [bullet.strip() for bullet in response.css("#feature-bullets li ::text").getall()]
        price = response.css('.a-price span[aria-hidden="true"] ::text').get("")
        if not price:
            price = response.css('.a-price .a-offscreen ::text').get("")
        yield {
            "name": response.css("#productTitle::text").get("").strip(),
            "price": price,
            "stars": response.css("i[data-hook=average-star-rating] ::text").get("").strip(),
            "rating_count": response.css("div[data-hook=total-review-count] ::text").get("").strip(),
            "feature_bullets": feature_bullets,
            "images": image_data,
            "variant_data": variant_data,
        }

