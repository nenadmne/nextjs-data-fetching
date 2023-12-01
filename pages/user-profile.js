function UserProfile({ username }) {
  return <h1>{username}</h1>;
}

// We use getServerSideProps when we want to access request object like header or cookies. Usefull for auth pages
export async function getServerSideProps(context) {
  return {
    props: {
      username: "Max",
    },
  };
}

export default UserProfile;
