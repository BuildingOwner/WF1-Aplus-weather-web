import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { logout } from "../../modules/user";

const HeaderContainer = ()=>{
    const{user} = useSelector(({user})=>(
        {user: user.user}
    ));
    const dispatch = useDispatch();
    const onLogout = ()=>{
        dispatch(logout());
    }

    return <Sidebar user = {user} onLogout={onLogout}/>;
};

export default HeaderContainer;
