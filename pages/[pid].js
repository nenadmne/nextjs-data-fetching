import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailPage({ product }) {
  return (
    <Fragment>
      <h1> {product.title} </h1>
      <p> {product.description} </p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // getting dynamic parametars trough destructuring context
  const { params } = context;
  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((item) => item.id === productId);

  return {
    props: {
      product: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          pid: "p1",
        },
      },
      {
        params: {
          pid: "p2",
        },
      },
      {
        params: {
          pid: "p3",
        },
      },
    ],
    fallback: false,
  };
}

export default ProductDetailPage;
