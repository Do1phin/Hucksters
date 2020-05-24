import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLoadMore, setSkipItemsNumber} from '../../../redux/actions/list.actions';
import './loadMoreBtn.style.scss';

const LoadMoreBtn = () => {
    const dispatch = useDispatch();
    const listSettings = useSelector(state => state.list);

    const dispatchClickLoadMoreBtn = () => {
        let skipAfter = listSettings.skip + listSettings.limit;
        dispatch(setLoadMore(true));
        dispatch(setSkipItemsNumber(skipAfter));
    };

    return (
        listSettings.part_items >= listSettings.limit
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
