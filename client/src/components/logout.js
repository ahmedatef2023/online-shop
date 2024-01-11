 
 const notReload=() => {
    localStorage.removeItem("token");
    window.location="/";
};
export default notReload