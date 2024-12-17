import EmployeeForm from "./components/employeeForm";

const Home = async() => {

  // const res = await fetch("http://localhost:3000/api/addemployee", {
  //   // method: "POST",
  // });
  // const result = await res.json();
  // console.log(result);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="mb-5 text-emerald-500 text-xl">Employee Managment</h1>
      <EmployeeForm/>
    </div>
  )
}

export default Home;
