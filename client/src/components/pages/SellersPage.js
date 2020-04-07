import React, {Fragment} from "react";
import SellerCard from "../sellerCard";
import '../sellerCard/sellerCard.css'

const SellersPage = () => {

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
                    console.log(data)
                })
                .catch(error => console.log('Error -> ', error));
        } catch (e) {
            throw new Error(e)
        }
    };

    const setUserCardToFragment = (data) => {
        console.log(data)
        // data.map((item) => {
        //     console.log(item.lastName)
        // })
    };


    return (
        <Fragment><br/>
            <button onClick={getUsers}>Загрузить продавцов</button>
        </Fragment>
    )
};

export default SellersPage;
