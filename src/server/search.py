import requests
from xml.etree import ElementTree
from xml.etree.ElementTree import XML

import random
import sys

def _find_items (user_params):
    params = {
            'SECURITY-APPNAME': 'AlonGubk-d2d0-4183-ad6e-7dcf62c61cd2',
            'OPERATION-NAME': 'findItemsAdvanced',
    }
    params.update (user_params)
    
    result = requests.get (
        'http://svcs.ebay.com/services/search/FindingService/v1',
        params = params
        )

    xml = ElementTree.fromstring (result.content)
    xml.tag = xml.tag.split ('}', 1)[1]
    for el in xml.iter ():
        if '}' in el.tag:
            el.tag = el.tag.split ('}', 1)[1]

    if xml.find('ack').text != 'Success':
        raise RuntimeError ('Shit went down')

    urls = []
    for item in xml.iterfind('searchResult/item'):
        urls.append (item.find('galleryURL').text)
    return random.choice (urls) if urls else None

def find_relevant (keywords, category = None):
    params = {
            'keywords': keywords,
            'paginationInput.entriesPerPage': 100,
    }
    if category is not None:
        params['categoryId'] = category
    item = _find_items (params)
    return item

def find_irrelevant (keywords):
    params = {
            'keywords': keywords,
            'paginationInput.entriesPerPage': 100,
            'paginationInput.pageNumber': 80,
    }
    item = _find_items (params)
    return item

def main ():
    print find_relevant('high heels', 3034)
    print find_irrelevant('high heels')

if __name__ == '__main__':
    main ()
