interface Product {
  id?: number; // nie an die API schicken!!! In der Route verwenden
  name: string; // text input
  description: string; // textarea
  brand: string; // select oder Text input mit auto complete
  link: string;
  price: any; // unnötig
  sizeVariants: {
    size: number;
    price: number;
  }[];
  color: number[]; // ids aus Colors
  hexColor: string; // wahrscheinlich unnötig
  coverage: number;
  images: string[]; // => url input
  type: "wall paint"; // für später, einfach ignorieren, Stand jetzt: unnötig
  recommended: number[]; // unnötig
}

const products = [];

const refProduct = products[0]; // eines der produkte kopieren, um alle wichtigen Keys und Values zu bekommen

const userInput = { brands: "blah" };

const apiProduct = {
  ...refProduct,
  ...userInput,
};
delete apiProduct.id;

// sendAnApi(apiProduct);
