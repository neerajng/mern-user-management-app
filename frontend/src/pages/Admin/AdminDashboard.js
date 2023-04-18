import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Form } from "react-bootstrap";
import UsersData from "../../components/UsersData";
import { getUsers, filterUser, reset } from "../../features/admin/usersSlice";
// import Spinner from "../../components/Spinner";
import AdminLayout from "../../components/AdminLayout";

function AdminDashboard() {
  const { admin } = useSelector((state) => state.admin);
  const { users, isError, message } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("in use effect");
    if (isError) {
      console.log("hey in error");
      console.log(message);
    }

    if (!admin) {
      navigate("/admin/login");
    }

    dispatch(getUsers());

    // here  return function works when the component unmounts
    return () => {
      console.log("hey in dispatch reset");
      dispatch(reset());
    };
  }, [admin, navigate]);

  const [search, setSearch] = useState("");

  const searchUser = (e) => {
    e.preventDefault();
    dispatch(filterUser(search));
  };

  // if(isLoading){
  //   return <Spinner/>
  // }

  const settingSearch = (value) => {
    if (value.length === 0) {
      setSearch(value);
      dispatch(filterUser(""));
    } else {
      setSearch(value);
      // dispatch(adminSearch(searchkeyword))
    }
  };
  const addUser = () => {
    navigate("/signup");
  };

  return (
    <AdminLayout title="Admin dashboard" className="adminDashboard">
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="m-2"
      >
        <Form style={{ width: "50%" }} className="d-flex mt-2 mb-2" onSubmit={searchUser} >
          <Form.Control
            type="search"
            onChange={(e) => {
              settingSearch(e.target.value);
            }}
            placeholder="Search"
            className="me-2 rounded-pill ps-4"
            aria-label="Search"
          />
          <Button variant="btn btn-success rounded-pill px-4" type="submit">
            Search
          </Button>
        </Form>
        <Button onClick={addUser} className="rounded-pill ps-4 my-2">Add user</Button>
      </div>

      {users.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <UsersData key={user._id} data={user} index={i} />
            ))}
          </tbody>
        </Table>
      ) : (
        <h3> No users</h3>
      )}
    </AdminLayout>
  );
}

export default AdminDashboard;
