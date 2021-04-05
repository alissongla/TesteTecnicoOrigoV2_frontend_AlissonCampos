import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { useHistory } from "react-router-dom";
import { faUserTag } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default function Sidebar() {
    const history = useHistory();
    return (
        <SideNav
            className="sideBar"
            onSelect={(selected) => {
                history.push("/" + selected);
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="cliente">
                <NavItem eventKey="cliente">
                    <NavIcon>
                        <FontAwesomeIcon icon={faUserTag} />
                    </NavIcon>
                    <NavText>
                        Cliente
                </NavText>
                </NavItem>
            </SideNav.Nav>
            <SideNav.Nav defaultSelected="logout">
                <NavItem eventKey="logout">
                    <NavIcon>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </NavIcon>
                    <NavText>
                        Logout
                </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}