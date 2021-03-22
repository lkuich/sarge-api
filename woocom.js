const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default

const api = new WooCommerceRestApi({
  url: process.env.WOO_URI,
  consumerKey: process.env.WOO_CUSTOMER_KEY,
  consumerSecret: process.env.WOO_CUSTOMER_SECRET,
  version: 'wc/v3',
})

// /wp-json/wc/v3/orders
/*
  status: any, pending, processing, on-hold, completed, cancelled, refunded, failed and trash
  */
const WooComOrders = (params) => {
  // const { search, after, before, order = 'desc', status = 'any' } = params
  // Get woocom sales..
  return api.get('orders', params)
}
