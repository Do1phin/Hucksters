import React, {Fragment} from "react";
import PropTypes from 'prop-types';

const SellerPage = ({user_id}) => {


    return (
        <Fragment>
            страница продавца {user_id}
        </Fragment>
    )
};

SellerPage.propTypes = {
    user_id: PropTypes.number.isRequired
};

export default SellerPage;
