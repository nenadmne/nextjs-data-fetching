import fs from "fs/promises";
import path from "path";

function HomePage({ products }) {
  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // fs and path usage for dummy backend data
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // example of using redirect if there is no data at all
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  // if data is empty generating 404-not found
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // regenerating page every 10 seconds
    revalidate: 10,
  };
}

export default HomePage;
