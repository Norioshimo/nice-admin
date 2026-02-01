import { Outlet } from "react-router-dom";
import { Footer,Header ,Sidebar} from "../../components/shared"; 

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
