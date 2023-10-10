type Event = {
  event: 'add_to_cart' | 'remove_from_cart';
}

type Product = {
  id?: string;
  title?: string;
};

export const addToCartGTMEvent = (event: Event, payload: Product) => {
  window.dataLayer.push({
    event: event,
    product: {
      id: payload.id,
      title: payload.title,
    },
  });
};

export const removeFromCartGTMEvent = (event: Event, payload: Product) => {
  window.dataLayer.push({
    event: event,
    product: {
      id: payload.id,
      title: payload.title,
    },
  });
};
