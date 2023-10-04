type Product = {
  id: string,
  title: string,
}

export const addToCartGTMEvent = (event: string, payload: Product) => {
  window.dataLayer.push({
    event: event,
    product: {
      id: payload.id,
      title: payload.title,
    }
  });
}