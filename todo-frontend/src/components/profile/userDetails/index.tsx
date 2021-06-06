import NavBar from "../../navbar"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton  } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

const UserDetails = () => {
    return (
        <>
            <NavBar/>
            <List>
                <label>Edit Info</label>
                <IconButton > <Edit/> </IconButton>
                <ListItem >
                <label className="m-1">Email: </label>
                    <ListItemText primary="ggpelosi21@gmail.com"/>
                </ListItem>
                <ListItem >
                <label className="m-1">First Name: </label>
                    <ListItemText primary="Gabriel"/>
                </ListItem>
                <ListItem >
                <label className="m-1">Last Name: </label>
                    <ListItemText primary="Pelosi"/>
                </ListItem>
            </List>
        </>
    )
}

export default UserDetails
