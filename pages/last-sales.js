function LastSales(props) {
  if (!props.sales) {
    return <p> Loading...</p>;
  }

  return (
    <ul>
      {props.sales.map((item) => (
        <li key={item.id}>{item.username}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return fetch(
    "https://next-js-course-c7fc9-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedData = [];

      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      return {
        props: { sales: transformedData },
        revalidate: 10,
      };
    });
}

export default LastSales;
