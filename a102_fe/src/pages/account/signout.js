function Signout() {
  return (
    localStorage.removeItem('access-token')
  );
}

export default Signout;