import React, {Fragment} from "react";
import GroupsList from "./GroupsList";
import GroupsAdd from "./GroupsAdd";

const Groups = () => {

    return(
        <Fragment>
            <GroupsAdd/>
            <GroupsList/>
        </Fragment>
    )

};

export default Groups;
