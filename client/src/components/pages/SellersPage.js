import React, {Fragment, useState} from "react";
import SellerCard from "../sellerCard";
import '../sellerCard/sellerCard.css'

const SellersPage = () => {
    const [sellers, setSellers] = useState([]);

    const getUsers = () => {
        try {

            fetch(
                '/sellers',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .then(res => res.json())
                .then(data => {
                    setSellers(data)
                })
                .catch(error => console.log('Error -> ', error));
        } catch (e) {
            throw new Error(e)
        }
    };

    return (
        <Fragment><br/>
            <button onClick={getUsers}>Загрузить продавцов</button>
            {
                sellers.map((item) => {
                    console.log(item.vkId);
                })
            }
        </Fragment>
    )
};

export default SellersPage;
