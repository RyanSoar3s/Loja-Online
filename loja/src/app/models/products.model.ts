export type Product = {
  [ k: string ]: {
    title: string,
    images: Array<string>,
    price: number,
    description: string,
    category: string,
    tags: Array<string>

  }

};
