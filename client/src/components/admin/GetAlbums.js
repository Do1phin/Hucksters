// Core
import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
// Redux actions
import {CheckerSetThingStringAction} from "../../redux/actions/check.actions";
import {MemberAlbumsGetAsyncAction} from "../../redux/actions/checkMember.actions";
// Styles
import '../../styles/getAlbums.style.scss';

const GetAlbums = () => {

    const dispatch = useDispatch();

    const check = useSelector(state => state.checker);
    const checkMemberCounters = useSelector(state => state.check_members);

    useEffect(() => {
        // readCounters()
    }, []);

    // Проверить на закрытие альбомов
    const checkAccessToAlbums = async () => {
        dispatch(CheckerSetThingStringAction('Albums'));
        dispatch(MemberAlbumsGetAsyncAction())
    };

    const handleChangeCheckSettings = () => {

    };

    return (
        <Fragment>

            <div className='album-loader'>
                <div className='album-loader__counters'>
                    <ul className='album-loader__counters-info'>
                        <li>Всего пользователей - {checkMemberCounters.all_members}</li>
                        <li>Есть информация - {checkMemberCounters.with_info}</li>
                        <li>Продавцы - {checkMemberCounters.seller}</li>
                        <li>Скрытые - {checkMemberCounters.closed}</li>
                        <li>Забаненные - {checkMemberCounters.banned}</li>
                        <li>Удалённые - {checkMemberCounters.deleted}</li>

                        <p>Проверяем {check.step} из {
                            checkMemberCounters.all_members -
                            checkMemberCounters.seller -
                            checkMemberCounters.banned -
                            checkMemberCounters.deleted -
                            checkMemberCounters.closed
                        }
                        </p>
                        <span>Статус: {check.status}</span>
                    </ul>

                </div>
                <div className="album-loader__settings">
                    <label>
                        <input
                            id={'seller'}
                            type="checkbox"
                            defaultChecked={false}
                            onChange={handleChangeCheckSettings}
                        />
                        Продавцы
                    </label>
                    <label>
                        <input
                            id={'closed'}
                            type="checkbox"
                            defaultChecked={false}
                            onChange={handleChangeCheckSettings}
                        />
                        Скрытые
                    </label>
                    <label>
                        <input
                            id={'banned'}
                            type="checkbox"
                            defaultChecked={false}
                            onChange={handleChangeCheckSettings}
                        />
                        Забаненные
                    </label>
                    <label>
                        <input
                            id={'deleted'}
                            type="checkbox"
                            defaultChecked={false}
                            onChange={handleChangeCheckSettings}
                        />
                        Удалённые
                    </label>
                    <label>
                        <input
                            id={'others'}
                            type="checkbox"
                            defaultChecked={false}
                            onChange={handleChangeCheckSettings}
                        />
                        Остальные
                    </label>
                </div>
                <div className='album-loader__buttons'>
                    <button className='album-loader__btn-load'
                            onClick={checkAccessToAlbums}
                    >
                        Загрузить альбомы
                    </button>
                </div>


            </div>
        </Fragment>
    )
};

export default GetAlbums;
