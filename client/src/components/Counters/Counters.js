import React from "react";
import {createCountersToDB, deleteCounterFromDB, readCountersFromDB, updateCountersToDB} from "./counters.api";

const Counters = () => {

    const deleteCounters = () => {
        deleteCounterFromDB()
            .then(data => {
            })
            .catch(err => console.error(err));
    };

    const refreshCounters = () => {
        updateCountersToDB()
            .then(response => {})
            .catch(err => console.error(err));
    };

    const createCounters = () => {
        createCountersToDB()
            .then((response) => {
                return response.json();
            }).then((data) => {
            const {
                all_members, banned, deleted, closed, seller, all_albums, all_photos, photo_with_text,
                photo_with_addit_photo
            } = data;
            let tempCount = {
                all_members,
                banned,
                deleted,
                closed,
                seller,
                all_albums,
                all_photos,
                photo_with_text,
                photo_with_addit_photo
            };
            console.log(tempCount);
            // setCounters(tempCount);
        }).catch((err) => console.error(err));
    };

    const readCounters = async () => {
        await readCountersFromDB()
            .then((response) => {
                return response;
            }).then((data) => {
                const {all_members, banned, deleted, closed, seller} = data;
                console.log(all_members, banned, deleted, closed, seller);
                // setCounters({all_members, banned, deleted, closed, seller});
            }).catch((err) => console.error(err));
    };

    return (
        <div className='counters-buttons'>
            <button className='counters-buttons__btn-delete'
                    onClick={deleteCounters}
            >
                Удалить счётчики
            </button>

            <button className='counters-buttons__btn-create'
                    onClick={createCounters}
            >
                Создать счётчики
            </button>

            <button className='counters-buttons__btn-create'
                    onClick={refreshCounters}
            >
                Пересчитать счётчики
            </button>

            <button className='counters-buttons__btn-refresh'
                    onClick={readCounters}
            >
                Загрузить счётчики
            </button>

        </div>
    )
};

export default Counters;
