import shopify, requests,json, codecs

SHOP_NAME = "your shopname"
API_KEY = "your api key"
PASSWORD = "your password"
SHARED_SECRET = "shared secret"

reader = codecs.getreader("utf-8") # http://stackoverflow.com/questions/6862770/python-3-let-json-object-accept-bytes-or-let-urlopen-output-strings
s = requests.Session()
s.auth = (API_KEY, PASSWORD)


shop_url = "https://%s:%s@%s.myshopify.com/admin" % (API_KEY, PASSWORD, SHOP_NAME)
shopify.ShopifyResource.set_site(shop_url)
shop = shopify.Shop.current()

orders = s.get("https://%s.myshopify.com/admin/orders.json" % (SHOP_NAME)).content
print(orders)
# product = shopify.Product.find(117558070, product_id = 117558070)
# product.price = 100
# product.save()
