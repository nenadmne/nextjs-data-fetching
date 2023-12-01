import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailPage({ product }) {
  // if fallback is set to fallback:true, this is important to add since page is not pre-rendered but renders just in time after request
  if (!product) {
    return <p> Loading... </p>;
  }
  return (
    <Fragment>
      <h1> {product.title} </h1>
      <p> {product.description} </p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  // getting dynamic parametars trough destructuring context
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.products.find((item) => item.id === productId);

  // We do this if we have componenet with fallback set to true
  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((item) => item.id);
  const params = ids.map((id) => ({ params: { pid: id } }));

  return {
    // paths should be array of objects where every object contains object with params and its value
    paths: params,
    fallback: true,
  };
}
export default ProductDetailPage;
