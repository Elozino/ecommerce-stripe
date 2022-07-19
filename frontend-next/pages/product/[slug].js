import React from "react";

import { client, urlFor } from "../../libs/client";

const ProductDetails = ({ product, products }) => {
  const { name, image, details, price } = product;
  return (
    <div>
      <div className="product-details-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} alt="image" />
          </div>
          {/* <div className="small-images-container">
            {image?.map((item, i) => (
              <img src={urlFor(item)} alt="image" 
              className=""
              onMouseEnter={""}
              />
            ))}
          </div> */}
        </div>
        <div className="product-details-desc">
          <h1>{name}</h1>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == 'product' && slug.current == "${slug}"][0]`;
  const productsQuery = `*[_type == 'product']`;

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};
