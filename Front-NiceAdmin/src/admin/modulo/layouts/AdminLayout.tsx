 
import { Outlet } from "react-router";
import { Footer,Header ,Sidebar} from "../../components"; 

const AdminLayout = () => { 
  return (
    <>
      <Header />
      <Sidebar />

      <main id="main" className="main">
        <Outlet />
      </main>

      <Footer isLogin={false} />
    </>
  );
};

export default AdminLayout;
