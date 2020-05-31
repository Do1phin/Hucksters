import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLoadMore, setSkipItemsNumber} from '../../../redux/actions/listSettings.actions';
import './loadMoreBtn.style.scss';

const LoadMoreBtn = () => {
    const dispatch = useDispatch();
    const list_settings = useSelector(state => state.list_settings);

    const dispatchClickLoadMoreBtn = () => {
        let skipAfter = list_settings.skip + list_settings.limit;
        dispatch(setLoadMore(true));
        dispatch(setSkipItemsNumber(skipAfter));
    };

    return (
        list_settings.part_items >= list_settings.limit
            ? <div className='load-more'>
                <button
                    className='load-more__button'
                    onClick={dispatchClickLoadMoreBtn}
                >
                    Показать ещё
                </button>
            </div>
            : null
    );
};

export default LoadMoreBtn;
